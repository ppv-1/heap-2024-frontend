import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomeComponent from "./components/home";
import OpportunitiesComponent from "./components/opps";
import OrganisationsComponent from "./components/orgs";
import UserProfileComponent from "./components/profile";
import OrganisationProfileComponent from "./components/orgProfile";
import Login from "./components/login";
import ResetPassword from "./components/resetPassword";
import ChangePassword from "./components/changePassword";
import OpportunityComponent from "./components/oppDetails";
import CreateOppComponent from "./components/createOpp"
import RegisterVolunteer from "./components/registerVolunteer";
import RegisterOrganisation from "./components/registerOrganisation";
import Logout from "./components/logout";
import LogoutComponent from "./components/logout";
import UserService from "./services/UserService";
import ProtectedRoute from './components/ProtectedRoute';
import RegisteredEvent from "./components/registeredEvent";
import PostedEvent from "./components/postedEvent";
import SignUp from "./components/signUp";
import EditOpp from "./components/editOpp";
import OrgDetails from "./components/orgDetails"
import CreateReward from "./components/createReward";
import RegisterAdmin from "./components/registerAdmin";
import Rewards from "./components/rewards";
import RewardDetails from "./components/rewardDetails";
import ManageOrgs from "./components/manageOrgs";
import ManageRewards from "./components/manageRewards";
import EditReward from "./components/editReward";
import ManageVols from "./components/manageVols";
import PostedEventDetails from "./components/postedEventDetails";
import { NavigateProvider } from './services/NavigateProvider';
import ForgetPassword from "./components/forgetPassword";
import EditProfile from "./components/editProfile";
import EditOrgProfile from "./components/editOrgProfile";
import CreateComplaint from "./components/createComplaint";
import ManageComplaints from "./components/manageComplaints";
import RedeemedRewards from "./components/redeemedRewards";
import ManageRewardsDetails from "./components/manageRewardDetails";
import ManageOrgDetails from "./components/manageOrgDetails";

export default function App() {
  return (
    <BrowserRouter>
      <NavigateProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route exact index element={<HomeComponent />} />
          <Route exact path="/opportunities" element={<OpportunitiesComponent />} />
          <Route exact path="/organisations" element={<OrganisationsComponent />} />
          <Route exact path="/rewards" element={<Rewards />} />
          <Route exact path="/rewards/:id" element={<RewardDetails />} />
          <Route exact path="/organisations/:id" element={<OrgDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register-admin" element={<RegisterAdmin />} />
          <Route exact path="/register-volunteer" element={<RegisterVolunteer />} />
          <Route exact path="/register-organisation" element={<RegisterOrganisation />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/reset-password/:token" element={<ResetPassword />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route exact path="/opportunities/:id" element={<OpportunityComponent />} />
          <Route exact path="/logout" element={<LogoutComponent />} />
          <Route exact path="/forget-password" element={<ForgetPassword />} />
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/redeemed-rewards" element={<RedeemedRewards />} />
            <Route exact path="/create-complaint" element={<CreateComplaint />} />
            <Route exact path="/manage-complaints" element={<ManageComplaints />} />
            <Route exact path="/posted-event/:id" element={<PostedEventDetails />} />
            <Route exact path="/edit-reward/:id" element={<EditReward />} />
            <Route exact path="/manage-rewards" element={<ManageRewards />} />
            <Route exact path="/manage-vols" element={<ManageVols />} />
            <Route exact path="/manage-orgs" element={<ManageOrgs />} />
            <Route exact path="/manage-rewards/:id" element={<ManageRewardsDetails />} />
            <Route exact path="/manage-orgs/:id" element={<ManageOrgDetails />} />
            <Route exact path="/create-reward" element={<CreateReward />} />
            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route exact path="/edit-org-profile" element={<EditOrgProfile />} />
            <Route exact path="/user-profile" element={<UserProfileComponent />} />
            <Route exact path="/org-profile" element={<OrganisationProfileComponent />} />
            <Route exact path="/create-opportunity" element={<CreateOppComponent />} />
            <Route exact path="/registered-event" element={<RegisteredEvent />} />
            <Route exact path="/posted-event" element={<PostedEvent />} />
            <Route exact path="/edit-event/:id" element={<EditOpp />} />
          </Route>
          
        </Route>
      </Routes>
      </NavigateProvider>
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
