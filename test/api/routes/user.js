export default (request) => {
  describe('Users', () => {
    it('should fail to authenticate user', async () => {
      await request.get('/api/user/me')
        .expect(401);
    });
  });
};
