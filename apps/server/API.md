# Cloud Platform for Microcontrollers

## Enpoints

```txt
http://192.168.100.42:3000/api
|---- /auth
│     |---- /signup           POST
|     |---- /signin           POST
|     |---- /change-password  POST
|     |---- /signout          DELETE
|     └---- /refresh-token    POST
|---- /user
|     |---- /list             GET
|     |---- /account          GET
|     |---- /set-role/:id     POST
|     └---- /delete/:id       DELETE
|---- /things
|     |---- /list             POST
|     |---- /my-list          GET
|     |---- /create           POST
|     |---- /update/:id       POST
|     └---- /delete/:id       DELETE
└---- /boards
      |---- /list             POST
      |---- /my-list          GET
      |---- /create/          POST
      |---- /create-token/:id POST
      |---- /update/:id       POST
      |---- /add-things/:id   POST
      |---- /set-ip/:id       POST
      └---- /delete/:id       DELETE
```

## Auth Endpoint (/api/auth/)

### **Sign Up**

`POST` /api/auth/signup

Request Body

```json
{
  "name": "<name>",
  "email": "<email>",
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 201,
  "message": "User created succesfully!",
  "token": "<token>"
}
| {
  "status": <status_err>,
  "message": "<message_err>"
}
| {
  "status": 500,
  "message": "Internal server error"
}
```

### **Sign In**

`POST` /api/auth/signin

Request Body

```json
{
  "email": "<email>",
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 201,
  "message": "User created succesfully!",
  "token": "<token>"
}
| {
  "status": <status_err>
  "message": "<message_err>"
}
| {
  "status": 500,
  message: "Internal server error"
}
```

### **Change Password**

`POST` /api/auth/change-password

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Body

```json
{
  "password": "<password>",
  "newpassword": "<new-password>"
}
```

Response Body

```json
{
  "status": 201,
  "message": "Password changed succesfully!",
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **Sign Out**

`DELETE` /api/auth/signout

Request Body

```json
{
  "email": "<email>",
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 201,
  "message": "User deleted succesfully!",
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **Refresh Token**

`POST` /api/auth/refresh-token

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Rsponse Body

```json
{
  "status": 200,
  "message": "Token refreshing succesfully!",
  "newToken": "<new-token>"
}
| {
  "status": <status_err>,
  "message": "<message_err>"
}
| {
  "status": 500,
  "message": "Internal server error"
}
```

## User Endpoint (/api/user/)

### **List**

`GET` /api/user/list

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Response Body

```json
{
  "status": 200,
  "users": []
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **Account**

`GET` /api/user/account

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Response Body

```json
{
  "status": 200,
  "account": {
    "id": "<string>",
    "email": "<string>",
    "name": "<string>",
    "role": "<'admin' | 'setter' | 'viewer'>",
    "createdDate": "<Date>"
  }
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} |
{
  "status": 500,
  "message": "Internal server error"
}
```

### **Set Role By User Id**

`POST` /api/user/set-role/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params
| Param | Descreption |
|-------|----------------|
| id | Id of the User |

Request Body

```json
{
  "password": "<password>",
  "role": "<'admin' | 'setter' | 'viewer'>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "User role successfully updated to the <'admin' | 'setter' | 'viewer'> role"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} |
{
  "status": 500,
  "message": "Internal server error"
}
```

### **Delete By User Id**

`DELETE` /api/user/delete/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params
| Param | Descreption |
|-------|----------------|
| id | Id of the User |

Request Body

```json
{
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "User successfully deleted"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} |
{
  "status": 500,
  "message": "Internal server error"
}
```

## Things Endpoint (/api/things)

### **List**

`POST` /api/things/list

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Body

```json
{
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Things listed successfully",
  "data": []
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **My List**

`GET` /api/things/my-list

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "The list of things was successfully retrieved",
  "data": []
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **Create**

`POST` /api/things/create

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Body

```json
{
  "password": "<password>",
  "name": "<name>",
  "type": "<'output' | 'input'>",
  "value": []
}
```

Response Body

```json
{
  "status": 200,
  "message": "Thing created successfully"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **Update**

`POST` /api/things/update/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params
| Param | Descreption |
|-------|----------------|
| id | Id of the User |

Request Body

```json
{
  "password": "<password>",
  "name": "<name>",
  "type": "<'output' | 'input'>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Thing updated successfully"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

### **Delete**

`DELETE` /api/things/delete/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params
| Param | Descreption |
|-------|----------------|
| id | Id of the User |

Request Body

```json
{
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Things deleted successfully",
  "data": []
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}
```

## Boards Endpoint (/api/boards)

### **List**

`POST` /api/boards/list

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Body

```json
{
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Boards listed successfully",
  "data": []
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **My List**

`GET` /api/boards/my-list

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "The list of boards was successfully retrieved",
  "data": []
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **Create**

`POST` /api/boards/create

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Body

```json
{
  "password": "<password>",
  "name": "<name>",
  "description": "<description>"
}
```

Response Body

```json
{
  "status": 201,
  "message": "Board created successfully"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **Create Token By Board Id**

`POST` /api/boards/create-token/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params

| Param | Description     |
| ----- | --------------- |
| id    | Id of the Board |

Request Body

```json
{
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Board token created successfully",
  "token": "<board-token>"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **Update**

`POST` /api/boards/update/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params

| Param | Description     |
| ----- | --------------- |
| id    | Id of the Board |

Request Body

```json
{
  "password": "<password>",
  "name": "<name>",
  "description": "<description>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Board updated successfully"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **Add Things To Board**

`POST` /api/boards/add-things/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params

| Param | Description     |
| ----- | --------------- |
| id    | Id of the Board |

Request Body

```json
{
  "password": "<password>",
  "thingsIds": ["<thing-id-1>", "<thing-id-2>"]
}
```

Response Body

```json
{
  "status": 200,
  "message": "Things successfully added to the board"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **Set IP Address**

`POST` /api/boards/set-ip/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params

| Param | Description     |
| ----- | --------------- |
| id    | Id of the Board |

Request Body

```json
{
  "password": "<password>",
  "ip": "<ip-address>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Board IP successfully updated"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```

### **Delete**

`DELETE` /api/boards/delete/:id

Request Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

Request Params

| Param | Description     |
| ----- | --------------- |
| id    | Id of the Board |

Request Body

```json
{
  "password": "<password>"
}
```

Response Body

```json
{
  "status": 200,
  "message": "Board deleted successfully"
} |
{
  "status": <status_err>,
  "message": "<message_err>"
} | {
  "status": 500,
  "message": "Internal server error"
}

```
