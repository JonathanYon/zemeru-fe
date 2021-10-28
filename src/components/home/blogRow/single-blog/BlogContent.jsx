import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { withRouter } from "react-router";

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
    <Container>
      <h1>{article.title}</h1>
      <Image src={article.cover} fluid />
      <Row>
        <Col>{article.content}</Col>
      </Row>
    </Container>
  );
};
export default withRouter(BlogContent);