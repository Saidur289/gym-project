import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Swal from "sweetalert2";

const formatTime12Hour = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
const AddCards = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const handleTimeChange = (time) => {
        setSelectedTime(time);
      };
      const handleAdd = e => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const date = startDate.toLocaleDateString("en-CA")
        const time = formatTime12Hour(selectedTime)
        const day = form.day.value 
        const isCompleted = false
        // console.log(title, date, hour, day);
        const data = {title, date, day, time, isCompleted}
        fetch('https://conceptual-server-smoky.vercel.app/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'success!',
                    text: 'added successfully',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        })
      }
    return (
        <div className="bg-[#F4F3F0] p-24">
      <h1 className="text-3xl font-extrabold text-center mb-3">Add A Gym Schedule</h1>
      <form onSubmit={handleAdd}>
        {/* form row  */}
        <div className="md:flex mb-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            
            <DatePicker  className="input input-bordered w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
        </div>
        {/* form row  Supplier and taste*/}
        <div className="md:flex mb-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Day</span>
            </label>
            <select className="input input-bordered " name="day" id="day">
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <DatePicker
                className="input input-bordered w-full"
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
          </div>
        </div>
     
       
        <input type="submit" value="Add Now" className="btn bg-blue-950 text-white btn-block" />
      </form>
    </div>
    );
};


export default AddCards;