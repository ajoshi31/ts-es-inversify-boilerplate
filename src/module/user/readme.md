Get all the todo for a user


### route:

```/users/:id/todos```


### controller

```getAllToDoByUserId (userId : number) : ToDo[]```


### service


```
@inject ToDoRepository 

getAllToByUserId (userId) {
    todoRepo.getToDoByQuery( where : userId = userId )
}

```

