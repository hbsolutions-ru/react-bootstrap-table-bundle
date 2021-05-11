import React from 'react';

import BootstrapTableNext from 'react-bootstrap-table-next';

const BootstrapTable = ({ ...props }) => {
    return (
        <BootstrapTableNext { ...props }
        />
    );
};

export default BootstrapTable;
