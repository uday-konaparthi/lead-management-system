import React, { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import LeadStatusChart from "../components/LeadStatusChart";
import RecentActivity from "../components/RecentActivity";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../utils/fetchLeads";
import { setLeads } from "../redux/leads";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const result = await fetchLeads({
          page: pagination.page,
          limit,
          search,
        });
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
  }, [pagination.page, limit, search, dispatch]);

  return (
    <div
      className="p-6 space-y-6 mt-3 min-h-screen transition-colors scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Status */}
        <div className="rounded-2xl shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Lead Status Overview
          </h2>
          <LeadStatusChart />
        </div>

        <div className="lg:col-span-2 rounded-2xl shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Recent Activity
          </h2>
          <RecentActivity />
        </div>
      </div>

      <div className="rounded-2xl shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Leads Growth Trend
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
          📈 Coming soon...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
