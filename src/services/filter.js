import {stringInclues} from '../util/common';

export const FILTER_ALL = 'all';
export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';
export const FILTER_HIGH = 'high';
export const FILTER_MEDIUM = 'medium';
export const FILTER_LOW = 'low';

export function applyFilter(list, filter) {
    switch (filter) {
        case FILTER_COMPLETED:
            return list.filter(item => item.completed === true);
        case FILTER_ACTIVE:
            return list.filter(item => item.completed !== true);
        case FILTER_HIGH:
            return list.filter(item => item.priority === 'High');
        case FILTER_MEDIUM:
            return list.filter(item => item.priority === 'Medium');
        case FILTER_LOW:
            return list.filter(item => item.priority === 'Low');
        default:
            return list;
    }
}


export function search(list, query) {
    let q = query.trim().toLowerCase();

    return list.filter(({ text }) => {
        // Ensure text is a string, default to an empty string if undefined or null
        const taskText = text ? String(text) : ''; 
        return taskText.toLowerCase().includes(q);  // Use toLowerCase safely
    });
}



export function getOptions() {
    return {
        [FILTER_ALL]: 'All',
        [FILTER_ACTIVE]: 'Active',
        [FILTER_COMPLETED]: 'Completed'
    };
}
