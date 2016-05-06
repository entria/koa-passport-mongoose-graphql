'use strict';

export default function testUser(request) {
    describe('Users', () => {
        it('should return true', async () => {
            const res = await request.get('/api/user/me')
                .expect(401);
                
            console.log(res, res.body);
        });
    });
}