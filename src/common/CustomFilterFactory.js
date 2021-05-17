
import { textFilter } from 'react-bootstrap-table2-filter';

export const createCustomFilter = (filterConfig, filtersStore) => {
    return {
        filter: textFilter(),
        filterRenderer: (onFilter, column) => {
            filtersStore[column.dataField] = onFilter;
            return '';
        },
    };
};
