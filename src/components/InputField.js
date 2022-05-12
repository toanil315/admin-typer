import React from "react";

export default function InputField({ title, typeComponent, ...restProps }) {
  return (
    <div>
      <p className="font-semibold text-gray-700 mb-2">{title}:</p>
      {!typeComponent ? (
        <input className="form-input" {...restProps} />
      ) : typeComponent === "text-area" ? (
        <textarea className="form-input h-28" type="text" placeholder="Enter blog description..." />
      ) : (
        ""
      )}
    </div>
  );
}
