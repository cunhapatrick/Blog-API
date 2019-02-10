import '@babel/polyfill'
import dbman from '../../../src/config/mongodb_test';
import ArticleController from '../../../src/app/controllers/ArticleController'
import Article from '../../../src/app/models/Article'

let request;
let response;

describe("Integration Test for Article Controller", ()=> {
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
    title: "Article test",
    subTitle:"Article subTitle test",
    context: "Lorem Ypsulum",
    authors:["daskfj;aljv;fjg"],

  }

  it("STORE Article", async ()=>{
    request.body = body
    await ArticleController.store(request,response)
    expect(response.resp.title).toBe("Article test")
  })

  it("SHOW Articles", async () =>{
    request.query = {}
    await ArticleController.index(request,response)
    expect(response.resp.docs.length).toBe(1)
  })

  it("UPDATE Article", async () => {
    const articles = await Article.find({})
    request.params.id = articles[0]._id
    await ArticleController.update(request,response)
    expect(response.resp.doc.title).toBe("Article test")
  })

  it("DELETE Article", async () => {
    const articles = await Article.find({})
    request.params.id = articles[0]._id
    const res = await ArticleController.destroy(request,response)
    expect(res).toBeTruthy()
  })
})
