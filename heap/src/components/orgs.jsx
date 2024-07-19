import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";
import SearchInputComponent from "./searchInput";
import orgDefault from "../images/orgDefault.png";

class OrganisationsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchTerm: "",
      placeholderText: "Search for organisations",
    };
  }
  fetchData = async () => {
    const res = await OrgService.getAllOrgs();
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.orgs);
    this.setState({ items: res.data.orgs });
  };
  async componentDidMount() {
    await this.fetchData();
  }

  handleSearchChange = (term) => {
    this.setState({ searchTerm: term });
  };

  organisationSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/organisations/${id}`);
  };

  render() {
    let { items, searchTerm } = this.state;
    let filteredItems = items
      ? items.filter((item) => {
          const itemOrganization = item.organization
            ? item.organization.toLowerCase()
            : "";
          return itemOrganization.includes(searchTerm.toLowerCase());
        })
      : [];
    return (
      <div className="wrapper">
        {/* <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div> */}
        <h1 className="title">Organisations</h1>
        <p>Here you can find information about different organisations.</p>
        <div className="searchbar-container">
          <SearchInputComponent
            searchTerm={searchTerm}
            onSearchChange={this.handleSearchChange}
            placeholderText={this.state.placeholderText}
          />
        </div>
        <br />
        <div className="vol-listings">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card card-compact bg-base-100 shadow-xl"
            >
              <figure>
                {item.pfp_filepath ? (
                  <img src={item.pfp_filepath} alt={item.fullName} />
                ) : (
                  <img src={orgDefault} alt="Default Image" />
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.fullName}</h2>
                {/*<h1>{item.id}</h1>*/}
                <button
                  className="btn btn-sm btn"
                  onClick={(event) =>
                    this.organisationSubmit(event, item.email)
                  }
                >
                  More info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(OrganisationsComponent);
