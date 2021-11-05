import { useEffect, useState } from "react";
import { Spinner, Container, Row, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { myBlogs } from "../../../Redux/action";
import LyricsChart from "../charts/lyrics chart/LyricsChart";
import UserChart from "../charts/user-chart/UserChart";
import FirstBlog from "./single-blog/FirstBlog";
import SingleBlog from "./single-blog/SingleBlog";
const BlogRow = () => {
  const blogs = useSelector((state) => state.blogs.articles);
  const loading = useSelector((state) => state.blogs.loading);
  const errors = useSelector((state) => state.blogs.error);
  // const me = useSelector((state) => state.user.me);
  console.log("...", blogs[0]);
  const dispatch = useDispatch();
  // const [blog, setBlog] = useState([]);
  useEffect(() => {
    dispatch(myBlogs());
  }, []);

  return (
    <Container className="mt-5">
      {/* <img
        src={`${process.env.PUBLIC_URL}/daba.gif`}
        alt="spinner"
        style={{ width: "50px", height: "50px" }}
        className="rounded-circle"
      /> */}
      {/* <Row>
        <FirstBlog />
      </Row> */}
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
      <Row md={5} sm={4} className="d-md-flex">
        {blogs.map((blogData) => (
          // <Col className="d-md-flex" key={blogData._id}>
          <SingleBlog blog={blogData} key={blogData._id} />
          /* </Col> */
        ))}
      </Row>
      <LyricsChart />
      <UserChart />
    </Container>
  );
};
export default BlogRow;
