import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Profile = () => {
  const user = useSelector((store) => {
    return store.user;
  });
  return (
    <div className="bg-slate-900">
      <Header />
      <div className="pt-40"></div>

      {user && (
        <div class="bg-slate-300 max-w-2xl shadow overflow-hidden sm:rounded-lg m-auto ">
          <div class="px-4 py-5 sm:px-6 text-center">
            <h1 class="text-2xl leading-6 font-medium slate-900">
              User Profile
            </h1>
            <p class="mt-1 max-w-2xl text-sm slate-900 text-xl">
              Details and informations about {user?.displayName}
            </p>
          </div>
          <div class="border-t border-gray-200 text-center">
            <dl>
              <div class="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                <img className="rounded-full h-[150px] text-center m-auto" src={user?.photoURL}></img>
              </div>
              <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.displayName}
                </dd>
              </div>
              <div class="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">Skills</dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                  React JS
                </dd>
              </div>
              <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                 {user?.email}
                </dd>
              </div>
             
              <div class="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">About</dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                  To get social media testimonials like these, keep your
                  customers engaged with your social media accounts by posting
                  regularly yourself
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
<div className="pt-20"></div>
      <Footer />
    </div>
  );
};

export default Profile;
