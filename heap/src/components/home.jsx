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
        <div>
          <h1 className="title">Home Page</h1>
          <br />
          <section className="searchbar">
            <section className="searchbar-content">
              <section className="filter">
                <h1>name</h1>
              </section>
              <section className="filter">
                <h1>type</h1>
              </section>
              <h1>org</h1>
              <h1>date/duration</h1>
            </section>
          </section>
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
