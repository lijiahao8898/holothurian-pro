import common from './apiList/common';

export default {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    headers2: {
        'content-type': 'application/json'
    },
    timeout: 60000,
    domain: '/api/',
    ...common,
}
