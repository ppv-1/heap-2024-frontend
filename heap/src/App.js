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
import ResetPassword from "./components/resetPassword";
import ChangePassword from "./components/changePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact index element={<HomeComponent />} />
          <Route exact path="/opportunities" element={<OpportunitiesComponent />} />
          <Route exact path="/organizations" element={<OrganizationsComponent />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/profile" element={<ProfileComponent />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
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
