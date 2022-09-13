import React from "react";
import TabGroup from "../components/TabGroup";

const Profile = () => {
  return (
    <div className="bg-slate-200 h-screen w-screen">
      <div className="m-auto flex flex-wrap justify-around max-w-7xl">
        <div className="relative mt-28 w-[23rem]">
          <img
            className="absolute top-[-4.5rem] left-[50%] translate-x-[-50%] h-40 w-auto rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile picture"
          />
          <div className="flex flex-col justify-center text-center p-4 h-[30rem] bg-white border rounded-xl">
            <p className="mb-1 text-4xl font-bold">John Doe</p>
            <p className="mb-4 text-gray-400">@johndoe27</p>
            <div className="mb-4 h-[10rem] bg-black text-white p-4 rounded">
              Rewards section
            </div>
            <button className="mx-12 p-1 font-medium border border-black rounded-3xl hover:bg-black hover:text-white transition-all">
              Edit profile
            </button>
          </div>
        </div>

        <TabGroup />
      </div>
    </div>
  );
};

export default Profile;
