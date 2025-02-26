import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default function App() {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [overview, setOverview] = useState('');

  useEffect(() => {
    const fetchData = async() => {
      try {
        const eduRes = await axios.get('http://localhost:3000/getEdu');
        const expRes = await axios.get('http://localhost:3000/getExp');
        const overviewRes = await axios.get('http://localhost:3000/getOverview');

        setEducation(eduRes.data);
        setExperience(expRes.data);
        setOverview(overviewRes.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
    }
  };
  fetchData();
  }, [])

  return (
    <Container className = "my-4">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Overview</Card.Title>
              <Card.Text>{overview}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className = "my-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Education</Card.Title>
              <ListGroup>
                {education.map((item, index) => (
                  <ListGroup.Item key = {index}>
                    <strong>{item.degree}</strong> - {item.institution} ({item.year}) - {item.status}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Experience</Card.Title>
              <ListGroup>
                {experience.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{item.role}</strong> at {item.company} ({item.year})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
