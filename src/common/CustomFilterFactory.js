
import { Comparator, customFilter, selectFilter, textFilter } from 'react-bootstrap-table2-filter';

import {
    CUSTOM_FILTER_CHECKBOX_PALETTE,
    CUSTOM_FILTER_DATEPICKER,
    CUSTOM_FILTER_DROPDOWN_SELECT,
    CUSTOM_FILTER_TEXT,
} from './constants';

export const createCustomFilter = (filterConfig, filtersStore, data) => {

    if (filterConfig.type === CUSTOM_FILTER_CHECKBOX_PALETTE) {
        return {
            filter: customFilter({
                comparator: Comparator.EQ,
                onFilter: value => {
                    if (!value.length) {
                        return data;
                    }
                    return data.filter(row => parseInt(row[filterConfig.name]) && value.indexOf(parseInt(row[filterConfig.name])) !== -1);
                },
            }),
            filterRenderer: (onFilter, column) => {
                filtersStore[column.dataField] = onFilter;
                return '';
            },
        };
    }

    if (filterConfig.type === CUSTOM_FILTER_DATEPICKER) {
        return {
            filter: customFilter(),
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

    if (filterConfig.type === CUSTOM_FILTER_TEXT) {
        return {
            filter: textFilter(),
            filterRenderer: (onFilter, column) => {
                filtersStore[column.dataField] = onFilter;
                return '';
            },
        };
    }

    return {};
};
