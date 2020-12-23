const DbManager  = require('./dbManager');

let req = {
    body: {
        endpoint: 'login',
        username: 'valdal14',
        password: '123456',
        // gameTitle: 'The Elder Scrolls Online',
    }
};

test('should return invalid parameters', () => {
    const response = DbManager.createQuery(req, 0);
    expect(response).toBe('Error code 1401: Invalid parameters')
})

test('should return invalid parameters', () => {
    const response = DbManager.createQuery(req, null);
    expect(response).toBe('Error code 1401: Invalid parameters')
})

test('LOGIN: should return CALL userLogin(?,?)', () => {
    const response = DbManager.createQuery(req, 3);
    expect(response).toStrictEqual(['CALL userLogin(?,?)', ['valdal14', '123456']])
})