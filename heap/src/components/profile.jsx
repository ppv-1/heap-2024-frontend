import React, { Component } from "react";
import "./css/Profile.css";
import pfp from "../pfp.jpg";
import withNavigate from "./withNavigate";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="banner h-screen flex justify-center items-center">
          <div className="profile text-center mt-8 font-bold">
            <div class="avatar">
              <div class="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={pfp} alt="avatar" />
              </div>
            </div>
            <h1>John Lee</h1>
          </div>
        </div>
        <div className="divider"></div>

        <div className="details-container h-screen flex justify-center items-center">
          <div className="details">
            <h1>Account</h1>
            <br />
            <div>
              <h2>Name</h2>
              <p>John Lee</p>
            </div>
            <div>
              <h2>Phone Number</h2>
              <p>1234 5678</p>
            </div>
            <div>
              <h2>Email Address</h2>
              <p>johnlee@gmail.com</p>
            </div>
            <div>
              <h2>Password</h2>
              <p>password</p>
              <div className="change-password-container">
                <button className="btn">Change password</button>
              </div>
            </div>
          </div>
        </div>
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
