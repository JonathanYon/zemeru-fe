import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { myBlogs } from "../../../Redux/action";
import SingleBlog from "../single blog/SingleBlog";

const BlogRow = () => {
  const blogs = useSelector((state) => state.blogs.articles);
  console.log(blogs);
  const dispatch = useDispatch();
  // const [blog, setBlog] = useState([]);
  useEffect(() => {
    dispatch(myBlogs());
    // const blogPosts = async () => {
    //   const response = await fetch(`${process.env.REACT_APP_URL}/blogs`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
    //     },
    //   });
    //   if (response.ok) {
    //     const res = await response.json();
    //     console.log(res);
    //     setBlog(res);
    //   }
    // };
    // blogPosts();
  }, []);

  return (
    <Container className="mt-5">
      <Row xs={5} className="d-md-flex">
        {blogs.map((blogData) => (
          // <Col className="d-md-flex" key={blogData._id}>
          <SingleBlog blog={blogData} />
          /* </Col> */
        ))}
      </Row>
    </Container>
  );
};
export default BlogRow;
