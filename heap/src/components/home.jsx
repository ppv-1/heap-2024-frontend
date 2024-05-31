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
                  {/* Page content here */}
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
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                      <a>Filter Item 1</a>
                    </li>
                    <li>
                      <a>Filter Item 2</a>
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
