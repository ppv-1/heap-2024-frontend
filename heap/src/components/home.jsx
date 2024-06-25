import React, { Component } from "react";
import "../components/css/Home.css";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  fetchData = async () => {
    const res = await OppService.getAllOpps();
    // if (res.data.code !== 200) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // }
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    this.setState({ items: res.data.events });
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    let items = this.state.items;
    console.log(items);

    return (
      <>
        <div className="wrapper">
          <div className="content">
            <div className="left-wrapper">
              <div className="searchbar-container">
                <h1 className="label-text">Search opportunities</h1>
                <input
                  type="text"
                  placeholder="Search for opportunities by name or organisation"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
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
                        <summary className="m-1 btn">Latest</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a>Name: A to Z</a>
                          </li>
                          <li>
                            <a>Name: Z to A</a>
                          </li>
                          <li>
                            <a>Registration ending soon</a>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    <li>
                      <h2>Filters</h2>
                      <p>Causes</p>
                      <div className="dropdown-menu show">
                        <div className="actionbox">
                          <div className="btn-group btn-group-sm btn-block">
                            <button
                              type="button"
                              className="actions-btn bs-select-all btn btn-light"
                            >
                              Select All
                            </button>
                            <button
                              type="button"
                              className="actions-btn bs-deselect-all btn btn-light"
                            >
                              Deselect All
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <p>Opportunity Type</p>
                      <ul>
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
                      </ul>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <p>Location</p>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                      <p>Skills</p>
                      <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              {items.map((item) => (
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
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-sm"
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(HomeComponent);
