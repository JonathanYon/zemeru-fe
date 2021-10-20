import "./App.css";
import AddBlog from "./components/addContent/addBlog/AddBlog";
import AddLyrics from "./components/addContent/addLyrics/AddLyrics";
import BlogRow from "./components/home/blogRow/Blogrow";
import LyricsChart from "./components/home/charts/lyrics chart/LyricsChart";
import UserChart from "./components/home/charts/user chart/UserChart";
import Me from "./components/me/Me";
import Topnav from "./components/Navbarr/Topnav";

function App() {
  return (
    <div className="App">
      <Topnav />
      <BlogRow />
      <LyricsChart />
      <UserChart />
      {/* <Me /> */}
      {/* <AddLyrics /> */}
      {/* <AddBlog /> */}
    </div>
  );
}

export default App;
