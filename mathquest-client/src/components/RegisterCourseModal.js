import React from "react";

const RegisterCourseModal = ({ data, onClose, handleCourseRegister }) => {
  return (
    <div className="modal font-mono">
      <div className="modal-container p-4">
        <h1 className="text-2xl font-bold underline ">{data.courseName}</h1>

        <div className="flex sm:flex-col ">
          <div className="w-7/12 sm:w-full">
            <p className="text-lg font-bold my-2">{data.courseDescription}</p>
          </div>
          <div className="w-4/12 mx-auto sm:w-full">
            <img src={data.instructorImage} className="border-4" />
            <p className="font-bold text-lg">{data.courseInstructor}</p>
            <p className="font-bold text-sm">{data.instructorDescription}</p>
          </div>
        </div>

        <button
          className="h-10 border-2 border-black rounded-lg bg-slate-900 text-white w-40  sm:w-full sm:mt-1 md:mx-10 lg:mx-10 xl:mx-10"
          onClick={onClose}
        >
          Close
        </button>

        <button
          className="h-10 border-2 border-black rounded-lg bg-slate-900 text-white w-40 md:float-right lg:float-right xl:float-right md:mx-10 lg:mx-10 xl:mx-10 sm:w-full sm:mt-1 "
          onClick={handleCourseRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterCourseModal;
