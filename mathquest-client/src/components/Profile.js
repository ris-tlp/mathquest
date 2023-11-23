import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => {
    return store.user;
  });
  return (
    <div>
      <Header />
      <div className="pt-40"></div>

      {
        user && <div class="w-full mx-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <div class="flex flex-col items-center p-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            alt="Bonnie image"
            src={user?.photoURL}
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            { user?.displayName }
          </h5>
          
          
        </div>
      </div>
      }

      
    </div>
  );
};

export default Profile;
