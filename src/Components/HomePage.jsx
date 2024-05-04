import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {

    const [city,setcity] = useState(" ");

  return (
    <>
      <Row className="w-100">
        <Col
          xs={8}
          className="background-image-col d-flex align-items-center justify-content-center"
        >
          <div className="text-center">
            <h1 className="text-white bg-primary  rounded p-2">
              BENVENUTI IN METEO
            </h1>
          </div>
        </Col>
        <Col
          xs={4}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Form > 
            <Form.Group className="mb-3">
              <Form.Label>Cosa vuoi cercare?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la città desiderata"
                className="w-100"
                name="city"
                onChange={(e)=>setcity(e.target.value)}
              />
            </Form.Group>
            <Link to={`/Results/${city}`}>
            <Button type="submit">Cerca</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
