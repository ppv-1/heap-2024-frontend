import React, { Component } from "react";
import "../components/css/Home.css";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";
import { motion, AnimatePresence } from "framer-motion";
import homePic from "../images/homePic.png";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  oppButtonHandler = (event) => {
    event.preventDefault();
    this.props.navigate("/opportunities");
  };

  orgButtonHandler = (event) => {
    event.preventDefault();
    this.props.navigate("organisations");
  };

  render() {
    // let items = this.state.items;
    // console.log(items);

    return (
      <>
        <div className="wrapper">
          <div className="content">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
            >
              <img src={homePic} alt="Homepage Image" className="image"></img>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: "-100vh" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", duration: 1.5 }}
            >
              <h1 className="title">
                Small Actions, <br />
                Big Changes
              </h1>
              <p>idk what catchphrase LMAO</p>
            </motion.div>
            <motion.div
              className="causes"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                delay: 0.2,
                duration: 2.5,
              }}
            >
              <h1>
                Don't know where to start? <br />
                Here are some causes to volunteer for!
              </h1>
              <div className="carousel rounded-box">
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                    alt="Burger"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                    alt="Burger"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                    alt="Burger"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                    alt="Burger"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                    alt="Burger"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                    alt="Burger"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="mask mask-circle"
                    src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                    alt="Burger"
                  />
                </div>
              </div>
              <h1>Or search for more opportunities here!</h1>
              <div className="button-container">
                <div className="button1" onClick={this.oppButtonHandler}>
                  <button className="btn btn-neutral">Take me there!</button>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="orgs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                delay: 0.2,
                duration: 2.5,
              }}
            >
              <h1>Want to learn more about the organisations we serve?</h1>
              <div className="button-container">
                <div className="button2">
                  <button
                    className="btn btn-neutral"
                    onClick={this.orgButtonHandler}
                  >
                    Take me there!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(HomeComponent);
