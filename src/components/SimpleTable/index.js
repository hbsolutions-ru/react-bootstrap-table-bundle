import React, { useState } from 'react';

import BootstrapTableNext from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';

import styles from './SimpleTable.module.css';

const SimpleTable = ({ options, ...props }) => {
    options = options || {};

    const [count, setCount] = useState(props.data.length);

    const getCounterLine = () => Array.isArray(props.data) && !options.noCount
        ? (
            <p>{count} {count === 1 ? 'item displayed' : 'items displayed'}</p>
        )
        : '';

    return (
        <div>
            {getCounterLine()}
            <BootstrapTableNext classes={styles["table-layout-auto"]}
                                filter={filterFactory({
                                    afterFilter: (result, filters) => {
                                        setCount(result.length);
                                        console.debug('Filters:', filters);
                                    }
                                })}
                                hover={true}
                                wrapperClasses="table-responsive"
                                { ...props }
            />
            {getCounterLine()}
        </div>
    );
};

export default SimpleTable;
