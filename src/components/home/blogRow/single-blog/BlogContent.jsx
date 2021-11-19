import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  Row,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { withRouter } from "react-router";
import SocialMedia from "../../../addContent/SocialMedia";
import BlogComments from "./comments/BlogComments";

const BlogContent = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const { id } = props.match.params;
  useEffect(() => {
    const singleBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_URL}/blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setLoading(false);
          setArticle(res);
          // console.log("blog", res);
        } else {
          setLoading(false);
          setErrors(true);
        }
      } catch (error) {
        setLoading(false);
        setErrors(true);
        console.log(error);
      }
    };
    singleBlog();
  }, [id]);
  //   console.log("blog", article);

  return (
    <>
      <Container>
        {loading && (
          <div className=" h-100 d-flex justify-content-center align-items-center">
            <Spinner animation="grow" className="mt-3" />
          </div>
        )}
        {errors && (
          <ListGroup className="mt-1 mx-5">
            <ListGroup.Item variant="danger">
              <strong>Something has gone wrong please come back again</strong>
            </ListGroup.Item>
          </ListGroup>
        )}
        <h1 className="content-title">{article.title}</h1>
        <Image src={article.cover} style={{ width: "50%", height: "50%" }} />
        <Row className="mt-5 mb-5">
          <Col>
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="text-left"
            ></div>
            {/* {article.content} */}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs={12} lg={6}>
            <BlogComments />
          </Col>
          <Col xs={12} lg={6}>
            <SocialMedia pageURL={window.location.href} content="Blog" />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default withRouter(BlogContent);
