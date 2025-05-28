import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";
//import HolidayForm from "../components/FormHoliday";

// Firebase Database
const database = getDatabase(app);

const Birthdays = () => {
  const [holidays, setHolidays] = useState([]); // State to store fetched holidays

  useEffect(() => {
    const holidaysRef = ref(database, "holidays/2024");

    // Fetch data from Firebase
    onValue(holidaysRef, (snapshot) => {
      const data = snapshot.val();
      //console.log("Fetched holidays data:", data); // Log fetched data
      if (data) {
        const holidaysArray = Object.keys(data).map((key) => ({
          name: data[key].name,
          date: data[key].date,
          day: data[key].day,
        }));
        setHolidays(holidaysArray);
        //console.log(holidaysArray)
      }
    });
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <div className="header_btn">
        <h2 className="page_heading">List of Holidays </h2>
        
      </div>

      <div className="table_outer">
        <table className="table_style">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Holiday Name</th>
            </tr>
            {holidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.date}</td>
                <td>{holiday.day}</td>
                <td>{holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Birthdays;
