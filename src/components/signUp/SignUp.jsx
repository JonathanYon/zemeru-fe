import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignUp = () => {
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
  return (
    <Form>
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
export default SignUp;
