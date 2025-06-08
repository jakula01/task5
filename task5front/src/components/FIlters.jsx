import React, { useState } from "react";

import {
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Form,
} from "react-bootstrap";

export default function Filters({
  language,
  setLanguage,
  seed,
  setSeed,
  likes,
  setLikes,
  review,
  setReview,
}) {
  const generateSeed = () => {
    const newSeed = Math.floor(Math.random() * 100000000).toString();
    setSeed(newSeed);
  };
  const [tempLikes, setTempLikes] = useState(0);

  return (
    <Form className="mb-2">
      <Row className="g-3 align-items-end">
        <Col md="3">
          <Form.Label>Language</Form.Label>
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English (en)</option>
            <option>Spanish (es)</option>
            <option>Korean (ko)</option>
          </Form.Select>
        </Col>

        <Col md="3">
          <Form.Label>Seed</Form.Label>
          <InputGroup>
            <FormControl
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
            <Button
              variant="light"
              onClick={generateSeed}
              title="Generate random seed"
              className="border-start-0 rounded-start-0"
              style={{ border: "1px solid #ced4da", backgroundColor: "#fff" }}
            >
              <i className="bi bi-shuffle"></i>
            </Button>
          </InputGroup>
        </Col>

        <Col md="2">
          <Form.Label>
            Likes: <strong>{tempLikes.toFixed(1)}</strong>
          </Form.Label>
          <Form.Range
            min={0}
            max={10}
            step={0.1}
            value={tempLikes}
            onChange={(e) => setTempLikes(parseFloat(e.target.value))}
            onMouseUp={() => setLikes(tempLikes)}
          />
        </Col>

        <Col md="2">
          <Form.Label>Reviews</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={review}
            onChange={(e) => setReview(parseFloat(e.target.value))}
          />
        </Col>
      </Row>
    </Form>
  );
}
