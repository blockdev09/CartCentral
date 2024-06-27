import React from "react";

const Loader = () => {
  // return <div>Loading...</div>;
  return (
    <div className="loadercontainer">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
 <span className="loadingtext">Loading...</span>
    </div>
  )
};

export const SkeletonLoader = ({ width = "unset" }) => {
  return (
    <div className="skeltonloader" style={{ width }}>
      <div className="skeletonshape"></div>
      <div className="skeletonshape"></div>
      <div className="skeletonshape"></div>
    </div>
  );
};

export default Loader;
