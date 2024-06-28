import React, { Component } from "react";
import "./css/Opportunities.css";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";
import SearchInputComponent from "./searchInput";

class OpportunitiesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchTerm: "",
      sortType: "nameAsc",
      cause: "all",
    };
  }

  volunteerSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/opportunities/${id}`);
  };

  fetchData = async () => {
    const res = await OppService.getAllOpps();
    // if (res.data.code !== 200) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // }
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.events);
    this.setState({ items: res.data.events });
  };

  handleSearchChange = (term) => {
    this.setState({ searchTerm: term });
  };

  handleSortChange = (sortType) => {
    this.setState({ sortType });
  };

  handleCauseChange = (cause) => {
    this.setState({ cause });
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    // let items = this.state.items;
    // console.log(items);

    const { items, searchTerm, sortType, cause } = this.state;
    console.log(items);
    let filteredItems = items
      ? items.filter((item) => {
          const itemName = item.name ? item.name.toLowerCase() : "";
          const itemOrganization = item.organization
            ? item.organization.toLowerCase()
            : "";
          return (
            itemName.includes(searchTerm.toLowerCase()) ||
            itemOrganization.includes(searchTerm.toLowerCase())
          );
        })
      : [];

    // filteredItems = filteredItems.filter((item) => {
    //   const itemCause = item.cause ? item.cause.toLowerCase() : "";
    //   return itemCause.includes(cause.toLowerCase());
    // });

    const sortedItems = filteredItems.sort((a, b) => {
      if (sortType === "nameAsc") {
        return a.name.localeCompare(b.name);
      } else if (sortType === "nameDesc") {
        return b.name.localeCompare(a.name);
      } else if (sortType === "latest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortType === "reg-ending-soon") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    return (
      <div className="wrapper">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>

        <h1 className="title">Events</h1>
        <p>Here you can find various opportunities.</p>

        <div className="content">
          <div className="searchbar-container">
            <h1 className="label-text">Search for opportunities</h1>
            <SearchInputComponent
              searchTerm={searchTerm}
              onSearchChange={this.handleSearchChange}
            />

            <div className="right-wrapper">
              <div className="drawer drawer-end">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button btn btn-secondary"
                  >
                    Filters
                  </label>
                </div>

                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="drawer-content p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                      <h2>Sort by</h2>
                      <details className="dropdown">
                        <summary className="m-1 btn">Name: A to Z</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a onClick={() => this.handleSortChange("nameAsc")}>
                              Name: A to Z
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => this.handleSortChange("nameDesc")}
                            >
                              Name: Z to A
                            </a>
                          </li>
                          <li>
                            <a onClick={() => this.handleSortChange("latest")}>
                              Latest
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                this.handleSortChange("reg-ending-soon")
                              }
                            >
                              Registration ending soon
                            </a>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    <li>
                      <h2>Filters</h2>
                      <p>Causes</p>
                      {/* <div className="dropdown-menu show"> 
                         <div className="actionbox">
                          <div className="btn-group btn-group-sm btn-block">
                            {/* <button
                              type="button"
                              className="actions-btn bs-select-all btn btn-light"
                            >
                              Select All
                            </button> 
                             <div className="checkbox-container">
                              <label className="label cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="checkbox"
                                />
                                <p className="label-text">Select all</p>
                              </label>
                            </div>

                            <button
                              type="button"
                              className="actions-btn bs-deselect-all btn btn-light"
                            >
                              Deselect All
                            </button>
                          </div>
                        </div>
                      </div> */}

                      <details className="dropdown">
                        <summary className="m-1 btn">All</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a>Cause 1</a>
                          </li>
                          <li>
                            <a>Cause 2</a>
                          </li>
                          <li>
                            <a>Cause 3</a>
                          </li>
                        </ul>
                      </details>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <p>Opportunity Type</p>
                      {/* <ul>
                        <li>
                          <input
                            type="radio"
                            name="typeOptions"
                            className="radio"
                            value="all"
                          />
                          <label for="option2">All</label>
                        </li>
                        <br></br>
                        <li>
                          <input
                            type="radio"
                            name="typeOptions"
                            className="radio"
                            value="onsite"
                          />
                          <label for="option2">On-site</label>
                        </li>
                        <br></br>
                        <li>
                          <input
                            type="radio"
                            name="typeOptions"
                            className="radio"
                            value="online"
                          />
                          <label for="option2">Online</label>
                        </li>
                      </ul> */}

                      <details className="dropdown">
                        <summary className="m-1 btn">All</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a>Adhoc</a>
                          </li>
                          <li>
                            <a>Short-term (3-6 months)</a>
                          </li>
                          <li>
                            <a>Long-term (>6 months)</a>
                          </li>
                        </ul>
                      </details>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <p>Location</p>
                      <details className="dropdown">
                        <summary className="m-1 btn">All</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a>All</a>
                          </li>
                          <li>
                            <a>Online</a>
                          </li>
                          <li>
                            <a>On-site</a>
                          </li>
                        </ul>
                      </details>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <p>Skills</p>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <ul className="event-listings">
              {sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="card card-compact w-30 bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                      alt={item.name}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <h1>{item.id}</h1>
                    <p>Volunteer opportunity</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-neutral"
                        onClick={(event) =>
                          this.volunteerSubmit(event, item.id)
                        }
                      >
                        Volunteer Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(OpportunitiesComponent);
