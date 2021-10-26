import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleBlog from "../single blog/SingleBlog";

const BlogRow = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const blogPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}/blogs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setBlog(res);
      }
    };
    blogPosts();
  }, []);

  return (
    <Container className="mt-5">
      <Row xs={4}>
        <Col>
          {blog.map((blogData) => (
            <SingleBlog blog={blogData} key={blogData._id} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};
export default BlogRow;
