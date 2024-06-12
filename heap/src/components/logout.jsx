import React, { Component } from "react";
import "../components/css/Home.css";
import withNavigateandLocation from "./withNavigateandLocation";
import { Link } from "react-router-dom";

class LogoutComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // this.props.navigate("/login");
    }

    componentDidMount() {
        // Navigate to login page when component mounts
        localStorage.removeItem("token");
        this.props.navigate("/login");
    }

    render() {
        return (null);
    }
}

export default withNavigateandLocation(LogoutComponent);