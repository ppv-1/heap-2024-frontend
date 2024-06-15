import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import "./css/Navbar.css";
import UserService from "../services/UserService";


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,

    };
  }

  // fetchData = async () => {
  //   const res = await UserService.getProfile();
  //   console.log(res.data.userType + "hi" + typeof res.data.userType);

  //   this.setState({
  //     isLoggedIn: true,
  //     });
  //   console.log(this.state.userType +" the user type");
  // }

  componentDidMount() {
    // this.fetchData();
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isLoggedIn: true});
    }
    console.log(this.state.isLoggedIn + "the state");
  }

  render() {

    const { isLoggedIn } = this.state;
    // const { userType } = this.state.userType;
    
    console.log(isLoggedIn + "---hello");
    // console.log(userType + "user");

    return (
      <>
        <nav className="navbar bg-base-100">
          <ul className="nav-list">
            <li>
              <Link to="/opportunities">
                <p>Discover</p>
                <p>Opportunities</p>
              </Link>
            </li>
            <li>
              <Link to="/organisations">
                <p>Our</p>
                <p>Organisations</p>
              </Link>
            </li>
          </ul>
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

                
                <>
                {/* {userType === 'O' ? (
                  <li>
                    <Link to="/create-opportunity">Create Event</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/organisations">View Events</Link>
                  </li>
                )}  */}
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register-volunteer">Volunteer</Link>
                  </li>
                  <li>
                    <Link to="/register-organisation">Organisation</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
