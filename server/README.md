# Server side of E-Commerce CMS App:
- RESTful endpoint for asset's CRUD operation
- Return JSON formatted response
- Tech stack: node.js, express, postgres, sequelize, bcrypt, cors, jsonwebtoken

## REST endpoint
- [POST users/register](#post-register)
- [POST users/login](#post-login)
- [POST users/resetpassword](#post-resetpassword)
- [POST /products](#post-products)
- [GET /products](#get-products)
- [PUT /products/:id](#put-productsid)
- [PATCH /products/:id](#patch-productsid)
- [DELETE /products/:id](#delete-productsid)
- [POST /carts](#post-carts)
- [GET /carts](#get-carts)
- [DELETE /carts/:id](#delete-carts)
- [PUT /carts/:id](#put-carts)
- [GET /carts/checkout](#get-cartscheckout)
---

> ## Error responses:

### Response:
```json
{
  "status": 4xx || 5xx,
  "message": <error messages>
}
```

> ## POST /users/register

Register a new account

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "name": string,
  "email": string,
  "password": string
}
```

### Responses

#### _Status 201 Created_
```json
{
  "id": 1,
  "email": "admin@admin.com",
  "password": "hashedPassword",
  "role": "User",
  "createdAt": 2020-03-03T15:01:27.405Z,
  "updatedAt": 2020-03-03T15:01:27.405Z
}
```

> ## POST /users/login

Account login

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "email": string,
  "password": string
}
```

### Responses

#### _Status 200 OK_
```json
{
  "token": <your access token>,
  "role": <Admin || User>,
  "password": "hashedPassword",
  "role": "User",
  "createdAt": 2020-03-03T15:01:27.405Z,
  "updatedAt": 2020-03-03T15:01:27.405Z
}
```

> ## POST /users/resetpassword

Reset account password

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "email": string,
  "newPassword": string
}
```

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```

> ## POST /products

Create a new product

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": <your access token>
}
```

#### _Body_
```json
{
  "name": string,
  "image_url": string,
  "price": greater than 0 integer,
  "stock": greater than 0 integer
}
```

### Responses

#### _Status 201 Created_
```json
{
  "id": 1,
  "name": "product's name",
  "image_url": "product's image url",
  "price": products'price,
  "stock": product's stock,
  "createdAt": 2020-04-03T15:01:27.405Z,
  "updatedAt": 2020-04-03T15:01:27.405Z
}
```

> ## GET /products

Get all  products

### Requests

#### _Header_
```json
{
  "token": <your access token>
}
```

#### _Body_
```json
Not needed
```

### Responses

#### _Status 200 OK_
```json
[
  {
    "id": 1,
    "name": "product's name",
    "image_url": "product's image url",
    "price": products'price,
    "stock": product's stock,
    "createdAt": 2020-04-03T15:01:27.405Z,
    "updatedAt": 2020-04-03T15:01:27.405Z
  },
  {
    "id": 2,
    "name": "product's name",
    "image_url": "product's image url",
    "price": products'price,
    "stock": product's stock,
    "createdAt": 2020-04-03T15:01:27.405Z,
    "updatedAt": 2020-04-03T15:01:27.405Z
  },  {
    "id": 3,
    "name": "product's name",
    "image_url": "product's image url",
    "price": products'price,
    "stock": product's stock,
    "createdAt": 2020-04-03T15:01:27.405Z,
    "updatedAt": 2020-04-03T15:01:27.405Z
  }
]
```

> ## PUT /products/:id

Edit a product (its whole properties)

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": <your access token>
}
```

#### _Body_
```json
{
  "name": string,
  "image_url": string,
  "price": greater than 0 integer,
  "stock": greater than 0 integer
}
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```

> ## PATCH /products/:id

Edit a product's stock (only)

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": <your access token>
}
```

#### _Body_
```json
{
  "stock": greater than 0 integer
}
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```

> ## DELETE /products/:id

Delete a product

### Requests

#### _Header_
```json
{
  "token": <your access token>
}
```

#### _Body_
```json
not needed
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```

> ## POST /carts

Create a new cart

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": <your access token>
}
```

#### _Body_
```json
{
  "stock": greater than 0 integer,
  "ProductId": integer of product's id
}
```

### Responses

#### _Status 201 Created_
```json
{
  "id": 5,
  "stock": 1,
  "ProductId": 3,
  "UserId": 2,
  "updatedAt": "2020-03-25T19:54:41.379Z",
  "createdAt": "2020-03-25T19:54:41.379Z"
}
```

> ## GET /carts

Get user's cart

### Requests

#### _Header_
```json
{
  "token": <your access token>
}
```

#### _Body_
```json
not needed
```

### Responses

#### _Status 200 OK_
```json
{
  "id": 2,
  "name": "Test Account",
  "email": "test@test.com",
  "password": "hashedPasword",
  "role": "User",
  "createdAt": "2020-03-25T18:45:42.738Z",
  "updatedAt": "2020-03-25T18:45:42.738Z",
  "Products": [
      {
        "id": 11,
        "name": "Item A",
        "image_url": "image.png",
        "price": 10000000,
        "stock": 4,
        "createdAt": "2020-03-25T18:43:25.580Z",
        "updatedAt": "2020-03-25T18:43:25.580Z",
        "Cart": {
            "id": 4,
            "UserId": 2,
            "ProductId": 11,
            "stock": 1,
            "createdAt": "2020-03-25T19:26:36.704Z",
            "updatedAt": "2020-03-25T19:26:36.704Z"
        }
      }
  ]
}
```

> ## DELETE /carts/:id

Delete user's cart

### Requests

#### _Header_
```json
{
  "token": <your access token>
}
```

#### _Body_
```json
not needed
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```

> ## PUT /carts/:id

Edit user's cart

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": <your access token>
}
```

#### _Body_
```json
{
  "stock": greater than 0 integer
}
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```

> ## GET /carts/checkout

Checkout user's cart

### Requests

#### _Header_
```json
{
  "token": <your access token>
}
```

#### _Body_
```json
not needed
```

### Responses

#### _Status 200 OK_
```json
{
  "msg": "Success"
}
```