import React, { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
const Toss = () => {
  const [angle, setAngle] = useState(0);
  const flip = () => {
    if (Math.random() > 0.5) {
      setAngle((i) => i + 180);
    } else {
      setAngle((i) => i + 360);
    }
  };
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Toss</h1>
        <section>
          <article
            className="toss"
            onClick={flip}
            style={{
              transform: `rotateY(${angle}deg)`,
            }}
          >
            <div></div>
            <div></div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Toss;
