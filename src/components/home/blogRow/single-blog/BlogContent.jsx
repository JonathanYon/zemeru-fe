import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import SocialMedia from "../../../addContent/SocialMedia";
import BlogComments from "./comments/BlogComments";

const BlogContent = (props) => {
  const [article, setArticle] = useState([]);

  const { id } = props.match.params;
  useEffect(() => {
    const singleBlog = async () => {
      try {
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
          setArticle(res);
          // console.log("blog", res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    singleBlog();
  }, [id]);
  //   console.log("blog", article);

  return (
    <>
      <Container>
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
          <Col xs={6}>
            <BlogComments />
          </Col>
        </Row>
      </Container>
      <SocialMedia pageURL={window.location.href} content="Blog" />
    </>
  );
};
export default withRouter(BlogContent);
