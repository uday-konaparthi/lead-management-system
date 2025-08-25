import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLeads } from "../utils/fetchLeads";
import { setLeads } from "../redux/leads";
import { deleteLead } from "../utils/deleteLead";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";

const Leads = () => {
  const dispatch = useDispatch();
  const leadsData = useSelector((state) => state.leads?.leads);

  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [limit, setLimit] = useState(20);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimeout = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(value.trim());
      setPagination((p) => ({ ...p, page: 1 }));
    }, 500);
  };

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const result = await fetchLeads({
          page: pagination.page,
          limit,
          search: debouncedSearch,
        });

        console.log(result);
        dispatch(setLeads(result));
        setPagination({
          page: result.page,
          totalPages: result.totalPages,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadLeads();
  }, [pagination.page, limit, debouncedSearch, dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);
      const result = await fetchLeads({
        page: pagination.page,
        limit,
        search: debouncedSearch,
      });
      dispatch(setLeads(result));
      setPagination({
        page: result.page,
        totalPages: result.totalPages,
      });
      toast.success("Lead Deleted!");
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Failed to delete lead. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-auto pt-2 overflow-y-hidden px-2">
      <div className="flex gap-3 place-self-start mb-4">
        <label className="input flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
        </label>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPagination((p) => ({ ...p, page: 1 }));
          }}
          className="select w-40"
        >
          {[20, 40, 60, 80, 100].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>

        <Link to="/create" className="w-40">
          <button className="btn btn-outline btn-primary w-full text-nowrap">
            Add new Lead
          </button>
        </Link>
      </div>

      {debouncedSearch && (
        <div className="mb-4 text-sm text-gray-600">
          Showing results for: <strong>{debouncedSearch}</strong>
        </div>
      )}

      <div className="overflow-x-scroll">
        <table className="table w-full">
          <thead>
            <tr>
              <th style={{ width: 100 }}>Actions</th>
              <th>S.no</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Lead value</th>
              <th>Score</th>
              <th>Status</th>
              <th>Source</th>
            </tr>
          </thead>

          <tbody>
            {leadsData?.data?.length > 0 ? (
              leadsData.data.map((lead, ind) => (
                <tr key={lead._id || ind}>
                  <td
                    style={{ width: 100 }}
                    className="flex items-center justify-center gap-4 mt-2"
                  >
                    <Link to={`/leads/edit/${lead._id}`}>
                      <Edit
                        aria-label="Edit Lead"
                        type="button"
                        className="w-5 h-5 text-blue-600 hover:text-blue-800 transition"
                      />
                    </Link>

                    <Trash
                      aria-label="Delete Lead"
                      onClick={() => handleDelete(lead._id)}
                      className="w-5 h-5 text-red-600 hover:text-red-800 transition cursor-pointer"
                    />
                  </td>

                  <td>{ind + 1 + (pagination.page - 1) * limit}</td>
                  <td>{lead.first_name}</td>
                  <td>{lead.last_name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.company}</td>
                  <td>{lead.lead_value}</td>
                  <td>{lead.score}</td>
                  <td>{lead.status}</td>
                  <td>{lead.source}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center py-4">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-col items-center mt-4">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() =>
                setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
              }
              disabled={pagination.page <= 1}
            >
              «
            </button>

            <button className="join-item btn">{pagination.page}</button>

            <button
              className="join-item btn"
              onClick={() =>
                setPagination((p) => ({
                  ...p,
                  page: Math.min(p.totalPages, p.page + 1),
                }))
              }
              disabled={pagination.page >= pagination.totalPages}
            >
              »
            </button>
          </div>

          <div className="w-full flex justify-end py-3 px-4 border-t border-gray-200 text-sm font-medium">
            Total leads: {leadsData?.total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
