import React, { useState } from 'react';

import { Formik } from 'formik';

import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Button, DropdownSelect } from '@hbsolutions/react-presentational';

import {
    CUSTOM_FILTER_TEXT,
    CUSTOM_FILTER_DROPDOWN_SELECT,
} from '../../common/constants';

const CustomFilters = ({ filters, filterHandler }) => {
    const [showFilters, setShowFilters] = useState(false);

    const renderToggler = (showFilters, toggleHandler) => (
        <Button variant={showFilters ? "primary" : "outline-primary"}
                onClick={toggleHandler}
        >
            Filters
        </Button>
    );

    const renderFilter = (formik, filter) => {
        const props = filter.props || {};

        if (filter.type === CUSTOM_FILTER_TEXT) {
            return (
                <Form.Group controlId={filter.name}>
                    <Form.Label>{filter.label || ''}</Form.Label>
                    <Form.Control {...props}
                                  {...formik.getFieldProps(filter.name)}
                                  type="text"
                                  isInvalid={!!(formik.touched[filter.name] && formik.errors[filter.name])}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors[filter.name]}</Form.Control.Feedback>
                </Form.Group>
            );
        }

        if (filter.type === CUSTOM_FILTER_DROPDOWN_SELECT) {
            return (
                <Form.Group controlId={filter.name}>
                    <Form.Label>{filter.label || ''}</Form.Label>
                    <DropdownSelect disabled={false}
                                    {...props}
                                    name={filter.name}
                                    options={filter.options}
                    />
                </Form.Group>
            );
        }

        return '';
    };

    const initialValues = filters.reduce((a, c) => {
        a[c.name] = '';
        return a;
    }, {});

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
                    <Formik onSubmit={filterHandler}
                            initialValues={initialValues}
                    >
                        {formik => (
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Row>
                                    {filters.map(filter => (
                                        <Col sm={12} md={3} key={filter.name}>
                                            {renderFilter(formik, filter)}
                                        </Col>
                                    ))}
                                </Row>
                                <Row className="mt-3">
                                    <Col sm={12} md={8} />
                                    <Col sm={12} md={2}>
                                        <Button type="submit" className="w-100">
                                            Apply
                                        </Button>
                                    </Col>
                                    <Col sm={12} md={2}>
                                        <Button type="button" className="w-100"
                                                variant="outline-secondary"
                                                onClick={() => {
                                                    formik.resetForm();
                                                    return formik.submitForm();
                                                }}
                                        >
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Collapse>
        </Container>
    );
};

export default CustomFilters;
