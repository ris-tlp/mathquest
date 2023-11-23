import React from "react";
import Header from "./Header";
import { Tab, Tabs } from "./Tabs";
import Overview from "./Overview";
import Discussion from "./Discussion";
import Announcements from "./Announcements";
import Footer from "./Footer";

const Course = () => {
  return (
    <div className="bg-slate-900 font-mono w-[100vw]">
      <Header />

      <div className="flex">
        <div className="pt-40 ml-10 mr-4 w-8/12 sm:w-[90%]">
         

          <iframe
            className="h-[600px] px-4"
            width="100%"
            src="https://www.youtube.com/embed/5zi5eG5Ui-Y?si=PbLAE9ieALFQ7izX"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay;  picture-in-picture;"
            allowfullscreen
          ></iframe>
        </div>

        <div className="pt-40 mr-4 w-4/12 sm:hidden">
          <div className="w-[100%] h-[600px] border-2 border-stone-800">
            <h3 className="text-2xl font-bold text-white p-4">
              What you'll learn
            </h3>
            <div className="flex"></div>
          </div>
        </div>
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

      <Footer />
    </div>
  );
};

export default Course;
