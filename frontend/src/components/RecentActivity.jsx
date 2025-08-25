import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const RecentActivity = () => {
  const leadsData = useSelector((state) => state.leads?.leads);

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return past.toLocaleDateString();
  }

  const activities = useMemo(() => {
    if (!leadsData?.data) return [];
    return leadsData.data
      .map((lead) => {
        let action = "Lead updated";
        if (lead.status === "new") action = `New lead added: ${lead.first_name}`;
        else if (lead.status === "qualified") action = `${lead.first_name} marked as qualified`;
        else if (lead.status === "won") action = `${lead.first_name} marked as won`;
        else if (lead.status === "lost") action = `${lead.first_name} marked as lost`;

        return { text: action, time: timeAgo(lead.updated_at || lead.created_at) };
      })
      .slice(0, 5);
  }, [leadsData]);

  return (
    <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
      {activities.length > 0 ? (
        activities.map((act, idx) => (
          <div
            key={idx}
            className="flex cursor-pointer justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <span className="text-gray-700 dark:text-gray-200 text-sm">{act.text}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{act.time}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
      )}
    </div>
  );
};

export default RecentActivity;
