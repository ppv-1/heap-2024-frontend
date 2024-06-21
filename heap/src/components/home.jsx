import React, { Component } from "react";
import "../components/css/Home.css";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
        <>
          <div className="wrapper">
            <div className="content">
              <div className="left-wrapper">
                <div className="searchbar-container">
                  <h1 className="label-text">Search opportunities</h1>
                  <input
                      type="text"
                      placeholder="Search for opportunities by name or organisation"
                      className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="right-wrapper">
                <div className="drawer drawer-end">
                  <input
                      id="my-drawer-4"
                      type="checkbox"
                      className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-secondary"
                    >
                      Filters
                    </label>
                  </div>

                  <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="drawer-content p-4 w-80 min-h-full bg-base-200 text-base-content">
                      {/* Sidebar content here */}
                      <li>
                        <h2>Sort by</h2>
                        <details className="dropdown">
                          <summary className="m-1 btn">Latest</summary>
                          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li>
                              <a>Name: A to Z</a>
                            </li>
                            <li>
                              <a>Name: Z to A</a>
                            </li>
                            <li>
                              <a>Registration ending soon</a>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <li>
                        <h2>Filters</h2>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default HomeComponent;

// const Home = () => {
//   return (
//     <>
//       <div>
//         <h1 className="title">Home Page</h1>
//         <br />
//         <section className="searchbar">
//           <section className="searchbar-content">
//             <section className="filter">
//               <h1>name</h1>
//             </section>
//             <section className="filter">
//               <h1>type</h1>
//             </section>
//             <h1>org</h1>
//             <h1>date/duration</h1>
//           </section>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Home;
