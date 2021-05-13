import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
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
                        {Object.keys(filters).map(filterName => (
                            <Col sm={12} md={3} key={filterName.toString()}>
                                {filterName}
                            </Col>
                        ))}
                    </Row>
                </div>
            </Collapse>
        </Container>
    );
};

export default CustomFilters;
