import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, Link } from "react-router-dom";

import CreateStudent from "./components/create-student.component";
import EditStudent from "./components/edit-student.component";
import StudentList from "./components/student-list.component";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/create-student"} className="nav-link">
              React MERN Stack CRUD
            </Link>
          </Navbar.Brand>

          <Nav className="justify-content-end">
            <Nav>
              <Link to={"/create-student"} className="nav-link">
                Create Student
              </Link>
            </Nav>
            <Nav>
              <Link to={"/student-list"} className="nav-link">
                Student List
              </Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col md="12">
            <div className="wrapper">
              <Switch>
                <Route exact path="/" component={CreateStudent} />
                <Route path="/create-student"  component={CreateStudent} />
                <Route path="/edit-student/:id"  component={EditStudent} />
                <Route path="/student-list" component={StudentList}  />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
