const supertest = require("supertest")
const db = require('./database/dbConfig')
const server = require('./api/server')

beforeAll(async () => {
	return await db.migrate.latest()
})

afterAll(async () => {
    return await db.migrate.rollback()
})

test("register user", async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: "joey", password: "abc123" })
    expect(res.statusCode).toBe(201)
})

test("register user", async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: "jason", password: "abc123" })
    expect(res.type).toBe("application/json")
})

test("register user", async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: "justin", password: "abc123" })
    expect(res.body.message).toBe("Welcome justin! Now go log in please!")
})

test("login user", async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: "joey", password: "abc123" })
    expect(res.type).toBe("application/json")
})

test("login user", async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: "joey", password: "abc123" })
    expect(res.body).toBeDefined()
})

test("get jokes", async () => {
    const res = await supertest(server).get('/api/jokes')
    expect(res.type).toBe("application/json")
})

test("get jokes", async () => {
    const res = await supertest(server).get('/api/jokes')
    expect(res.body).toBeDefined()
})
