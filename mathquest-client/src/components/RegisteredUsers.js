import React from "react";

const RegisteredUsers = ({ registeredUsers }) => {
  return (
    <div>
      <h1 className="text-2xl text-white">Registered Users</h1>
      <div className="border-2 bg-white w-[300px] rounded-md">
        {registeredUsers.map((user) => {
          return (
            <div className="border-1 border-black rounded-sm ">
              <div className="flex m-2">
                <img className="rounded-full  mt-1" src={user.image}></img>
                <h1 className="mx-4 font-bold"> {user.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisteredUsers;
