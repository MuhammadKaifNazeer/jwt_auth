import React from "react";

const LoaderButton = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-green-500 text-white font-bold rounded-lg flex items-center justify-center ${props.className} ${loading ? "bg-green-600 text-white/80" : ""}`}
      disabled={loading || props.disabled}
    >
      {loading && <div className="buttonLoader mr-2"></div>}
      {children}
    </button>
  );
};

export default LoaderButton;
