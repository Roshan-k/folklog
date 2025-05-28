import React from "react";
import { NavLink } from "react-router-dom";
import house from "../images/house.svg";
import clock from "../images/clock.svg";
import kit from "../images/firstaidkit.svg";
import calendar from "../images/calendarX.svg";
import profile from "../images/user.svg";
import birthday from "../images/calendar.svg";
import { app } from "../Firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(app);

const Sidebar = () => {
  const items = [
    { Navname: "Home", Linkname: "/", icon: house, index: 0 },
    { Navname: "Attendance", Linkname: "/attendance", icon: clock, index: 1 },
    { Navname: "Tasks", Linkname: "/task", icon: kit, index: 2 },
    { Navname: "Leave Tracker", Linkname: "/leave", icon: calendar, index: 3 },
    { Navname: "Profile", Linkname: "/profile", icon: profile, index: 4 },
    {
      Navname: "Holidays",
      Linkname: "/holidays",
      icon: birthday,
      index: 5,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Perform any additional actions after successful logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.index}>
            <NavLink to={item.Linkname} className="nav-link">
              <img src={item.icon} alt="icon" />
              {item.Navname}
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="btn light" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Sidebar;
