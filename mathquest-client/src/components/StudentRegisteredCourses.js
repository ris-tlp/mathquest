import React from "react";
import { useNavigate } from "react-router-dom";

const StudentRegisteredCourses = ({registeredCourses}) => {
    const navigate=useNavigate();
  return (
    <div className="flex flex-wrap justify-left">
      {registeredCourses.map((r, index) => {
        return (
          <div key={r.courseName}>
            <div className="my-10 mx-8 w-72 h-[300px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
              <img className="w-[100%] h-[200px]" src={r.courseImg} alt="" />

              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {r.courseName}
                </h5>

                <button
                  onClick={() => {
                    sessionStorage.setItem("courseID", r._id);
                    navigate("/course");
                  }}
                  className="text-white float-right underline"
                >
                  View Course &gt;
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentRegisteredCourses;
