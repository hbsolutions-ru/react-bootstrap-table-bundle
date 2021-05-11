import React from 'react';

import BootstrapTableNext from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';

import styles from './BootstrapTable.module.css';

const BootstrapTable = ({ ...props }) => {
    return (
        <BootstrapTableNext bootstrap4={true}
                            classes={styles["table-layout-auto"]}
                            filter={filterFactory()}
                            hover={true}
                            wrapperClasses="table-responsive"
                            { ...props }
        />
    );
};

export default BootstrapTable;
