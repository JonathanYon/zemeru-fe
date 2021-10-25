import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <Form>
      <Form.Group controlId="formBasicUserName">
        <Form.Label>User name</Form.Label>
        <Form.Control
          type="text"
          placeholder="UserName"
          id="userName"
          value={info.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          id="email"
          value={info.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
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
    </Form>
  );
};
export default SignUp;
