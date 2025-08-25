import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme";

const Settings = () => {
  const dark = useSelector((state) => state.theme.dark); 
  const dispatch = useDispatch();

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-base-100 p-6 rounded shadow">
        <div className="mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="toggle"
              checked={dark}
              onChange={() => dispatch(toggleTheme())}
            />
            Enable Dark Mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
