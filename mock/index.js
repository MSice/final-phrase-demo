/**
 * @file mock
 */
const web = require('./web');

const mockApi = [
    ...web.filter(item => item.enable)
];

module.exports = mockApi;
