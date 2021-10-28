import { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import { withRouter } from "react-router";
import { FaThumbsUp } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const Lyrics = (props) => {
  const [lyric, setLyric] = useState(null);

  const { id } = props.match.params;

  useEffect(() => {
    const getLyric = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        console.log("Lyric,jsx", res);
        setLyric(res);
      }
    };
    getLyric();
  }, [id]);
  return <>hello</>;
};
export default withRouter(Lyrics);
