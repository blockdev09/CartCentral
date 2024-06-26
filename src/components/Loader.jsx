import React from "react";

const Loader = () => {
  return <div>Loading...</div>;
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
