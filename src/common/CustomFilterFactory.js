
import { Comparator, selectFilter, textFilter } from 'react-bootstrap-table2-filter';

import {
    CUSTOM_FILTER_TEXT,
    CUSTOM_FILTER_DROPDOWN_SELECT,
} from './constants';

export const createCustomFilter = (filterConfig, filtersStore) => {

    if (filterConfig.type === CUSTOM_FILTER_TEXT) {
        return {
            filter: textFilter(),
            filterRenderer: (onFilter, column) => {
                filtersStore[column.dataField] = onFilter;
                return '';
            },
        };
    }

    if (filterConfig.type === CUSTOM_FILTER_DROPDOWN_SELECT) {
        return {
            filter: selectFilter({
                options: filterConfig.options,
                withoutEmptyOption: true,
                comparator: Comparator.EQ,
                onFilter: filterConfig.onFilter || undefined,
            }),
            filterRenderer: (onFilter, column) => {
                filtersStore[column.dataField] = onFilter;
                return '';
            },
        };
    }

    return {};
};
