import React, { useState } from 'react';

import { Formik } from 'formik';

import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Button, DatePicker, DropdownCheckboxesPalette, DropdownSelect, TypeaheadInput } from '@hbsolutions/react-presentational';

import {
    CUSTOM_FILTER_CHECKBOX_PALETTE,
    CUSTOM_FILTER_DATEPICKER,
    CUSTOM_FILTER_DROPDOWN_SELECT,
    CUSTOM_FILTER_TEXT,
    CUSTOM_FILTER_TYPEAHEAD,
} from '../../common/constants';

const CustomFilters = ({ filters, filterHandler, containerWrapper }) => {
    const [showFilters, setShowFilters] = useState(false);

    const wrapper = typeof containerWrapper === 'function'
        ? containerWrapper
        : children => (
            <Container fluid className="mb-3 py-3 border">
                {children}
            </Container>
        );

    const renderToggler = (showFilters, toggleHandler) => (
        <Button variant={showFilters ? "primary" : "outline-primary"}
                onClick={toggleHandler}
        >
            Filters
        </Button>
    );

    const prepareFilterValue = (formik, filter) => {
        if (filter.type === CUSTOM_FILTER_CHECKBOX_PALETTE) {
            return formik.values[filter.name].map(value => value.toString());
        }

        if (filter.type === CUSTOM_FILTER_TYPEAHEAD) {
            return formik.values[filter.name].map(value => value[filter.idKey].toString());
        }

        return formik.values[filter.name].toString();
    };

    const getFilteredOptions = (formik, filter) => {
        const parentFilter = (typeof filter.dependsOn === 'string' ? filters.find(obj => obj.name === filter.dependsOn.toString()) : null) || null;
        if (!parentFilter) {
            return filter.options;
        }

        if (!(formik.values[parentFilter.name] && formik.values[parentFilter.name].length)) {
            return [];
        }

        if (typeof filter.parentId === 'string' && Array.isArray(formik.values[parentFilter.name])) {
            const parentValues = prepareFilterValue(formik, parentFilter);
            return filter.options.filter(option => parentValues.indexOf(option[filter.parentId].toString()) !== -1);
        }

        return filter.options;
    };

    const renderFilter = (formik, filter, index) => {
        const props = filter.props || {};

        const parentFilter = (typeof filter.dependsOn === 'string' ? filters.find(obj => obj.name === filter.dependsOn.toString()) : null) || null;
        const disabled = parentFilter && !(formik.values[parentFilter.name] && formik.values[parentFilter.name].length);

        if (filter.type === CUSTOM_FILTER_TEXT) {
            return (
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <Form.Control {...props}
                                      {...formik.getFieldProps(filter.name)}
                                      type="text"
                                      isInvalid={!!(formik.touched[filter.name] && formik.errors[filter.name])}
                                      disabled={props.disabled || disabled}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors[filter.name]}</Form.Control.Feedback>
                        {disabled ? (
                            <Form.Text muted>{filter.dependsText}</Form.Text>
                        ) : ''}
                    </Form.Group>
                </Col>
            );
        }

        if (filter.type === CUSTOM_FILTER_DROPDOWN_SELECT) {
            return (
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <DropdownSelect {...props}
                                        name={filter.name}
                                        options={filter.options}
                                        disabled={props.disabled || disabled}
                        />
                        {disabled ? (
                            <Form.Text muted>{filter.dependsText}</Form.Text>
                        ) : ''}
                    </Form.Group>
                </Col>
            );
        }

        if (filter.type === CUSTOM_FILTER_CHECKBOX_PALETTE) {
            const filteredOptions = getFilteredOptions(formik, filter);
            const columnCount = Math.ceil(filteredOptions.length / 7);

            let itemColSize = 3;
            if (columnCount > 0 && columnCount < 4) {
                itemColSize = parseInt(12 / columnCount);
            }

            const place = filters.reduce((a, c, i) => (
                a + (i < index ? (
                    c.type === CUSTOM_FILTER_DATEPICKER ? 2 : 1
                ) : 0)
            ), 0);

            return (
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <DropdownCheckboxesPalette {...props}
                                                   name={filter.name}
                                                   disabled={props.disabled || disabled}
                                                   menuAlign={place % 4 < 2 ? 'left' : 'right'}
                                                   items={filteredOptions}
                                                   itemColSize={itemColSize || 6}
                        />
                        {disabled ? (
                            <Form.Text muted>{filter.dependsText}</Form.Text>
                        ) : ''}
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

        if (filter.type === CUSTOM_FILTER_TYPEAHEAD) {
            return (
                <Col sm={12} md={3}>
                    <Form.Group controlId={filter.name}>
                        <Form.Label>{filter.label || ''}</Form.Label>
                        <TypeaheadInput {...props}
                                        name={filter.name}
                                        labelKey={filter.labelKey}
                                        options={getFilteredOptions(formik, filter)}
                                        placeholder={props.placeholder}
                                        disabled={props.disabled || disabled}
                        />
                        {disabled ? (
                            <Form.Text muted>{filter.dependsText}</Form.Text>
                        ) : ''}
                    </Form.Group>
                </Col>
            );
        }

        return '';
    };

    const initialValues = filters.reduce((a, c) => {
        switch (c.type) {
            case CUSTOM_FILTER_CHECKBOX_PALETTE:
                a[c.name] = [];
                break;
            case CUSTOM_FILTER_DATEPICKER:
                a[c.name] = {
                    from: '',
                    to: '',
                };
                break;
            case CUSTOM_FILTER_TYPEAHEAD:
                a[c.name] = null;
                break;
            default:
                a[c.name] = '';
        }
        return a;
    }, {});

    return wrapper(
        <>
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
                                    {filters.map((filter, index) => (
                                        <React.Fragment key={filter.name}>
                                            {renderFilter(formik, filter, index)}
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
        </>
    );
};

export default CustomFilters;
