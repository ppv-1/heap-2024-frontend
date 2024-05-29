import React, { Component } from "react";
import "./css/Profile.css";
import pfp from "../pfp.jpg";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
          </section>
        </section>
        <div className="divider"></div>

        <section className="details-container h-screen flex justify-center items-center">
          <section className="details">
            <h1>Account</h1>
            <br />
            <h2>Name</h2>
            <p>John Lee</p>
            <h2>Phone Number</h2>
            <p>1234 5678</p>
            <h2>Email Address</h2>
            <p>johnlee@gmail.com</p>
          </section>
        </section>
      </>
    );
  }
}

export default ProfileComponent;

// const Profile = () => {
//   return (
//     <>
//       <section className="banner h-screen flex justify-center items-center">
//         <section className="profile text-center mt-8 font-bold">
//           <div class="avatar">
//             <div class="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
//               <img src={pfp} alt="avatar" />
//             </div>
//           </div>
//           <h1>John Lee</h1>
//         </section>
//       </section>
//       <div className="divider"></div>

//       <section className="details-container h-screen flex justify-center items-center">
//         <section className="details">
//           <h1>Account</h1>
//           <br />
//           <h2>Name</h2>
//           <p>John Lee</p>
//           <h2>Phone Number</h2>
//           <p>1234 5678</p>
//           <h2>Email Address</h2>
//           <p>johnlee@gmail.com</p>
//         </section>
//       </section>
//     </>
//   );
// };

// export default Profile;
