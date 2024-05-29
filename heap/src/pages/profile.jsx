import React from "react";
import "../components/Profile.css";
import pfp from "../pfp.jpg";

const Profile = () => {
  return (
    <>
      <section className="banner h-screen flex justify-center items-center">
        <section className="profile text-center mt-8 font-bold">
          <div class="avatar">
            <div class="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={pfp} alt="avatar" />
            </div>
          </div>
          <h1>John Lee</h1>
          <p>johnlee@gmail.com</p>
        </section>
      </section>
      <section className="profile-details">
        
      </section>
    </>
  );
};

export default Profile;
