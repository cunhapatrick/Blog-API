import '@babel/polyfill'
import dbman from '../../../src/config/mongodb_test';
import CommentController from '../../../src/app/controllers/CommentController'
import CommentModel from '../../../src/app/models/Comment'

const ObjectId = require('mongoose').Types.ObjectId

let request;
let response;

describe("Integration Test for Comment Controller", ()=> {
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
    context: "Comment test",
    author_id: ObjectId("abcdefghijkl"),
    article_id: ObjectId("abcdefghijkl")
  }

  it("STORE Comment", async ()=>{
    request.body = body
    await CommentController.store(request,response)
    expect(response.resp.context).toBe("Comment test")
  })

  it("SHOW Comments", async () =>{
    request.query = {}
    await CommentController.index(request,response)
    expect(response.resp.docs.length).toBe(1)
  })

  it("UPDATE Comment", async () => {
    const comments = await CommentModel.find({})
    request.params.id = comments[0]._id
    await CommentController.update(request,response)
    expect(response.resp.doc.context).toBe("Comment test")
  })

  it("DELETE Comment", async () => {
    const comments = await CommentModel.find({})
    request.params.id = comments[0]._id
    const res = await CommentController.destroy(request,response)
    expect(res).toBeTruthy()
  })
})
