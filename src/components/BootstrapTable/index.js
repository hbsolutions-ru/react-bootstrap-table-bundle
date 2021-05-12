import React from 'react';

import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

import SimpleTable from '../SimpleTable';

const BootstrapTable = ({ options, ...props }) => {
    options = options || {};

    const { ToggleList } = ColumnToggle;

    if (options.noColumnToggle) {
        return (
            <SimpleTable filter={filterFactory()}
                         options={options}
                         { ...props }
            />
        );
    }

    return (
        <ToolkitProvider keyField={options.keyField || 'id'}
                         { ...props }
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
