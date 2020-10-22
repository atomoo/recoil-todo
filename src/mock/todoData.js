import Mock from 'mockjs';

function fetchMock(data) {
    return new Promise((resolve, reject) => {
        const random = Math.random() * 700 + 300;
        setTimeout(() => {
            resolve(data);
        }, random);
    });
}

export function queryList() {
    const data = Mock.mock({'array|10': [{'id|+1': 1, 'detail': '@string("lower", 10)', 'completed': '@boolean'}]});
    return fetchMock(data.array);
}
