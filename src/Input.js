import React, { useState, useEffect } from "react";

export default function Input({ label, name, action, type }) {
  const setInitialVal = () => {
    let lsValue =
      localStorage.getItem(name) !== null ? localStorage.getItem(name) : "";
    if (lsValue !== "") {
      action(name, lsValue);
    }
    return lsValue;
  };

  const [localVal, setLocalVal] = useState(setInitialVal);

  useEffect(function persistInput() {
    if (localVal !== "") {
      localStorage.setItem(name, localVal);
    }
  });

  const set = e => {
    let val = e.target.value;
    setLocalVal(val);
    action(name, val);
  };

  return (
    <div className="field">
      <label>{label}</label>
      <input onChange={e => set(e)} name={name} value={localVal} type={type} />
    </div>
  );
}
