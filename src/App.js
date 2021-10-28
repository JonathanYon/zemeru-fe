import "./App.css";
import AddBlog from "./components/addContent/addBlog/AddBlog";
import AddLyrics from "./components/addContent/lyrics/AddLyrics";
import BlogRow from "./components/home/blogRow/Blogrow";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Me from "./components/me/Me";
import Topnav from "./components/Navbarr/Topnav";
import Login from "./components/signUp/Login";
import SignUp from "./components/signUp/SignUp";
import NotFound from "./components/home/notFound/NotFound";
import { useState } from "react";
import BlogContent from "./components/home/blogRow/single-blog/BlogContent";
import Lyrics from "./components/addContent/lyrics/Lyrics";
function App() {
  const [logged, setLogged] = useState(false);

  return (
    <div className="App">
      <Router>
        <Topnav logged={logged} />

        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={BlogRow} />
        <Route exact path="/blogs/:id" component={BlogContent} />
        <Route exact path="/me" component={Me} />
        <Route exact path="/lyric/:id" component={Lyrics} />
        {/* <BlogRow /> */}
        {/* <BlogRow />*/}

        {/* <Me /> */}
        <Route exact path="/addLyrics" component={AddLyrics} />
        <Route exact path="/addBlog" component={AddBlog} />
        {/* <AddBlog /> */}
        {/* <Route component={NotFound} /> */}
      </Router>
    </div>
  );
}

export default App;
