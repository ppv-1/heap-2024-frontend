import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/SearchInput.css";

class SearchInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderText: "",
    };
  }

  handleInputChange = (e) => {
    const searchTerm = e.target.value;
    console.log('Search Term:', searchTerm); // Debug log
    this.props.onSearchChange(searchTerm);
  };

  render() {
    return (
      <input
        type="text"
        value={this.props.searchTerm}
        onChange={this.handleInputChange}
        className="input input-bordered"
        placeholder={this.props.placeholderText}
      ></input>
    );
  }
}

export default withNavigateandLocation(SearchInputComponent);
