import React from "react";

const RegisterCourseModal = ( { onClose }) => {
console.log(onClose)
  return (
    <div className="modal">
      <div className="modal-container">
        <div >sfsdf</div>
        <button className="h-10 border-2 border-black" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterCourseModal;
