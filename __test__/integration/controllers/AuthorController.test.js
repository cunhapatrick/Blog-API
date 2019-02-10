import '@babel/polyfill'
import dbman from '../../../src/config/mongodb_test';
import AuthorController from '../../../src/app/controllers/AuthorController'
import Author from '../../../src/app/models/Author'

let request;
let response;

describe("Integration Test for Author Controller", ()=> {
  afterAll(async () => { await dbman.stop(); });
  beforeAll(async () => { await dbman.start(); });
  beforeEach(()=> {
    request = {
      headers:{
        Accept: "application/json"
      },
      body:{},
      params: {},
      query: {}
    }
    response = {
      status: function (code) {
          this.statusCode = code
          return this
        },
      json: function (data) {
        this.resp = data
      },
      send: () => true
    }
  })
  afterEach(async () => { await dbman.cleanup(); });

  const body = {
    name: "Patrick Cunha",
    email: "patrick.cunha336@gmail.com",
    password: "123"
  }

  it("STORE Author", async ()=>{
    request.body = body
    await AuthorController.store(request,response)
    expect(response.resp.name).toBe("Patrick Cunha")
  })

  it("SHOW Authors", async () =>{
    request.query = {}
    await AuthorController.index(request,response)
    expect(response.resp.docs.length).toBe(1)
  })

  it("UPDATE Author", async () => {
    const articles = await Author.find({})
    request.params.id = articles[0]._id
    await AuthorController.update(request,response)
    expect(response.resp.doc.name).toBe("Patrick Cunha")
  })

  it("DELETE Author", async () => {
    const authors = await Author.find({})
    request.params.id = authors[0]._id
    const res = await AuthorController.destroy(request,response)
    expect(res).toBeTruthy()
  })
})
