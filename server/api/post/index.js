const Koa = require('koa')
const bodyParser = require('koa-body')
const { twiml: { MessagingResponse } } = require('twilio')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const postBody = await ctx.request.body
  const postItem = await postTodo(postBody.Body, new Date().toISOString().split('T')[0], false)

  const twiml = new MessagingResponse()
  if (postItem) {
    twiml.message(`New todo created with todoID ${postItem[0].insertId}`)
    ctx.body = twiml.toString()
  } else {
    twiml.message(`Failed to create todoItem!`)
    ctx.body = twiml.toString()
  }
})

async function postTodo(todoItem, todoDateAdded, todoStatus) {
  try {
    const postedTodo = await pool.query(`
    INSERT INTO todo (todoItem, todoDateAdded, todoStatus) 
    VALUES ("${todoItem}", "${todoDateAdded}", "${todoStatus}");
    `)
    return postedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()