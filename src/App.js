import "./App.css";
import AddBlog from "./components/addContent/addBlog/AddBlog";
import AddLyrics from "./components/addContent/lyrics/AddLyrics";
import BlogRow from "./components/home/blogRow/Blogrow";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Me from "./components/me/Me";
import Topnav from "./components/Navbarr/Topnav";
import Login from "./components/signUp/Login";
import SignUp from "./components/signUp/SignUp";
import NotFound from "./components/home/notFound/NotFound";
import { useState } from "react";
import { useSelector } from "react-redux";
import BlogContent from "./components/home/blogRow/single-blog/BlogContent";
import Lyrics from "./components/addContent/lyrics/Lyrics";
import LyricsAdminPage from "./components/addContent/lyrics/LyricsAdminPage";
import EditedLists from "./components/addContent/lyrics/EditedLists";
import User from "./components/home/charts/user-chart/User";
import MyFooter from "./components/Navbarr/MyFooter";

function App() {
  const [logged, setLogged] = useState(false);

  const me = useSelector((state) => state.user.me);
  console.log(me);
  console.log(".env", process.env);

  return (
    <div className="App">
      <Router>
        <Topnav logged={logged} />
        <Route exact>
          {me ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />

        <>
          <Route exact path="/" component={BlogRow} />
          <Route exact path="/blogs/:id" component={BlogContent} />
          <Route
            exact
            path="/me"
            render={(routeProps) => <Me me={me} {...routeProps} />}
          />
          <Route exact path="/lyric/:id" component={Lyrics} />
          <Route exact path="/adminPage" component={LyricsAdminPage} />
          <Route exact path="/addLyrics" component={AddLyrics} />
          <Route exact path="/addBlog" component={AddBlog} />
          <Route exact path="/user/:id" component={User} />
          <Route
            exact
            path="/edited/:lId/lyrics/:eId"
            component={EditedLists}
          />
          {/* <Route component={NotFound} /> */}
          <MyFooter />
        </>
      </Router>
    </div>
  );
}

export default App;
