import { Col } from "react-bootstrap";

const YoutubeVideo = ({ ytVideo }) => {
  //   console.log(ytVideo);
  const YTcode = ytVideo.split("=")[1];

  console.log(YTcode);
  return (
    <Col className="mt-5 ml-n3">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${YTcode}?start=1`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Col>
  );
};
export default YoutubeVideo;
