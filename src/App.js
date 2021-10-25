import "./App.css";
import AddBlog from "./components/addContent/addBlog/AddBlog";
import AddLyrics from "./components/addContent/addLyrics/AddLyrics";
import BlogRow from "./components/home/blogRow/Blogrow";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LyricsChart from "./components/home/charts/lyrics chart/LyricsChart";
import UserChart from "./components/home/charts/user chart/UserChart";
import Me from "./components/me/Me";
import Topnav from "./components/Navbarr/Topnav";
import Login from "./components/signUp/Login";
import SignUp from "./components/signUp/SignUp";
import NotFound from "./components/home/notFound/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Topnav /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />

          {/* <BlogRow /> */}
          {/* <LyricsChart /> */}
          {/* <UserChart />   */}
          {/* <Me /> */}
          {/* <AddLyrics /> */}
          {/* <AddBlog /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
