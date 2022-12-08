const supertest = require("supertest");
const app = require("../app");
var request = supertest(app)


describe("test user routes", function () {

    it("post route shoud create user",async function () {
        var res= await request.post("/users/register")
          .send({userName:"userName1",firstName:"habiba",lastName:"ali",password:"123654"})

expect(res.statusCode).toEqual(200)

expect(res.body).toEqual(jasmine.objectContaining({userName:"userName15"}))
    })


})