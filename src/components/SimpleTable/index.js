import React from 'react';

import BootstrapTableNext from 'react-bootstrap-table-next';

import styles from './SimpleTable.module.css';

const SimpleTable = ({ options, ...props }) => {
    options = options || {};

    const counterLine = Array.isArray(props.data) && !options.noCount
        ? (
            <p>{props.data.length} {props.data.length === 1 ? 'item total' : 'items total'}</p>
        )
        : '';

    return (
        <div>
            {counterLine}
            <BootstrapTableNext classes={styles["table-layout-auto"]}
                                hover={true}
                                wrapperClasses="table-responsive"
                                { ...props }
            />
            {counterLine}
        </div>
    );
};

export default SimpleTable;
