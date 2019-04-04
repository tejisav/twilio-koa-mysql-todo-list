const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const getBody = await ctx.request.body
  const returnedTodos = await getTodos(getBody.todoItem)
  if (returnedTodos.length) {
    ctx.body = returnedTodos
  } else {
    ctx.status = 500
    ctx.body = 'No todoItems found!'
  }
})

async function getTodos(todoItem) {
  try {
    const updatedTodos = await pool.query(todoItem ? `SELECT * FROM todo WHERE todoItem='${todoItem}';` : `SELECT * FROM todo;`)
    return updatedTodos[0]
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()