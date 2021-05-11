import React from 'react';

import BootstrapTableNext from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';

import styles from './BootstrapTable.module.css';

const BootstrapTable = ({ options, ...props }) => {
    options = options || {};

    const counterLine = Array.isArray(props.data) && !options.noCount
        ? (
            <p>{props.data.length} {props.data.length === 1 ? 'item total' : 'items total'}</p>
        )
        : '';

    return (
        <div>
            {counterLine}
            <BootstrapTableNext bootstrap4={true}
                                classes={styles["table-layout-auto"]}
                                filter={filterFactory()}
                                hover={true}
                                wrapperClasses="table-responsive"
                                { ...props }
            />
            {counterLine}
        </div>
    );
};

export default BootstrapTable;
