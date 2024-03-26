import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class editStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      rollno: "",
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const parts = url.split("/"); // แบ่ง URL ด้วย "/"
    const id = parts[parts.length - 1];

    axios
      .get("http://localhost:4000/students/edit-student/" + id)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeStudentName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeStudentEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangeStudentRollno = (e) => {
    this.setState({ rollno: e.target.value });
  };

  onSubmit = (e) => {
    const url = window.location.href;
    const parts = url.split("/"); // แบ่ง URL ด้วย "/"
    const id = parts[parts.length - 1];

    e.preventDefault();

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno,
    };

    axios
      .put("http://localhost:4000/students/update-student/" + id, studentObject)
      .then((res) => {
        console.log(res.data);
        console.log("Student Successfully Updated");
        //Redirect to student list
        this.props.history.push("/student-list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="form-wrapper mt-5">
        <h1>Update Student</h1>
        <Form className="d-grid gap-3" onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeStudentName}
            />
          </Form.Group>
          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={this.onChangeStudentEmail}
            />
          </Form.Group>
          <Form.Group controlId="Roll">
            <Form.Label>Roll No.</Form.Label>
            <Form.Control
              type="text"
              value={this.state.rollno}
              onChange={this.onChangeStudentRollno}
            />
          </Form.Group>

          <Button className="col-12" variant="success" size="lg" type="submit">
            Update Student
          </Button>
        </Form>
      </div>
    );
  }
}
