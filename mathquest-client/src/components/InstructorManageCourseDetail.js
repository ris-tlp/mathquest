// Importing necessary dependencies from React
import React, { forwardRef, useState } from "react";

// Defining a functional component using forwardRef
const InstructorManageCourseDetail = forwardRef(({
  label,
  editEntry,
  labelValue,
  textarea,
  childRef
}) => {
  return (
    // Container section for the label and input/textarea
    <section className="flex my-4">
      <div className="w-3/12">
        <label className="text-lg font-bold ">{label}</label>
      </div>

      <div className="w-9/12">
        {!editEntry && <h1 className="text-lg font-bold mx-4">{labelValue}</h1>}

        {/* Render input field in edit mode and not a textarea */}
        {editEntry && !textarea && (
          <input
            type="text"
            defaultValue={labelValue}
            ref={childRef}
            className="border-2 border-gray-900 rounded-md w-[80%] p-2"
          ></input>
        )}

        {/* Render textarea in edit mode if specified */}
        {editEntry && textarea && (
          <textarea
            type="text"
            defaultValue={labelValue}
            ref={childRef}
            className="border-2 border-gray-900 rounded-md h-20 w-[80%] p-2"
          ></textarea>
        )}
      </div>
    </section>
  );
});

// Exporting the component as the default export
export default InstructorManageCourseDetail;
