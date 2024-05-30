import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomeComponent from "./components/home";
import OpportunitiesComponent from "./components/opps";
import OrganizationsComponent from "./components/orgs";
import ProfileComponent from "./components/profile";
import Login from "./components/login";
import Signup from "./components/signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="/opportunities" element={<OpportunitiesComponent />} />
          <Route path="/organizations" element={<OrganizationsComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/profile" element={<ProfileComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const rootElement = document.getElementById("root");
// const root = ReactDOM.createRoot(rootElement);
// root.render(<App />);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
