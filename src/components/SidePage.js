import { Routes, Route } from "react-router-dom";
import Tasks from "../pages/Tasks";
import Leavetracker from "../pages/Leavetracker";
import Birthdays from "../pages/Birthdays";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import AttendanceList from "../pages/AttendanceList";

function SidePage() {
  return (
    <Routes>
      {/* Add authentication checks for each route */}
      <Route path="/" element={<Home />} />
      <Route path="/attendance" element={<AttendanceList />} />
      <Route path="/task" element={<Tasks />} />
      <Route path="/leave" element={<Leavetracker />} />
      <Route path="/holidays" element={<Birthdays />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default SidePage;
