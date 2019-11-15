const db = require('../database/dbConfig.js');

const { find, findById, add } = require('./user-model');

describe('user model', function() {
  describe('find()', function() {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should return an array', async function() {
      await find();

      const users = await db('users');
      expect(users).toEqual([]);
    })
  })

  describe('add()', function() {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should add a user', async function() {
      await add({ username: "ben", password: "pass" });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it("should add the provided user", async function() {
      await add({ username: "sam", password: "pass" });
      await add({ username: "gaffer", password: "word" });

      const users = await db("users"); 

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe("sam");
      expect(users[1].username).toBe("gaffer"); 
    });
  })
})