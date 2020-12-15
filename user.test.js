const User = require('./user');

test('should return Valid credentials', () => {
    const req = {
        body: {
            username: 'valdal14',
            password: '%Valdal14'
        }
    };

    const response = {
        "response": [
            {
                "userId": 1,
                "username": "valdal14",
                "pwd": "0978b9c947a8eaff4f4c3fd6fbb0baa0708d2bc7",
                "email": "valdal14@gmail.com",
                "userPicture": "valdal14.png",
                "promo": 1,
                "isProUser": 0
            }
        ]
    }

    const user = new User();
    const loginAuth = user.login(req, res);
    expect(loginAuth).toBe('Valid credentials');
})
