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

    let searchParams = new URLSearchParams(props.location.search);
    let causeQuery = searchParams.get("cause");
    let theme = getTheme();

    this.state = {
      items: [],
      searchTerm: "",
      sortType: "nameAsc",
      cause: causeQuery ? [causeQuery] : [],
      cause2: [],
      type: "all",
      location: "all",
      skill: [],
      placeholderText: "Search for opportunities by name or organisation",
      currentPage: 1,
      postsPerPage:  6,
      theme: theme,
    };
  }

  volunteerSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/opportunities/${id}`);
  };

  handleNavigation = (cause) => {
    this.props.navigate("/opportunities", { state: { cause } });
  };

  fetchData = async () => {
    const res = await OppService.getAllOpps();
    this.setState({ items: res.data.events });
    console.log("causes");
    console.log(causes);
    console.log("this.state.cause");
    console.log(this.state.cause);
    console.log(causes.find((c) => c.value === this.state.cause[0])?.label);
    const selectedCauses = this.state.cause.map((cause_in) => ({
      label: causes.find((c) => c.value === cause_in)?.label || cause_in,
      value: cause_in,
    }
    ));
    console.log(selectedCauses);
    this.setState({cause2: selectedCauses});
  };

  handleSearchChange = (term) => {
    this.setState({ searchTerm: term });
  };

  handleSortChange = (sortType) => {
    this.setState({ sortType });
  };

  handleCauseChange = (selected) => {
    let causesss = this.state.cause.concat(this.state.cause2, selected);
    causesss = [...new Set(causesss)];
    this.setState({ cause: selected, cause2: [] });
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
    // let searchParams = new URLSearchParams(props.location.search);
    // let causeQuery = searchParams.get("cause");
    // this.setState({cause: causeQuery ? [causeQuery] : []})
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
    console.log(this.state);

    const isDarkMode = this.state.theme === "dim";
    const multiSelectClassName = isDarkMode ? "dark" : "";

    let filteredItems = items
      ? items.filter((item) => {
          const itemName = item.name ? item.name.toLowerCase() : "";
          const itemOrganization = item.organization
            ? item.organization.toLowerCase()
            : "";
          const itemLocation = item.location ? item.location.toLowerCase() : "";
          let itemCauses = item.causes || this.state.cause || [];
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
      } else if (sortType === "oldest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortType === "newest") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    // Get current items
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstPost, indexOfLastPost);

    let causesss = this.state.cause2.concat(this.state.cause);
    causesss = [...new Set(causesss)];
    // this.setState({cause: causesss});
    // this.setState({cause2: []});

    return (
      <div className="wrapper">
        <h1 className="title">Opportunities</h1>
        {/*<p>Here you can find various opportunities.</p>*/}

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
                          <a onClick={() => this.handleSortChange("oldest")}>
                            Date: Newest to Oldest
                          </a>
                        </li>
                        <li>
                          <a
                              onClick={() =>
                                  this.handleSortChange("newest")
                              }
                          >
                            Date: Oldest to Newest
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <hr className="my-3 h-0.5 border-t-0 bg-gray opacity-100 dark:opacity-50"/>
                  <li>
                    <h2>Filters</h2>
                    <p>Causes</p>
                    <MultiSelect
                        options={causes}
                        value={causesss}
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

          {/*<div className="wrapper">*/}
            <ul className="event-listings">
              {currentItems.map((item) => {
                const itemDate = new Date(item.date);
                const currentDate = new Date();
                const isPast = itemDate < currentDate;

                return (
                    <div
                        key={item.id}
                        className="card card-compact w-30 bg-base-100 shadow-xl"
                    >
                      <figure>
                        <img src={item.photosFilepaths[0]} alt={item.name} />
                      </figure>
                      <div className="card-body flex flex-col justify-between">
                        <div className="card-title mb-4">
                          <h2 className="card-title w-full">{item.name}</h2>
                          <div className="flex justify-start w-full mb-2 gap-2">
                            <div className="badge badge-accent">
                              {item.neededManpowerCount} Spots Left
                            </div>
                            <div className="badge badge-accent">
                              {isPast ? "Past Event" : "Upcoming Event"}
                            </div>
                          </div>
                          <div className="cause-badges flex flex-wrap gap-2">
                            {item.causes.map((cause, index) => (
                                <div key={index} className="badge badge-neutral">
                                  {causes.find((c) => c.value === cause)?.label}
                                </div>
                            ))}
                          </div>
                        </div>

                        <div className="card-actions flex justify-end mt-4">
                          <button
                              className="btn"
                              onClick={(event) =>
                                  this.volunteerSubmit(event, item.id)
                              }
                              // disabled={new Date(item.date) < new Date()}
                          >
                            Volunteer Now
                          </button>
                        </div>
                      </div>
                    </div>
                );
              })}
            </ul>
        </div>


        <Pagination
            postsPerPage={postsPerPage}
            length={filteredItems.length}
            paginate={this.handlePageChange}
        />
      </div>
        // </div>
    );
  }
}

export default withNavigateandLocation(OpportunitiesComponent);
