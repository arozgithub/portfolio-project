import React, { useState, useEffect } from "react";
import emoji from "react-easy-emoji";
import "./ToggleSwitch.scss";

const ToggleSwitch = ({ isDark, changeTheme }) => {
  const [isChecked, setChecked] = useState(isDark);

  useEffect(() => {
    setChecked(isDark);
  }, [isDark]);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setChecked(!isChecked);
          changeTheme();
        }}
      />
      <span className="slider round">
        <span className="emoji">{isChecked ? emoji("🌜") : emoji("☀️")}</span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
