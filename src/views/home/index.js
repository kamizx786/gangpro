import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import preQualImg from "../../assets/img/prequalify.jpg";
import projectImg from "../../assets/img/projects.jpg";
import proposalImg from "../../assets/img/proposal.jpg";
import trialImg from "../../assets/img/trial.jpg";
import calculatorImg from "../../assets/img/calculator.jpg";
import { useSelector } from "react-redux";

const Home = () => {
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={7} style={{ height: "25em" }}>
          <h1 className="fw-bolder">Welcome to Ganarpro!</h1>
          <p>Dont have a subscription? Checkout the following options.</p>
        </Col>
        <Col md={4}>
          {free_mode_count > 0 ? (
            ""
          ) : (
            <Link to="/signup" className="text-decoration-none text-dark">
              <Card md={3} sm={2}>
                <Card.Img variant="top" src={trialImg} />
                <Card.Body>
                  <Card.Title className="fw-bolder">
                    Start with a free trial
                  </Card.Title>
                  <Card.Text>
                    Access construction cleaning service rates, costs and
                    bidding tools.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto align-self-start"
                  >
                    Start
                  </Button>
                </Card.Body>
              </Card>
            </Link>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <h2 className="text-start fw-bolder">Ganarpro services</h2>
      </Row>
      <Row>
        <Col md={3} className="gy-3 my-sm-5">
          <Link to="/project_board" className="text-decoration-none text-dark">
            <Card className="h-100">
              <Card.Img variant="top" src={projectImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder">Projects</Card.Title>
                <Card.Text className="display-10">
                  Find active commercial construction projects & contacts in my
                  area
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit projects
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5 my-xss-5">
          <Link
            to="/cleanup_calculator_overview"
            className="text-decoration-none text-dark"
          >
            <Card className="h-100">
              <Card.Img variant="top" src={calculatorImg} />
              <Card.Body classNamme="d-flex flex-column">
                <Card.Title className="fw-bolder">Calculator</Card.Title>
                <Card.Text>
                  Calculates bid amount estimates and analyze potential cost and
                  profits. Win more bids.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit calculator
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5">
          <Link to="/proposal" className="text-decoration-none text-dark">
            <Card className="h-100">
              <Card.Img variant="top" src={proposalImg} />
              <Card.Body classNamme="d-flex flex-column">
                <Card.Title className="fw-bolder h1">Proposals</Card.Title>
                <Card.Text>
                  Standardize proposal creation with templates. Satisfy customer
                  needs with the correct scope of work.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit proposals
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5">
          <Link to="/planify" className="text-decoration-none text-dark">
            <Card className="h-100">
              <Card.Img variant="top" src={preQualImg} />
              <Card.Body classNamme="d-flex flex-column">
                <Card.Title className="fw-bolder">Planify</Card.Title>
                <Card.Text>
                  Unleash the Power of Pre-Qualification and Dynamic Plan Rooms
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit Planify
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
