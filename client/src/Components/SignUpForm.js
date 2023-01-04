import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/prom_bg.css";

function SignUpForm() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/cities")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [cities, setCities] = useState([]); //should be used in other page (wrote in here for practice)

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [address, setAddress] = useState("");
  const [city_name, setCity] = useState("Giza");
  const [city_id, setCityID] = useState("1");
  const [user_name, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("2");
  const navigate = useNavigate();

  function changeFirst(e) {
    setFirst(e.target.value);
  }

  function changeLast(e) {
    setLast(e.target.value);
  }

  function changeCity(e) {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function changeType(e) {
    setType(e.target.value);
    console.log(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changeAddress(e) {
    setAddress(e.target.value);
  }

  function changeUser(e) {
    setUser(e.target.value);
  }

  function SignUp(e) {
    console.log(city_name);

    axios
      .post("http://localhost:5000/cityidfromcityname", { city_name })
      .then((res) => {
        setCityID(res.data.id);
      })
      .catch((err) => console.log(err));
    console.log(type);
    axios
      .post("http://localhost:5000/signup", {
        first,
        last,
        address,
        city_id,
        user_name,
        password,
        email,
        type,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data == "email already in use") {
          return;
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }

  function SubmitForm() {
    axios
      .post("http://localhost:5000/signup", {
        email,
        password,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data == -1) {
          window.location.reload();
        } else {
          console.log(response.data);
          if (response.data.type == 0) {
            //superadmin
            navigate("/superadmin");
          } else if (response.data.type == 1) {
            //admin
            navigate("/admin");
          } else if (response.data.type == 2) {
            //user
            //console.log(response.data);
            navigate(`/home/${response.data.id}`, { state: response.data });
          } else if (response.data.type == 3) {
            //stores
            navigate(`/store/${response.data.id}`, { state: response.data });
          } else if (response.data.type == 4) {
            //driver
            navigate(`/driver/${response.data.id}`, { state: response.data });
            window.location.reload();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Online Book Store</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="signup">
        <Row>
          <Col>
            <h1>Create Your Account</h1>
            <p>Join us!</p>
          </Col>

          <Col>
            <Form>
              <Form.Label>
                <h2>Sign Up</h2>
              </Form.Label>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={changeEmail}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={changePassword}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Fname">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  onChange={changeFirst}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Lname">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  onChange={changeLast}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={changeAddress}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="user">
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  onChange={changeUser}
                />
              </Form.Group>
              <Form.Select
                className="city mt-3"
                aria-label="Default select example"
                onChange={changeCity}
              >
                {cities.map((city) => (
                  <option key={city.id}>{city.name} </option>
                ))}
              </Form.Select>

              <Form.Select
                className="type mt-3 mb-3"
                aria-label="Default select example"
                onChange={changeType}
              >
                <option value="2">Customer</option>
                <option value="3">Store</option>
              </Form.Select>
              <Button className variant="dark" onClick={(SignUp, SubmitForm)}>
                {" "}
                Sign up{" "}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default SignUpForm;
