import React from "react";

const Profile = () => {
  return (
    <div className="bg-slate-200 h-screen m-auto mt-16 flex flex-wrap justify-around max-w-6xl">
      <div className="relative mt-28 w-[90%]">
        <img
          className="absolute top-[-5rem] left-[4.3rem] h-60 w-auto rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile picture"
        />
        <div className="flex flex-col justify-center text-center p-4 h-[40rem] bg-white border rounded-xl">
          <p className="mb-1 text-4xl font-bold">John Doe</p>
          <p className="mb-4 text-gray-400">@johndoe27</p>
          <div className="m-4 h-[10rem] bg-black text-white p-4 rounded">
            Rewards section
          </div>
        </div>
      </div>

      {/* <div>your posts</div> */}
    </div>
  );
};

export default Profile;
