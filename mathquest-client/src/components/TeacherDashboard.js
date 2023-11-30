import React, { useRef, useState } from "react";
import InstructorManageCourseDetail from "./InstructorManageCourseDetail";
import { CONNECTION_STRING, PORT } from "../utils/constants";

// Functional component for the teacher's dashboard
const TeacherDashboard = ({ course , showManageCourse}) => {
  console.log(course);

  // State variables for managing the course details
  const [Course, setCourse] = useState(course);
  const [editCourseName, setEditCourseName] = useState(false);
  const [editDesc, setEditCourseDesc] = useState(false);
  const [editInstructorDesc, setEditInstrucotrCourseDesc] = useState(false);
  const [editOverview, setEditOverview] = useState(false);
  const [editWhatYourLearn, setEditWhatYourLearn] = useState(false);
  const [manageCourse, setManageCourse] = useState(false);

  // Function to handle initiating course details management
  const handleManageDetails = () => {
    setManageCourse(true);
    setEditCourseName(true);
    setEditCourseDesc(true);
    setEditInstrucotrCourseDesc(true);
    setEditOverview(true);
    setEditWhatYourLearn(true);
  };

  // Refs for input fields to capture course details
  const courseNameRef = useRef();
  const courseDescRef = useRef();
  const courseOverviewRef = useRef();
  const instructorDescRef = useRef();
  const wyl1 = useRef();
  const wyl2 = useRef();
  const wyl3 = useRef();
  const wyl4 = useRef();

  // Function to finalize and update course details
  const finalizeDetails = () => {
    const newCourse = {
      courseDescription: courseDescRef.current.value,
      courseDuration: Course.courseDuration,
      courseId: Course.courseId,
      courseImg: Course.courseImg,
      courseName: courseNameRef.current.value,
      courseVideoURL: Course.courseVideoURL,
      instructorDescription: instructorDescRef.current.value,
      instructorImage: Course.instructorImage,
      isPublished: Course.isPublished,
      overview: courseOverviewRef.current.value,
      _id: Course._id,
      whatYouWillLearn: [
        wyl1.current.value,
        wyl2.current.value,
        wyl3.current.value,
        wyl4.current.value,
      ],
    };

    setCourse(newCourse)

  
    setManageCourse(false);
    setEditCourseName(false);
    setEditCourseDesc(false);
    setEditInstrucotrCourseDesc(false);
    setEditOverview(false);
    setEditWhatYourLearn(false);

    updateCourse(newCourse)
  };

  // Async function to update course details on the server
  const updateCourse=async(course)=>{

    const data = await fetch(
        CONNECTION_STRING + PORT + "/api/courses/updateCourse",
        {
          method: "POST",
          body: JSON.stringify({
            course: course,
            courseID: course._id
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
  
      console.log(json)
    };


 
  // JSX structure for rendering the teacher's dashboard
  return (
    <div className="bg-white w-9/12 p-4 rounded-lg my-4">
      <div>
        <form>
          <InstructorManageCourseDetail
            label="Course Name"
            editEntry={editCourseName}
            labelValue={Course.courseName}
            textarea="false"
            childRef={courseNameRef}
          />
          <InstructorManageCourseDetail
            label="Course Description"
            editEntry={editDesc}
            labelValue={Course.courseDescription}
            textarea="true"
            childRef={courseDescRef}
          />
          <InstructorManageCourseDetail
            label="Course Overview"
            editEntry={editOverview}
            labelValue={Course.overview}
            textarea="true"
            childRef={courseOverviewRef}
          />
          <InstructorManageCourseDetail
            label="Instructor Description"
            editEntry={editInstructorDesc}
            labelValue={Course.instructorDescription}
            textarea="true"
            childRef={instructorDescRef}
          />
          <section className="flex my-4">
            <div className="w-3/12">
              <label className="text-lg font-bold ">What your will learn</label>
            </div>

            <div className="w-9/12">
              {!editWhatYourLearn && (
                <h1 className="text-lg font-bold mb-4 ml-4 ">
                  {Course.whatYouWillLearn[0]}
                </h1>
              )}
              {!editWhatYourLearn && (
                <h1 className="text-lg font-bold mb-4 ml-4">
                  {Course.whatYouWillLearn[1]}
                </h1>
              )}
              {!editWhatYourLearn && (
                <h1 className="text-lg font-bold mb-4 ml-4">
                  {Course.whatYouWillLearn[2]}
                </h1>
              )}
              {!editWhatYourLearn && (
                <h1 className="text-lg font-bold mb-4 ml-4">
                  {Course.whatYouWillLearn[3]}
                </h1>
              )}

              {editWhatYourLearn && (
                <input
                  type="text"
                  defaultValue={Course.whatYouWillLearn[0]}
                  ref={wyl1}
                  className="border-2 border-gray-900 rounded-md w-[80%] p-2 mb-4"
                ></input>
              )}
              {editWhatYourLearn && (
                <input
                  type="text"
                  ref={wyl2}
                  defaultValue={Course.whatYouWillLearn[1]}
                  className="border-2 border-gray-900 rounded-md w-[80%] p-2 my-4"
                ></input>
              )}
              {editWhatYourLearn && (
                <input
                  type="text"
                  ref={wyl3}
                  defaultValue={Course.whatYouWillLearn[2]}
                  className="border-2 border-gray-900 rounded-md w-[80%] p-2 my-4"
                ></input>
              )}
              {editWhatYourLearn && (
                <input
                  type="text"
                  ref={wyl4}
                  defaultValue={Course.whatYouWillLearn[3]}
                  className="border-2 border-gray-900 rounded-md w-[80%] p-2 my-4"
                ></input>
              )}
            </div>
          </section>
        </form>


        {!manageCourse && (
          <button
            onClick={showManageCourse}
            className="bg-slate-800 text-white h-14 rounded-lg font-bold p-4 "
          >
            Dashboard
          </button>
        )}        
        {!manageCourse && (
          <button
            onClick={handleManageDetails}
            className="bg-slate-800 text-white h-14 rounded-lg font-bold p-4 float-right"
          >
            Edit Details
          </button>
        )}
        {manageCourse && (
          <button
            onClick={finalizeDetails}
            className="bg-slate-800 text-white h-14 rounded-lg font-bold p-4 float-right"
          >
            Update Details
          </button>
        )}
      </div>
    </div>
  );
};

// Export the TeacherDashboard component as the default export
export default TeacherDashboard;
