import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

const BASE_URL = "https://api.mapbox.com/styles/v1/mapbox/streets-v9";

class App extends Component {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = { style: false };
  }

  componentDidMount = async () => {
    const url = `${BASE_URL}?access_token=${mapboxgl.accessToken}`;

    let style = {};
    try {
      style = await fetch(url).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("error");
        }
      });
    } catch (e) {
      return;
    }

    this.map = new mapboxgl.Map({
      container: this.container,
      style
    });

    this.setState({ style });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.style !== this.state.style) {
      this.map.setStyle(this.state.style);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  onClick = () => {
    const prevStyle = this.state.style;
    console.log(prevStyle);
    const nextStyle = {
      ...prevStyle,
      layers: prevStyle.layers.map(
        layer =>
          layer.id === "landcover_snow"
            ? { ...layer, paint: { ...layer.paint, "fill-color": "red" } }
            : layer
      )
    };
    this.setState({ style: nextStyle });
  };

  render() {
    return (
      <div className={"map"} ref={e => (this.container = e)}>
        <button
          style={{ position: "absolute", zIndex: 1 }}
          onClick={this.onClick}
        >
          {"氷雪地帯は？"}
        </button>
      </div>
    );
  }
}

export default App;
