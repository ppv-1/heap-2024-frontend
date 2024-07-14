import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./css/Navbar.css";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  return (
    <nav className="navbar bg-base-100">
      <div className="left-nav">
        <ul className="nav-list">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/opportunities">
                  <p>
                    Discover <br />
                    Opportunities
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/organisations">
                  <p>
                    Our <br />
                    Organisations
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/rewards">Rewards</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/opportunities">
                  <p>
                    Discover <br />
                    Opportunities
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/organisations">
                  <p>
                    Our <br />
                    Organisations
                  </p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="spacer"></div>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="spacer"></div>
      <div className="rightnav">
        <ul className="right-nav-list">
          {isLoggedIn ? (
            userType === "O" ? (
              <>
                <li>
                  <Link to="/create-opportunity">Create Event</Link>
                </li>
                <li>
                  <Link to="/posted-event">View Posted Events</Link>
                </li>
                <li>
                  <Link to="/org-profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : userType === "V" ? (
              <>
                <li>
                  <Link to="/redeemed-rewards">View Redeemed Rewards</Link>
                </li>
                <li>
                  <Link to="/registered-event">View Registered Events</Link>
                </li>
                <li>
                  <Link to="/user-profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : userType === "A" ? (
              <>
                <li>
                  <Link to="/manage-complaints">Manage Complaints </Link>
                </li>
                <li>
                  <Link to="/manage-vols">Manage Volunteers </Link>
                </li>
                <li>
                  <Link to="/manage-rewards">Manage Rewards </Link>
                </li>
                <li>
                  <Link to="/manage-orgs">Manage Organisations</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/user-profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../images/logo.png";
// import "./css/Navbar.css";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userType = localStorage.getItem("userType");

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="navbar bg-base-100">
//       <div className="flex justify-between items-center w-full px-4">
//         <div className="left-nav hidden lg:flex">
//           <ul className="nav-list flex space-x-4">
//             <li>
//               <Link to="/opportunities">
//                 <p>
//                   Discover <br />
//                   Opportunities
//                 </p>
//               </Link>
//             </li>
//             <li>
//               <Link to="/organisations">
//                 <p>
//                   Our <br />
//                   Organisations
//                 </p>
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <Link to="/rewards">Rewards</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="flex-grow text-center">
//           <Link to="/" className="logo">
//             <img src={logo} alt="logo" className="inline h-12 w-auto" />
//           </Link>
//         </div>
//         <div className="lg:hidden">
//           <button
//             className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>
//         </div>
//         <div className="hidden lg:flex right-nav">
//           <ul className="right-nav-list flex space-x-4">
//             {isLoggedIn ? (
//               userType === "O" ? (
//                 <>
//                   <li>
//                     <Link to="/create-opportunity">Create Event</Link>
//                   </li>
//                   <li>
//                     <Link to="/posted-event">View Posted Events</Link>
//                   </li>
//                   <li>
//                     <Link to="/org-profile">Profile</Link>
//                   </li>
//                   <li>
//                     <Link to="/logout">Logout</Link>
//                   </li>
//                 </>
//               ) : userType === "V" ? (
//                 <>
//                   <li>
//                     <Link to="/redeemed-rewards">View Redeemed Rewards</Link>
//                   </li>
//                   <li>
//                     <Link to="/registered-event">View Registered Events</Link>
//                   </li>
//                   <li>
//                     <Link to="/user-profile">Profile</Link>
//                   </li>
//                   <li>
//                     <Link to="/logout">Logout</Link>
//                   </li>
//                 </>
//               ) : userType === "A" ? (
//                 <>
//                   <li>
//                     <Link to="/manage-complaints">Manage Complaints</Link>
//                   </li>
//                   <li>
//                     <Link to="/manage-vols">Manage Volunteers</Link>
//                   </li>
//                   <li>
//                     <Link to="/manage-rewards">Manage Rewards</Link>
//                   </li>
//                   <li>
//                     <Link to="/manage-orgs">Manage Organisations</Link>
//                   </li>
//                   <li>
//                     <Link to="/logout">Logout</Link>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <Link to="/user-profile">Profile</Link>
//                   </li>
//                   <li>
//                     <Link to="/logout">Logout</Link>
//                   </li>
//                 </>
//               )
//             ) : (
//               <>
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/sign-up">Sign Up</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } lg:hidden mobile-menu`}
//       >
//         <ul className="nav-list flex flex-col space-y-4 mt-4">
//           <li>
//             <Link to="/opportunities">
//               <p>
//                 Discover <br />
//                 Opportunities
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/organisations">
//               <p>
//                 Our <br />
//                 Organisations
//               </p>
//             </Link>
//           </li>
//           {isLoggedIn && (
//             <li>
//               <Link to="/rewards">Rewards</Link>
//             </li>
//           )}
//         </ul>
//         <ul className="right-nav-list flex flex-col space-y-4 mt-4">
//           {isLoggedIn ? (
//             userType === "O" ? (
//               <>
//                 <li>
//                   <Link to="/create-opportunity">Create Event</Link>
//                 </li>
//                 <li>
//                   <Link to="/posted-event">View Posted Events</Link>
//                 </li>
//                 <li>
//                   <Link to="/org-profile">Profile</Link>
//                 </li>
//                 <li>
//                   <Link to="/logout">Logout</Link>
//                 </li>
//               </>
//             ) : userType === "V" ? (
//               <>
//                 <li>
//                   <Link to="/redeemed-rewards">View Redeemed Rewards</Link>
//                 </li>
//                 <li>
//                   <Link to="/registered-event">View Registered Events</Link>
//                 </li>
//                 <li>
//                   <Link to="/user-profile">Profile</Link>
//                 </li>
//                 <li>
//                   <Link to="/logout">Logout</Link>
//                 </li>
//               </>
//             ) : userType === "A" ? (
//               <>
//                 <li>
//                   <Link to="/manage-complaints">Manage Complaints</Link>
//                 </li>
//                 <li>
//                   <Link to="/manage-vols">Manage Volunteers</Link>
//                 </li>
//                 <li>
//                   <Link to="/manage-rewards">Manage Rewards</Link>
//                 </li>
//                 <li>
//                   <Link to="/manage-orgs">Manage Organisations</Link>
//                 </li>
//                 <li>
//                   <Link to="/logout">Logout</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/user-profile">Profile</Link>
//                 </li>
//                 <li>
//                   <Link to="/logout">Logout</Link>
//                 </li>
//               </>
//             )
//           ) : (
//             <>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//               <li>
//                 <Link to="/sign-up">Sign Up</Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
