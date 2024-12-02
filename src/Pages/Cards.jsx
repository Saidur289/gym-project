import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdDone, MdOutlineDoneAll, MdTipsAndUpdates } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Cards = () => {
  const loadedData = useLoaderData();
  const [search, setSearch] = useState("");

  const [schedules, setSchedules] = useState(loadedData || []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://conceptual-server-smoky.vercel.app/schedule/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            const remaining = schedules.filter(
              (schedule) => schedule._id !== id
            );
            setSchedules(remaining);
          });
      }
    });
  };
  const handleStatus = (id) => {
    fetch(`https://conceptual-server-smoky.vercel.app/status/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const newData = schedules.map((schedule) =>
          schedule._id === id ? { ...schedule, isCompleted: true } : schedule
        );
        setSchedules(newData);
      });
  };
  //   funtionatily of search field
  useEffect(() => {
    fetch(`https://conceptual-server-smoky.vercel.app/schedule?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSchedules(data);
      });
  }, [search]);
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="w-[400px] mx-auto mb-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          name="search"
          placeholder="search"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {schedules.length === 0 ? (
              <tr>
                <td colSpan="100%">Data Not Found</td>
              </tr>
            ) : (
              schedules.map((schedule, index) => (
                <tr key={schedule._id}>
                  <th>{index + 1}</th>
                  <td>{schedule.title}</td>
                  <td>{schedule.day}</td>
                  <td>{schedule.date}</td>
                  <td>{schedule.time}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(schedule._id)}
                      className="btn"
                    >
                      <FaTrash></FaTrash>
                    </button>
                    <Link to={`/update/${schedule._id}`}>
                      <button className="btn">
                        <MdTipsAndUpdates></MdTipsAndUpdates>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleStatus(schedule._id)}
                      className="btn"
                    >
                      {schedule.isCompleted ? (
                        <MdOutlineDoneAll></MdOutlineDoneAll>
                      ) : (
                        <MdDone></MdDone>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cards;
