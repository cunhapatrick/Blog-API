import '@babel/polyfill'
import auth from '../../../src/app/middlewares/auth'

let request;
let response;

process.env.APP_SECRET="$2a$10$7J2KG8gFVULy6fd0t25E7.jAKUNqiqjx6GG03KDxaqm0C4i0RUAeS"

describe('Unit Test for Middleware Auth', () => {
  beforeEach(() => {
    request = {
      headers:{
        Accept: "application/json"
      }
    }
    response = {
      status: function (code) {
          this.statusCode = code
          return this
        },
      json: function (data) {
        this.resp = data
      }
    }
  })

  afterEach(() => {
    request = {};
    response= {};
  });

  it('Auth with no headers', async () => {
    await auth(request,response,null)
    expect(response.statusCode).toBe(401)
  })

  it('Auth with wrong code', async() => {
    request.headers.authorization = 'Bearer test124'
    await auth(request,response,null)
    expect(response.resp.error).toBe("Invalid Token")
  })
})
