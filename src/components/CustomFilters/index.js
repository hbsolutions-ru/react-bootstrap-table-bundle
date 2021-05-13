import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Button } from '@hbsolutions/react-presentational';

const CustomFilters = () => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <Container className="mb-3 py-3 border">
            <Row>
                <Col>
                    <Button variant={showFilters ? "primary" : "outline-primary"}
                            onClick={() => setShowFilters(!showFilters)}
                    >
                        Filters
                    </Button>
                </Col>
            </Row>
            <Collapse in={showFilters}>
                <div>
                    <hr />
                </div>
            </Collapse>
        </Container>
    );
};

export default CustomFilters;
