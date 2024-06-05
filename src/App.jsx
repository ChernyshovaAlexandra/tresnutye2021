import React, { useEffect, useState } from "react";
import IndexPage from "./IndexPage";
import "./assets/scss/index.scss";
// import NavJS from "./components/NavJS";
// import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import API from "./utils/API";
import MainPlayer from "./components/elements/MainPlayer";


export default function App(props) {
  const [video, setVideo] = useState()
  useEffect(() => {
    let str = window.location.search
    if (str.length) {
      API.get(`/prilipal/video${str}`)
        .then(
          res => {
            //console.log(res.data)
            if (res.data.success) {
              setVideo(res.data.data.video)
            }
          }
        )
    }
  }, [])
  return (
    <Router>
      <div className="app w-full ubuntu">
        <Switch>
          <Route path='/' exact><IndexPage page='main' /></Route>
          <Route path='/sponsors' exact><IndexPage page='sponsors' /></Route>
          {/*<Route path='/map' exact><IndexPage page='map' /></Route>*/}
        </Switch>
        {video ?
          <MainPlayer video={video} setVideo={setVideo} />
          : null}
      </div>
    </Router >
  );
}
