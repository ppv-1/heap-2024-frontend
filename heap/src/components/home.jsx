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
    // let items = this.state.items;
    // console.log(items);

    return (
      <>
        <div className="wrapper">
          <h1>Home</h1>

          <div className="content">
            {/* <div className="carousel rounded-box">
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                  alt="Burger"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                  alt="Burger"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                  alt="Burger"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                  alt="Burger"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                  alt="Burger"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                  alt="Burger"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                  alt="Burger"
                />
              </div>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(HomeComponent);
