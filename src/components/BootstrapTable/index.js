import React from 'react';

import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

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
        enrichedColumns.forEach(column => {
            const filter = options.customFilters.find(filter => filter.name === column.dataField);
            if (!filter) return;

            if (
                typeof column.filter !== 'undefined' &&
                typeof column.filterRenderer === 'undefined'
            ) {
                column.filterRenderer = (onFilter, column) => {
                    filters[column.dataField] = onFilter;
                    return '';
                };
            }
        });
    }

    const applyCustomFilters = values => {
        Object.keys(values).forEach(key => {
            if (typeof filters[key] !== 'function') {
                return;
            }
            if (typeof values[key] === 'string') {
                filters[key](values[key]);
            }
        });
    };

    if (typeof options.actions === 'function') {
        const actions = {
            dataField: 'actions',
            isDummyField: true,
            text: options.actionsHeader || '',
            headerClasses: styles["column-two-actions"],
            formatter: options.actions,
        };
        enrichedColumns.push(actions);
    }

    if (options.noColumnToggle) {
        return (
            <SimpleTable bootstrap4={true}
                         { ...props }
                         columns={enrichedColumns}
                         filter={filterFactory()}
                         keyField={options.keyField || 'id'}
                         options={options}
            />
        );
    }

    const { ToggleList } = ColumnToggle;

    return (
        <div>
            {Array.isArray(options.customFilters) ? (
                <CustomFilters filters={options.customFilters} filterHandler={applyCustomFilters} />
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
                                     filter={filterFactory()}
                                     options={options}
                        />
                    </div>
                )}
            </ToolkitProvider>
        </div>
    );
};

export default BootstrapTable;
