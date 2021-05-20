import React, { useState } from 'react';

import { Formik } from 'formik';

import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Button, DatePicker, DropdownCheckboxesPalette, DropdownSelect } from '@hbsolutions/react-presentational';

import {
    CUSTOM_FILTER_CHECKBOX_PALETTE,
    CUSTOM_FILTER_DATEPICKER,
    CUSTOM_FILTER_DROPDOWN_SELECT,
    CUSTOM_FILTER_TEXT,
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
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <Form.Control {...props}
                                      {...formik.getFieldProps(filter.name)}
                                      type="text"
                                      isInvalid={!!(formik.touched[filter.name] && formik.errors[filter.name])}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors[filter.name]}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            );
        }

        if (filter.type === CUSTOM_FILTER_DROPDOWN_SELECT) {
            return (
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <DropdownSelect disabled={false}
                                        {...props}
                                        name={filter.name}
                                        options={filter.options}
                        />
                    </Form.Group>
                </Col>
            );
        }

        if (filter.type === CUSTOM_FILTER_CHECKBOX_PALETTE) {
            return (
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <DropdownCheckboxesPalette disabled={false}
                                                   {...props}
                                                   name={filter.name}
                                                   items={filter.items}
                        />
                    </Form.Group>
                </Col>
            );
        }

        if (filter.type === CUSTOM_FILTER_DATEPICKER) {
            return (
                <React.Fragment>
                    <Col sm={12} md={3}>
                        <Form.Group controlId={`${filter.name}.from`}>
                            <Form.Label>{filter.label || ''} From</Form.Label>
                            <DatePicker name={`${filter.name}.from`}
                                        dateFormat="dd.MM.yyyy"
                                        className="form-control w-100"
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={3}>
                        <Form.Group controlId={`${filter.name}.to`}>
                            <Form.Label>{filter.label || ''} To</Form.Label>
                            <DatePicker name={`${filter.name}.to`}
                                        dateFormat="dd.MM.yyyy"
                                        className="form-control w-100"
                            />
                        </Form.Group>
                    </Col>
                </React.Fragment>
            );
        }

        return '';
    };

    const initialValues = filters.reduce((a, c) => {
        switch (c.type) {
            case CUSTOM_FILTER_CHECKBOX_PALETTE:
                a[c.name ] = [];
                break;
            case CUSTOM_FILTER_DATEPICKER:
                a[c.name ] = {
                    from: '',
                    to: '',
                };
                break;
            default:
                a[c.name] = '';
        }
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
                                        <React.Fragment key={filter.name}>
                                            {renderFilter(formik, filter)}
                                        </React.Fragment>
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
