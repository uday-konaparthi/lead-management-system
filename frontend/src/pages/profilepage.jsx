import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user"; 

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user?.userinfo);
  }, [user]);

  const handleLogout = async () => {
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
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Your Profile
      </h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">First Name:</span>
            <span className="text-gray-800 dark:text-gray-100">
              {user?.userinfo?.first_name || "N/A"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">Last Name:</span>
            <span className="text-gray-800 dark:text-gray-100">
              {user?.userinfo?.last_name || "N/A"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">Email:</span>
            <span className="text-gray-800 dark:text-gray-100">
              {user?.userinfo?.email || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error"
        >
          Logout
        </button>
        
        <button className="btn btn-outline btn-secondary" disabled>
          Edit Profile (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
