import React, { Component } from "react";
import "./css/Opportunities.css";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";
import SearchInputComponent from "./searchInput";
import { MultiSelect } from "react-multi-select-component";
import Pagination from "./pagination";

const causes = [
  { label: "Animal Welfare", value: "animalWelfare" },
  { label: "Arts", value: "arts" },
  { label: "Children", value: "children" },
  { label: "Community", value: "community" },
  { label: "Drug Awareness", value: "drugs" },
  { label: "Education", value: "education" },
  { label: "Eldercare", value: "elderly" },
  { label: "Environment and Water", value: "environment" },
  { label: "Families", value: "families" },
  { label: "Health", value: "health" },
  { label: "Heritage", value: "heritage" },
  { label: "Humanitarian", value: "humanitarian" },
  { label: "Mental Health", value: "mentalHealth" },
  { label: "Migrant Workers", value: "migrantWorkers" },
  { label: "Other", value: "other" },
  { label: "Rehabilitation & Reintegration", value: "rehabilitation" },
  { label: "Safety & Security", value: "safety" },
  { label: "Social Services", value: "socialServices" },
  { label: "Special Needs/Disabilities", value: "disabilities" },
  { label: "Sports", value: "sports" },
  { label: "Women & Girls", value: "women" },
  { label: "Youth", value: "youth" },
];

const skills = [
  { label: "Art & Craft", value: "art" },
  { label: "Befriending", value: "befriending" },
  { label: "Coaching & Mentoring", value: "coaching" },
  { label: "Counselling", value: "counselling" },
  { label: "Dialect-Speaking", value: "dialect" },
  { label: "Emcee skills", value: "emcee" },
  { label: "Entrepreneurship", value: "entrepreneurship" },
  { label: "Event Management", value: "eventManagement" },
  { label: "Facilitation", value: "facilitation" },
  { label: "First-aid", value: "firstAid" },
  { label: "Graphic Design", value: "GraphicDesign" },
  { label: "Language Translation", value: "translation" },
  { label: "Music", value: "music" },
  { label: "Photography", value: "photography" },
  { label: "Reading", value: "reading" },
  { label: "Sign Language", value: "signLanguage" },
  { label: "Social Media Execution", value: "socialMedia" },
  { label: "Software Development", value: "softwareDevelopment" },
  { label: "Sports", value: "sports" },
  { label: "Tutoring", value: "tutor" },
  { label: "Videography", value: "videography" },
  { label: "Web Design", value: "webDesign" },
  { label: "Others", value: "other" },
];

const getTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return systemPrefersDark ? 'dim' : 'light';
};

class OpportunitiesComponent extends Component {
  constructor(props) {
    super(props);

    let theme = getTheme();
    let searchParams = new URLSearchParams(props.location.search);
    let causeQuery = searchParams.get("cause");

    this.state = {
      items: [],
      searchTerm: "",
      sortType: "nameAsc",
      cause: causeQuery ? [causeQuery] : [],
      type: "all",
      location: "all",
      skill: [],
      placeholderText: "Search for opportunities by name or organisation",
      currentPage: 1,
      postsPerPage: 8,
      theme: theme,
    };
  }

  volunteerSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/opportunities/${id}`);
  };

  fetchData = async () => {
    const res = await OppService.getAllOpps();
    this.setState({ items: res.data.events });
  };

  handleSearchChange = (term) => {
    this.setState({ searchTerm: term });
  };

  handleSortChange = (sortType) => {
    this.setState({ sortType });
  };

  handleCauseChange = (selected) => {
    this.setState({ cause: selected });
  };

  handleTypeChange = (type) => {
    this.setState({ type });
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  handleSkillChange = (selected) => {
    this.setState({ skill: selected });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    let {
      items,
      searchTerm,
      sortType,
      cause,
      type,
      location,
      skill,
      currentPage,
      postsPerPage,
    } = this.state;

    const isDarkMode = this.state.theme === "dim";
    const multiSelectClassName = isDarkMode ? "dark" : "";

    let filteredItems = items
      ? items.filter((item) => {
          const itemName = item.name ? item.name.toLowerCase() : "";
          const itemOrganization = item.organization
            ? item.organization.toLowerCase()
            : "";
          const itemLocation = item.location ? item.location.toLowerCase() : "";
          let itemCauses = item.causes || [];
          const itemType = item.type ? item.type.toLowerCase() : "";
          let itemSkills = item.skills || [];

          const searchMatch =
            itemName.includes(searchTerm.toLowerCase()) ||
            itemOrganization.includes(searchTerm.toLowerCase());
          const locationMatch =
            location === "all" || itemLocation.includes(location);
          const causesMatch =
            cause.length === 0 ||
            cause.some((c) => itemCauses.includes(c.value)) ||
            cause.some((c) => itemCauses.includes(c.valueOf()));
          const typeMatch = type === "all" || itemType.includes(type);
          const skillsMatch =
            skill.length === 0 ||
            skill.some((s) => itemSkills.includes(s.value));

          return (
            searchMatch &&
            locationMatch &&
            causesMatch &&
            typeMatch &&
            skillsMatch
          );
        })
      : [];

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

    // Get current items
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="wrapper">
        <h1 className="title">Events</h1>
        <p>Here you can find various opportunities.</p>

        <div className="opps-content">
          <div className="searchbar-container">
            <SearchInputComponent
              searchTerm={searchTerm}
              onSearchChange={this.handleSearchChange}
              placeholderText={this.state.placeholderText}
            />
          </div>

          <div className="right-wrapper">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn">
                  Filters
                </label>
              </div>

              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="drawerr-content p-4 w-80 bg-base-200 text-base-content">
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
                          <a onClick={() => this.handleSortChange("nameDesc")}>
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
                    <MultiSelect
                      options={causes}
                      value={this.state.cause}
                      onChange={this.handleCauseChange}
                      labelledBy="Select related causes"
                      disableSearch="true"
                      className={`multiselect ${multiSelectClassName}`}
                    />
                    <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    <p>Opportunity Type</p>
                    <details className="dropdown">
                      <summary className="m-1 btn">All</summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>
                          <a onClick={() => this.handleTypeChange("all")}>
                            All
                          </a>
                        </li>
                        <li>
                          <a onClick={() => this.handleTypeChange("ad-hoc")}>
                            Adhoc
                          </a>
                        </li>
                        <li>
                          <a onClick={() => this.handleTypeChange("short")}>
                            Short-term (3-6 months)
                          </a>
                        </li>
                        <li>
                          <a onClick={() => this.handleTypeChange("long")}>
                            Long-term ({">"}6 months)
                          </a>
                        </li>
                      </ul>
                    </details>
                    <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    <p>Location</p>
                    <details className="dropdown">
                      <summary className="m-1 btn">All</summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>
                          <a onClick={() => this.handleLocationChange("all")}>
                            All
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => this.handleLocationChange("online")}
                          >
                            Online
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => this.handleLocationChange("on-site")}
                          >
                            On-site
                          </a>
                        </li>
                      </ul>
                    </details>
                    <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50" />
                    <p>Skills</p>
                    <MultiSelect
                      options={skills}
                      value={this.state.skill}
                      onChange={this.handleSkillChange}
                      labelledBy="Select related skills"
                      disableSearch="true"
                      className={`multiselect ${multiSelectClassName}`}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ul className="event-listings">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="card card-compact w-30 bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={item.photosFilepaths[0]} alt={item.name} />
                </figure>
                <div className="card-body">
                  <div className="card-title">
                    <h2 className="card-title">{item.name}</h2>
                    <div className="badge badge-accent">
                      {item.neededManpowerCount} Spots left
                    </div>
                    <br />
                    <div className="cause-badges">
                      {item.causes.map((cause, index) => (
                        <div key={index} className="badge badge-neutral">
                          {causes.find((c) => c.value === cause)?.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      className="btn"
                      onClick={(event) => this.volunteerSubmit(event, item.id)}
                    >
                      Volunteer Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>

          <Pagination
            postsPerPage={postsPerPage}
            length={filteredItems.length}
            paginate={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(OpportunitiesComponent);
