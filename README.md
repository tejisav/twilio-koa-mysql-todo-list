# Assignment Two - Todo List Backend With Twilio

## Twilio
To create a new todoItem, send a text message to the following number :-
```
+1 (604) 800-0591
```

## HTTPie Test

### Post
```
http POST https://twilio-koa-mysql-todo-list.now.sh/api/post < post.json
```
### Get
```
http https://twilio-koa-mysql-todo-list.now.sh/api/get
http https://twilio-koa-mysql-todo-list.now.sh/api/get < get.json
http https://twilio-koa-mysql-todo-list.now.sh/api/get < error.json
```
### Update
```
http PUT https://twilio-koa-mysql-todo-list.now.sh/api/update < update.json
```
### Delete
```
http POST https://twilio-koa-mysql-todo-list.now.sh/api/delete < delete.json
```