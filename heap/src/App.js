import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Opps from "./pages/opps";
import Orgs from "./pages/orgs";
import Profile  from "./pages/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="opps" element={<Opps/>}/>
          <Route path="orgs" element={<Orgs/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

// function App() {
//   return (
//     // <nav className="navbar">
//     //   <ul className="nav-list">
//     //     <li>
//     //       <a href="opps">
//     //         <p>Discover</p>
//     //         <p>Opportunities</p>
//     //       </a>
//     //     </li>
//     //     <li>
//     //       <a href="orgs">Organisations</a>
//     //     </li>
//     //   </ul>
//     //   <div className="spacer"></div>
//     //   <div className="logo">
//     //     <img src={logo} alt="logo" />
//     //   </div>
//     //   <div className="spacer"></div>
//     //   <div className="rightnav">
//     //     <ul className="right-nav-list">
//     //       <li>
//     //         <a href="profile">Profile</a>
//     //       </li>
//     //     </ul>
//     //   </div>
//     // </nav>
//   );
// }

// export default App;
