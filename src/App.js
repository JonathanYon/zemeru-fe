import "./App.css";
import BlogRow from "./components/home/blogRow/Blogrow";
import LyricsChart from "./components/home/lyrics chart/LyricsChart";
import Topnav from "./components/Navbarr/Topnav";

function App() {
  return (
    <div className="App">
      <Topnav />
      <BlogRow />
      <LyricsChart />
    </div>
  );
}

export default App;
