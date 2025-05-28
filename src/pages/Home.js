import React from "react";
import Stopwatch from "./Stopwatch";
import Attendance from "../components/Attendance";
import Tasks from "../pages/Tasks";

const Home = () => {
  return (
    <section className="dashboard-home">
      <div className="row">
        <div className="w-40 box-grid">
          <div className="heading__btn">
            <h3>Attendance</h3>
          </div>
          <div className="attendance_list">
            <Attendance />
          </div>
        </div>
        <div className="w-40 box-grid"><Tasks /></div>
        <div className="w-20 box-grid">
          <h3>Mark Attendance</h3>

          <Stopwatch />
        </div>
      </div>
    </section>
  );
};

export default Home;
