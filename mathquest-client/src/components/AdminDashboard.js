import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import RegisteredUsers from "./RegisteredUsers";

const AdminDashboard = () => {
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [pendingCourses, setPendingCourse] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [showPendingCourse, setShowPendingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedPendingCourse, setSelectedPendingCourse]=useState(null)
  useEffect(() => {
    fetchApprovedCourses();
    fetchPendingCourses();
  }, []);

  const fetchApprovedCourses = async () => {
    const data = await fetch(BASE_URL + "/api/courses/filterCoursesByStatus", {
      method: "POST",
      body: JSON.stringify({
        requiredStatus: "accepted",
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-control-allow-origin": "*",
        "Access-control-allow-methods": "*",
      },
    });
    const json = await data.json();
    setApprovedCourses(json.filteredCourses);
  };

  const fetchPendingCourses = async () => {
    const data = await fetch(BASE_URL + "/api/courses/filterCoursesByStatus", {
      method: "POST",
      body: JSON.stringify({
        requiredStatus: "pending",
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-control-allow-origin": "*",
        "Access-control-allow-methods": "*",
      },
    });
    const json = await data.json();
    setPendingCourse(json.filteredCourses);
  };

  const handleViewCourse = (course) => {
    setShowCourse(true);
    setSelectedCourse(course);
    fetchAllRegisteredStudents(course._id);
  };

  const handlePendingCourse = (course) => {
    setShowCourse(true)
    setShowPendingCourse(true);
    setSelectedPendingCourse(course)

  };

  const fetchAllRegisteredStudents = async (courseID) => {
    const data = await fetch(
      BASE_URL + "/api/courses/teachers/getRegisteredUsers",
      {
        method: "POST",
        body: JSON.stringify({
          courseID: courseID,
        }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-control-allow-origin": "*",
          "Access-control-allow-methods": "*",
        },
      }
    );
    const json = await data.json();
    setRegisteredUsers(json.userInfo);
  };

  const handleCourseStatus=async(status, id)=>{
   
    const data = await fetch(
        BASE_URL + "/api/courses/changeRequestStatus",
        {
          method: "POST",
          body: JSON.stringify({
            courseID : id,
            newStatus: status
          }),
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-control-allow-origin": "*",
            "Access-control-allow-methods": "*",
          }
        }
      );
      const json = await data.json();
      setShowCourse(false)
      setShowPendingCourse(false)  
      fetchApprovedCourses();
      fetchPendingCourses();
  }

  return (
    <section className="flex">
      <div className={showCourse ? "w-full" : "w-9/12"}>
        <div className="flex flex-wrap justify-left ">
          {!showCourse &&
            approvedCourses.map((r, index) => {
              return (
                <div key={r.courseName}>
                  <div className="my-10 mx-8 w-72 h-[350px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer relative">
                    <img
                      className="w-[100%] h-[200px]"
                      src={r.courseImg}
                      alt=""
                    />

                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {r.courseName}
                      </h5>

                      <button
                        onClick={() => {
                          handleViewCourse(r);
                        }}
                        className="text-white float-right underline absolute right-[20px] bottom-[20px]"
                      >
                        View Course &gt;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          {showCourse && !showPendingCourse && (
            <section className="w-[100%] flex">
              <div className="w-9/12 border-2 bg-white my-8 p-4 rounded-lg">
                <h1 className="text-3xl underline font-bold">
                  {selectedCourse.courseName}
                </h1>
                <h1 className="my-2">{selectedCourse.courseDescription}</h1>

                <section className="flex">
                  <img
                    className="w-4/12 border-2 border-slate-900"
                    src={selectedCourse.instructorImage}
                  />
                  <div className="p-4">
                    <h1 className="font-bold text-xl">
                      {selectedCourse.courseInstructor}
                    </h1>
                    <div className="">
                      {selectedCourse.instructorDescription}
                    </div>
                  </div>
                </section>

                <button
                  onClick={() => setShowCourse(false)}
                  className="bg-slate-900 text-white w-20 h-10 mt-8 rounded-md"
                >
                  Back
                </button>
                <button onClick={()=>handleCourseStatus('rejected',selectedCourse._id)} className="bg-slate-900 text-white w-36 h-10 mt-8 rounded-md float-right">
                  Remove Course
                </button>
              </div>
              <div className="w-3/12 px-2">
                <RegisteredUsers registeredUsers={registeredUsers} />
              </div>
            </section>
          )}

          {showCourse && showPendingCourse && (
            <section className="w-[100%] flex">
              <div className="w-9/12 bg-white my-8 rounded-lg p-2">
                <h1 className="text-4xl bg-slate-900 text-white p-2 rounded-md">Pending Course Request</h1>

                <h1 className="text-3xl underline font-bold p-2">
                  {selectedPendingCourse.courseName}
                </h1>
                <h1 className="my-2 p-2">{selectedPendingCourse.courseDescription}</h1>

                <section className="flex p-2">
                  <img
                    className="w-4/12 border-2 border-slate-900"
                    src={selectedPendingCourse.instructorImage}
                  />
                  <div className="p-4">
                    <h1 className="font-bold text-xl">
                      {selectedPendingCourse.courseInstructor}
                    </h1>
                    <div className="">
                      {selectedPendingCourse.instructorDescription}
                    </div>
                  </div>
                </section>

                <button
                  onClick={() => setShowCourse(false)}
                  className="bg-slate-900 text-white w-20 h-10 mt-8 rounded-md"
                >
                  Back
                </button>

                <div className="float-right">
                <button onClick={()=>handleCourseStatus('accepted', selectedPendingCourse._id)} className="bg-slate-900 text-white w-36 h-10 mt-8 rounded-md mx-2 ">
                  Approve Course
                </button>
                <button  onClick={()=>handleCourseStatus('rejected', selectedPendingCourse._id)} className="bg-slate-900 text-white w-36 h-10 mt-8 rounded-md">
                  Reject Course
                </button>
                </div>
              </div>
              <div className="w-3/12 px-2">
               { registeredUsers && !showPendingCourse &&  <RegisteredUsers registeredUsers={registeredUsers} />}
              </div>
            </section>
          )}
        </div>
      </div>

      {!showCourse && pendingCourses && (
        <div className="w-3/12">
         { pendingCourses &&  <h1 className="text-white text-3xl">View Pending Requests</h1>}
          {pendingCourses.map((e, index) => {
            return (
              <div className="bg-white text-slate-900 p-2 border-2 border-slate-900 rounded-lg">
                <h1 className="text-2xl font-bold">
                  {index + 1} - {e.courseName}
                </h1>
                <h2 className="text-xl mx-12"> {e.courseInstructor}</h2>
                <button
                  onClick={() => handlePendingCourse(e)}
                  className="bg-slate-900 text-white w-auto p-2 ml-12 mt-4 "
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
