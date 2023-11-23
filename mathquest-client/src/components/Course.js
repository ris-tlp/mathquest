import React from "react";
import Header from "./Header";
import { Tab, Tabs } from "./Tabs";
import Overview from "./Overview";
import Discussion from "./Discussion";
import Announcements from "./Announcements";



const Course = () => {
  return (
    <div>
      <Header />

      <div className="pt-40 mx-10 w-8/12 sm:w-[100%]">
        {/* <iframe
          className="h-[600px]"
          width="100%"
          src="https://www.youtube.com/watch?v=5zi5eG5Ui-Y?controls=1"
        ></iframe> */}

        <iframe
         className="h-[600px]"
          width="100%"
          src="https://www.youtube.com/embed/5zi5eG5Ui-Y?si=PbLAE9ieALFQ7izX"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <div>
        <Tabs>
          <Tab label="Overview">
            <div className="py-4">
              <Overview />
            

            </div>
          </Tab>
          <Tab label="Discussion">
            <div className="py-4">
              <Discussion />
            </div>
          </Tab>
          <Tab label="Announcements">
            <div className="py-4">
              <Announcements />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Course;
