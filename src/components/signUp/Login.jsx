import { ListGroup, Spinner } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { useState } from "react";
import "./sign.css";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      if (response.ok) {
        setLoading(false);
        // alert("LOGIN!!!!");
        props.history.push("/");
        window.location.reload();
        const res = await response.json();
        window.localStorage.setItem("Token", res.accessToken);
        console.log(res);
      } else {
        setLoading(false);
        setErrors(true);
        // alert("something wrong");
      }
    } catch (error) {
      setLoading(false);
      setErrors(true);
      console.log(error);
    }
  };
  return (
    <>
      <section
        className="vh-100 gradient-custom"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/dabate.svg)`,
          // objectFit: "cover",
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {loading && <Spinner animation="grow" className="mt-3" />}
        {errors && (
          <ListGroup className="mt-1 mx-5">
            <ListGroup.Item variant="danger">
              <strong>Something has gone wrong please come back again</strong>
            </ListGroup.Item>
          </ListGroup>
        )}
        <div className="container py-2 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-3 text-center">
                  <div className="mb-md-1 mt-md-0 pb-3">
                    <h2 className="fw-bold mb-1 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-4">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-2">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email"
                        id="email"
                        value={login.email}
                        onChange={handleChange}
                      />
                      <label className="form-label" for="email">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-2">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="Password"
                        value={login.password}
                        onChange={handleChange}
                      />
                      <label className="form-label" for="password">
                        Password
                      </label>
                    </div>

                    <p className="small mb-1 pb-lg-1">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={handleLogin}
                    >
                      Login
                    </button>

                    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div> */}
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-white-50">
                        {/* <a href="#!" className="text-white-50 fw-bold"> */}
                        Sign Up
                        {/* </a> */}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ------------------------------------------------------------------------------------ */}
      {/* <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            value={login.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/register">
          {" "}
          <p>First time? Sign Up Here</p>{" "}
        </Link>
      </Form> */}
    </>
  );
};
export default withRouter(Login);
