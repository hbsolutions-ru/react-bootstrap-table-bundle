import React from 'react';

import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

import { createCustomFilter } from '../../common/CustomFilterFactory';

import SimpleTable from '../SimpleTable';
import CustomFilters from '../CustomFilters';

import styles from './BootstrapTable.module.css';

const BootstrapTable = ({ columns, options, ...props }) => {
    options = options || {};

    const enrichedColumns = columns.slice();
    const filters = {};

    if (typeof enrichedColumns[0] === 'object' && enrichedColumns[0]['dataField'] === 'id') {
        enrichedColumns[0]['classes'] = 'text-center';
        enrichedColumns[0]['headerClasses'] = `${styles["column-id"]} text-center`;
        enrichedColumns[0]['sortFunc'] = (a, b, order) => (order === 'asc' ? a - b : b - a);

        if (
            typeof options.idFormatter === 'function' &&
            !enrichedColumns[0]['formatter']
        ) {
            enrichedColumns[0]['formatter'] = options.idFormatter;
        }
    }

    if (Array.isArray(options.customFilters)) {
        for (let i = 0; i < enrichedColumns.length; i++) {
            const customFilterConfig = options.customFilters.find(filter => filter.name === enrichedColumns[i].dataField);
            if (!customFilterConfig) {
                continue;
            }

            if (
                typeof enrichedColumns[i].filter !== 'undefined' ||
                typeof enrichedColumns[i].filterRenderer !== 'undefined'
            ) {
                // Filter has already been set by the column config - skip
                continue;
            }

            enrichedColumns[i] = {
                ...enrichedColumns[i],
                ...createCustomFilter(customFilterConfig, filters, props.data),
            };
        }
    }

    const applyCustomFilters = values => {
        Object.keys(values).forEach(key => {
            if (typeof filters[key] !== 'function') {
                return;
            }

            if (values[key] === null) {
                return;
            }

            if (
                typeof values[key] === 'string' ||
                Array.isArray(values[key]) || // for checkboxPalette
                typeof values[key] === 'object' // for datepicker
            ) {
                filters[key](values[key]);
            }
        });
    };

    if (typeof options.actions === 'function') {
        const actions = {
            dataField: 'actions',
            isDummyField: true,
            text: options.actionsHeader || '',
            headerClasses: options.actionsCount === 1 ? styles["column-one-action"] : styles["column-two-actions"],
            formatter: options.actions,
        };
        enrichedColumns.push(actions);
    }

    if (options.noColumnToggle) {
        return (
            <div>
                {Array.isArray(options.customFilters) ? (
                    <CustomFilters filters={options.customFilters} filterHandler={applyCustomFilters} />
                ) : ''}
                <SimpleTable bootstrap4={true}
                             { ...props }
                             columns={enrichedColumns}
                             keyField={options.keyField || 'id'}
                             options={options}
                />
            </div>
        );
    }

    const { ToggleList } = ColumnToggle;

    return (
        <div>
            {Array.isArray(options.customFilters) ? (
                <CustomFilters filters={options.customFilters}
                               filterHandler={applyCustomFilters}
                               containerWrapper={options.containerWrapper}
                />
            ) : ''}
            <ToolkitProvider bootstrap4={true}
                             { ...props }
                             columns={enrichedColumns}
                             keyField={options.keyField || 'id'}
                             columnToggle
            >
                {propsFromToolkit => (
                    <div>
                        <ToggleList { ...propsFromToolkit.columnToggleProps }
                                    contextual={options.variant || 'primary'}
                                    className="mb-3"
                        />
                        <SimpleTable { ...propsFromToolkit.baseProps }
                                     options={options}
                                     pagination={props.pagination}
                                     rowClasses={props.rowClasses}
                                     sort={props.sort}
                        />
                    </div>
                )}
            </ToolkitProvider>
        </div>
    );
};

export default BootstrapTable;
