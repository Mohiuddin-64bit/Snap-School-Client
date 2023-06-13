import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/allClass").then((res) => {
      const data = res.data;
      setDatas(data);
    });
  }, [datas]);

  const handleApproved = (id) => {
    fetch(`http://localhost:5000/allClass/approved/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.modifiedCount) {
          Swal.fire("Approved!", "Class Is Approved", "success");
          console.log(data);
        }
      });
  };
  const handleDenied = (id) => {
    fetch(`http://localhost:5000/allClass/denied/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.modifiedCount) {
          Swal.fire("Approved!", "Class Is Approved", "success");
          console.log(data);
        }
      });
  };

  return (
    <div>
      <div className="w-full">
        <div className="overflow-x-auto w-full ">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th></th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Email</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.instructorName}</td>
                  <td>{item.email}</td>
                  <td>{item.availableSeats}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => handleApproved(item._id)}
                      className="btn btn-ghost bg-blue-300 text-black"
                    >
                      Approved
                    </button>
                    <button onClick={() => handleDenied(item._id)} className="btn btn-ghost mx-4 bg-blue-300 text-black">
                      Denied
                    </button>
                    <button className="btn btn-ghost bg-blue-300 text-black">
                      Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;