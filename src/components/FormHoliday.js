import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { app } from '../Firebase';
import Popup from 'reactjs-popup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const database = getDatabase(app);

const HolidayFormPopup = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date()); // Initialize with current date
    const [day, setDay] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

         // Format date according to database structure
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
        
        // Get day name
        const dayName = date.toLocaleString('en-us', { weekday: 'long' });

        // Push data to Firebase
        const holidaysRef = ref(database, `holidays/2024/`);
        push(holidaysRef, {
            name: name,
            date: formattedDate,
            day: dayName // Include day name in database
        });

        // Clear form fields
        setName('');
        setDate(''); // Reset date to current date
        setDay('');
    };

    return (
        <Popup trigger={<button className='btn primary'>Add Holiday</button>} modal>
            {(close) => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Add Holiday </div>
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </label>
                            <label>
                                Date:
                                <DatePicker selected={date} onChange={(date) => setDate(date)} required/>
                            </label>
                            <label>
                                <input type="text" value={day} readOnly hidden/>
                            </label>
                            <button className="btn primary" type="submit">Add Holiday</button>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default HolidayFormPopup;
