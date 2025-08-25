import { User } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user";
import { useNavigate } from "react-router-dom";
import { setActiveClass } from "../redux/navbar";
import toast from "react-hot-toast";

const Navbar = () => {
  const activeClass = useSelector((state) => state.navbar.activeClass);
  const leadsData = useSelector((state) => state.leads?.leads);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error)
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar pt-7 px-5">
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl">{activeClass}</a>
        </div>
        <div className="flex-none items-center gap-4">
          {leadsData?.total === 0 && (
            <button
              onClick={async () => {
                await fetch(`${import.meta.env.VITE_API_URL}/api/leads/seed`, {
                  method: "POST",
                  credentials: "include"
                });
                window.location.reload();
              }}
              className="btn btn-outline btn-secondary mr-2"
            >
              Seed Demo Leads
            </button>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle border rounded-full"
            >
              <User />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between" onClick={() => {
                  navigate("/profile")
                  dispatch(setActiveClass("Account"))
                }} >Profile</a>
              </li>
              <li onClick={handleLogOut}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
