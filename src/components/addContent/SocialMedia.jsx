import { Container, Row, Col } from "react-bootstrap";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookShareCount } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

const SocialMedia = ({ pageURL, content }) => {
  return (
    <Container className="mb-5">
      <Row className="d-flex flex-column">
        <Col xs={6} className="mb-2">
          <small>Share the above {content} with family and friends :)</small>
        </Col>
        <Col xs={6}>
          <FacebookShareButton
            url={pageURL}
            quote="ግጥምታት መዛሙር ኣብ ዘመሩ"
            hashtag="#ዘመሩ #zemeru"
            className="mr-3"
          >
            <FacebookIcon size={40} round={true}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton
            url={pageURL}
            quote="ግጥምታት መዛሙር ኣብ ዘመሩ"
            hashtag="#ዘመሩ #zemeru"
            className="mr-3"
          >
            <TwitterIcon
              size={40}
              lightingColor="white"
              round={true}
            ></TwitterIcon>
          </TwitterShareButton>
          <WhatsappShareButton
            url={pageURL}
            quote="ግጥምታት መዛሙር ኣብ ዘመሩ"
            hashtag="#ዘመሩ #zemeru"
            className="mr-3"
          >
            <WhatsappIcon
              size={40}
              lightingColor="white"
              round={true}
            ></WhatsappIcon>
          </WhatsappShareButton>
        </Col>
      </Row>
    </Container>
  );
};
export default SocialMedia;
