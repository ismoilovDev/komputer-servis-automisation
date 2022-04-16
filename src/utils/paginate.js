import _ from 'lodash';
export const paginate = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    let list = _.slice(items, startIndex);
    list = _.take(list, pageSize);
    return list;
}