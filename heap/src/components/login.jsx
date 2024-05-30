import React, { Component } from "react";
import "./css/Login.css";
import UserService from "../services/UserService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  componentDidMount() {

  }

  loginSubmit = (event) => {
    event.preventDefault();
    let credentials = {username: this.state.username, password: this.state.password};
    UserService.loginUser(credentials).then(res=>{
      this.props.history.push('/profile')
    })
  }

  changeUsernameHandler= (event) => {
    this.setState({username: event.target.value});
  }

  changePasswordHandler= (event) => {
    this.setState({password: event.target.value});
  }

  register() {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <>
        <div className="login-wrapper">
          <h1 className="title">LOGIN</h1>
          <form>
            <label>
              <p>Username</p>
              <input type="text" value={this.state.username} onChange={this.changeUsernameHandler}/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" value={this.state.password} onChange={this.changePasswordHandler}/>
            </label>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.loginSubmit}>Login</button>
            </div>
          </form>

        </div>
      </>
    );
  }
}

export default Login;

// export default function Login() {
//   return (
//     <div className="login-wrapper">
//       <h1 className="title">LOGIN</h1>
//       <form>
//         <label>
//           <p>Username</p>
//           <input type="text" />
//         </label>
//         <label>
//           <p>Password</p>
//           <input type="password" />
//         </label>
//         <div className="button-container">
//           <button className="btn btn-wide">
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
