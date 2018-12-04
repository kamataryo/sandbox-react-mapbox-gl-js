import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

class App extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.container,
      style: "mapbox://styles/mapbox/streets-v9"
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className={"map"} ref={e => (this.container = e)} />;
  }
}

export default App;
