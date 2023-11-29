import React, { forwardRef, useState } from "react";

const InstructorManageCourseDetail = forwardRef(({
  label,
  editEntry,
  labelValue,
  textarea,
  childRef
}) => {
  return (
    <section className="flex my-4">
      <div className="w-3/12">
        <label className="text-lg font-bold ">{label}</label>
      </div>

      <div className="w-9/12">
        {!editEntry && <h1 className="text-lg font-bold mx-4">{labelValue}</h1>}
        {editEntry && !textarea && (
          <input
            type="text"
            value={labelValue}
            ref={childRef}
            className="border-2 border-gray-900 rounded-md w-[80%] p-2"
          ></input>
        )}
        {editEntry && textarea && (
          <textarea
            type="text"
            value={labelValue}
            ref={childRef}
            className="border-2 border-gray-900 rounded-md h-20 w-[80%] p-2"
          ></textarea>
        )}
      </div>
    </section>
  );
});

export default InstructorManageCourseDetail;
