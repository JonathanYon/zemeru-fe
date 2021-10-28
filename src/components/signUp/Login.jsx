import { Form, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { useState } from "react";

const Login = (props) => {
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
      const response = await fetch(`${process.env.REACT_APP_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      if (response.ok) {
        alert("LOGIN!!!!");

        props.history.push("/");
        const res = await response.json();
        window.localStorage.setItem("Token", res.accessToken);
        console.log(res);
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          id="email"
          placeholder="Enter email"
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
    </Form>
  );
};
export default withRouter(Login);
