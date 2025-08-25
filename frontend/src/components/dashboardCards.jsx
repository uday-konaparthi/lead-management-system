import React from "react";
import { Users, Star, XCircle, CheckCircle, User } from "lucide-react";
import { useSelector } from "react-redux";

const DashboardCards = () => {
  const leadsData = useSelector((state) => state.leads?.leads);

  const cardClass =
    "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center gap-4 transition hover:shadow-lg";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Total Leads */}
      <div className={cardClass}>
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-300">
          <User />
        </div>
        <div>
          <p className="text-lg text-gray-500 dark:text-white">Total Leads</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {leadsData?.total || 0}
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
          <CheckCircle />
        </div>
        <div>
          <p className="text-lg text-gray-500 dark:text-white">Qualified</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {leadsData?.data?.filter((lead) => lead.status === "qualified")
              .length || 0}
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
          <XCircle />
        </div>
        <div>
          <p className="text-lg text-gray-500 dark:text-white">Lost</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {leadsData?.data?.filter((lead) => lead.status === "lost").length || 0}
          </p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
          <Star />
        </div>
        <div>
          <p className="text-lg text-gray-500 dark:text-white">New</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {leadsData?.data?.filter((lead) => lead.status === "new").length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
