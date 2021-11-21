import { Col } from "react-bootstrap";
import "./add-lyrics.css";

const YoutubeVideo = ({ ytVideo }) => {
  //   console.log(ytVideo);
  const YTcode = ytVideo.split("=")[1];

  console.log(YTcode);
  return (
    <Col className="mt-5 mb-5 yt-video position-relative">
      <iframe
        className="yt-iframe"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${YTcode}?start=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Col>
  );
};
export default YoutubeVideo;
