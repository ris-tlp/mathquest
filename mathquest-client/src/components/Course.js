// Importing necessary React components and hooks and
// other components used in the application
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Tab, Tabs } from "./Tabs";
import Overview from "./Overview";
import Discussion from "./Discussion";
import Announcements from "./QuizContainer";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import QuizContainer from "./QuizContainer";
const Course = () => {
  // State to store course details
  const [course, setCourse] = useState({});

  useEffect(() => {
    // Call fetchCourseDetails when the component mounts
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    const courseID = sessionStorage.getItem("CourseID");
    const data = await fetch(
      BASE_URL +
      "/api/courses/getCourseByID" +
      "?courseID=" +
      courseID
    ); // Fetch course details from the API
    const json = await data.json();

    setCourse(json?.course); // Update the course state with the fetched data
  };

  return (
    <div className="bg-slate-900 font-mono w-[100vw] h-[120%] ">
      <Header />

      {course && ( // Render the following content only if course details are available
        <div className="p-6">
          <h1 className="pt-40 ml-10 text-3xl mb-10 text-white">
            {course.courseName}
          </h1>
          <div className="flex">
            <div className=" mr-4  ml-10 w-8/12 sm:w-[90%]">
              <iframe
                className="h-[600px] px-4"
                width="100%"
                src={course.courseVideoURL}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay;  picture-in-picture;"
                allowFullScreen
              ></iframe>
            </div>

            <div className=" mr-4 w-4/12 sm:hidden">
              <div className="w-[100%]  border-2 border-stone-800 p-8">
                <h3 className="text-2xl font-bold text-white p-4">
                  What you'll learn
                </h3>
                <ul className="list-disc text-white">
                  {course.whatYouWillLearn?.map((e) => {
                    return <li>{e}</li>; // Display a list of what the user will learn
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Tabs>
              <Tab label="Overview">
                <div className="py-4">
                  <Overview course={course} />
                </div>
              </Tab>
              <Tab label="Discussion">
                <div className="py-4">
                  <Discussion />
                </div>
              </Tab>
              <Tab label="Take Quiz">
                <div className="py-4">
                  <QuizContainer />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default Course;
