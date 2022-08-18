
import { Comparator, customFilter, selectFilter, textFilter } from 'react-bootstrap-table2-filter';

import {
    CUSTOM_FILTER_CHECKBOX_PALETTE,
    CUSTOM_FILTER_DATEPICKER,
    CUSTOM_FILTER_DROPDOWN_SELECT,
    CUSTOM_FILTER_TEXT,
    CUSTOM_FILTER_TYPEAHEAD,
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
                    return data.filter(row => row[filterConfig.name] && value.indexOf(row[filterConfig.name]) !== -1);
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
            filter: customFilter({
                onFilter: value => {
                    const from = value.from instanceof Date ? value.from.getTime() / 1000 : null;
                    const to = value.to instanceof Date ? value.to.getTime() / 1000 : null;

                    if (from === null && to === null) {
                        return data;
                    }

                    return data.filter(row => {
                        const cellDate = parseInt(row[filterConfig.name]);
                        if (!cellDate) {
                            return false;
                        }
                        if (from !== null && cellDate < from) {
                            return false;
                        }
                        if (to !== null && cellDate > to) {
                            return false;
                        }
                        return true;
                    });
                },
            }),
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

    if (filterConfig.type === CUSTOM_FILTER_TYPEAHEAD) {
        return {
            filter: customFilter({
                comparator: Comparator.EQ,
                onFilter: value => {
                    if (!(Array.isArray(value) && value.length)) {
                        return data;
                    }

                    if (typeof filterConfig.idKey === 'string') {
                        const values = value.map(value => parseInt(value[filterConfig.idKey]));
                        return data.filter(row => parseInt(row[filterConfig.entityKey]) && values.indexOf(parseInt(row[filterConfig.entityKey])) !== -1);
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

    return {};
};
