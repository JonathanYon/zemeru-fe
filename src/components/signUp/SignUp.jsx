import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";

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
    const response = await fetch(`${process.env.REACT_APP_URL}/users/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (response.ok) {
      props.history.push("/");
    } else {
      alert("something wrong");
    }
  };
  return (
    <Form onSubmit={register}>
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
          id="password"
          placeholder="Password"
          value={info.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default withRouter(SignUp);
