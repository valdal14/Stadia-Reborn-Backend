const DbManager  = require('./dbManager');

test('LOGIN: should return invalid parameters', () => {
    const res = DbManager.executeQuery('username', '');
    expect(res).toBe('Error code 1401: Invalid parameters')
})

test('LOGIN: should return 3', () => {
    const res = DbManager.executeQuery('username', 'password', 'game');
    expect(res).toBe(3)
})

test('should return invalid query', () => {
    const res = DbManager.createQuery('', 2);
    expect(res).toBe('Error code 1400: Invalid query')
})

test('should return invalid query', () => {
    const res = DbManager.createQuery(null, null);
    expect(res).toBe('Error code 1400: Invalid query')
})

test('should return CALL userLogin(?,?)', () => {
    const res = DbManager.createQuery('login', 2);
    expect(res).toBe('CALL userLogin(?,?)')
})

test('should return CALL getUserDataAndGames(?)', () => {
    const res = DbManager.createQuery('ownedgames', 1);
    expect(res).toBe('CALL getUserDataAndGames(?)')
})

test('should return CALL getAllGames(?)', () => {
    const res = DbManager.createQuery('games', 1);
    expect(res).toBe('CALL getAllGames(?)')
})

test('should return CALL searchForGames(?)', () => {
    const res = DbManager.createQuery('searchgames', 1);
    expect(res).toBe('CALL searchForGames(?)')
})