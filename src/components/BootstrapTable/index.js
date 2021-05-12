import React from 'react';

import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

import SimpleTable from '../SimpleTable';

const BootstrapTable = ({ columns, options, ...props }) => {
    options = options || {};

    const enrichedColumns = columns.slice();

    if (typeof options.actions === 'function') {
        const actions = {
            dataField: 'actions',
            text: options.actionsHeader || '',
            headerClasses: styles["column-two-actions"],
            formatter: options.actions,
        };
        enrichedColumns.push(actions);
    }

    if (options.noColumnToggle) {
        return (
            <SimpleTable filter={filterFactory()}
                         { ...props }
                         columns={enrichedColumns}
                         options={options}
            />
        );
    }

    const { ToggleList } = ColumnToggle;

    return (
        <ToolkitProvider { ...props }
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
    );
};

export default BootstrapTable;
