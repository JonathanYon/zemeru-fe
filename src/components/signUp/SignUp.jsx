import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(info.username);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/users/account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      if (response.ok) {
        props.history.push("/login");
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <Form onSubmit={register}>
      <Form.Group>
        <Form.Label>User name</Form.Label>
        <Form.Control
          type="text"
          id="username"
          placeholder="UserName"
          value={info.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          id="email"
          placeholder="Enter email"
          value={info.email}
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
          placeholder="Password"
          id="password"
          value={info.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> */}
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
        <div className="container py-2 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-3 text-center">
                  <div className="mb-md-1 mt-md-0 pb-3">
                    <h2 className="fw-bold mb-1 text-uppercase">Register</h2>
                    <p className="text-white-50 mb-4">
                      Please enter your uername, email and password!
                    </p>

                    <div className="form-outline form-white mb-2">
                      <input
                        type="username"
                        className="form-control form-control-lg"
                        id="username"
                        placeholder="UserName"
                        value={info.username}
                        onChange={handleChange}
                      />
                      <label
                        className="form-label"
                        //  for="username"
                      >
                        Username
                      </label>
                    </div>

                    <div className="form-outline form-white mb-2">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="Enter email"
                        value={info.email}
                        onChange={handleChange}
                      />
                      <label
                        className="form-label"
                        //  for="email"
                      >
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-2">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="********"
                        value={info.password}
                        onChange={handleChange}
                      />
                      <label
                        className="form-label"
                        // for="password"
                      >
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
                      onClick={register}
                    >
                      Register
                    </button>

                    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div> */}
                  </div>

                  <div>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-white-50">
                        {/* <a href="#!" className="text-white-50"> */}
                        Login
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
    </>
  );
};
export default withRouter(SignUp);
