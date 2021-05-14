import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Button } from '@hbsolutions/react-presentational';

const CustomFilters = ({ filters }) => {
    const [showFilters, setShowFilters] = useState(false);

    const renderToggler = (showFilters, toggleHandler) => (
        <Button variant={showFilters ? "primary" : "outline-primary"}
                onClick={toggleHandler}
        >
            Filters
        </Button>
    );

    const renderFilter = filter => {
        console.log(filter);
        return (
            <Form.Group controlId={filter.name}>
                <Form.Label>{filter.label || ''}</Form.Label>
                <Form.Control name={filter.name}
                              type="text"
                />
            </Form.Group>
        );
    };

    return (
        <Container className="mb-3 py-3 border">
            <Row>
                <Col>
                    {renderToggler(showFilters, () => setShowFilters(!showFilters))}
                </Col>
            </Row>
            <Collapse in={showFilters}>
                <div>
                    <hr />
                    <Row>
                        {filters.map(filter => (
                            <Col sm={12} md={3} key={filter.name}>
                                {renderFilter(filter)}
                            </Col>
                        ))}
                    </Row>
                </div>
            </Collapse>
        </Container>
    );
};

export default CustomFilters;
