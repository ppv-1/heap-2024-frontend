import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./css/Navbar.css";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {isLoggedIn ? (
              userType === "O" ? (
                <>
                  <li>
                    <Link to="/opportunities">Discover Opportunities</Link>
                  </li>
                  <li>
                    <Link to="/organisations">Our Organisations</Link>
                  </li>
                  <li>
                    <Link to="/rewards">Rewards</Link>
                  </li>
                  <li>
                    <Link to="/create-complaint">Feedback</Link>
                  </li>
                  <li>
                    <Link to="/create-opportunity">Create Event</Link>
                  </li>
                  <li>
                    <Link to="/posted-event">View Posted Events</Link>
                  </li>
                </>
              ) : userType === "V" ? (
                <>
                  <li>
                    <Link to="/opportunities">
                      Discover <br />
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/organisations">
                      Our <br />
                      Organisations
                    </Link>
                  </li>
                  <li>
                    <Link to="/rewards">Rewards</Link>
                  </li>
                  <li>
                    <Link to="/create-complaint">Feedback</Link>
                  </li>
                  <li>
                    <Link to="/redeemed-rewards">View Redeemed Rewards</Link>
                  </li>
                  <li>
                    <Link to="/registered-event">View Registered Events</Link>
                  </li>
                </>
              ) : userType === "A" ? (
                <>
                  <li>
                    <Link to="/opportunities">
                      Discover <br />
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/organisations">
                      Our <br />
                      Organisations
                    </Link>
                  </li>
                  <li>
                    <Link to="/rewards">Rewards</Link>
                  </li>
                  <li>
                    <Link to="/manage-complaints">Manage Feedback</Link>
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
                </>
              ) : (
                <></>
              )
            ) : (
              <>
                <li>
                  <Link to="/opportunities">
                    Discover <br />
                    Opportunities
                  </Link>
                </li>
                <li>
                  <Link to="/organisations">
                    Our <br />
                    Organisations
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <ul className="nav-list">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/opportunities">
                  Discover <br />
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/organisations">
                  Our <br />
                  Organisations
                </Link>
              </li>
              <li>
                <Link to="/rewards">Rewards</Link>
              </li>
              <li>
                <Link to="/create-complaint">Feedback</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/opportunities">
                  Discover <br />
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/organisations">
                  Our <br />
                  Organisations
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="right-nav-list-small">
          {isLoggedIn ? (
            userType === "A" ? (
              <>
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
                  <Link to="/redeemed-rewards">
                    View <br />
                    Redeemed Rewards
                  </Link>
                </li>
                <li>
                  <Link to="/registered-event">
                    View <br />
                    Registered Events
                  </Link>
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
                  <Link to="/manage-complaints">Manage Feedback </Link>
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
