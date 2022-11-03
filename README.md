# Intro to APIs

## Description
This is a shop API with User, Item, and Purchase management. Auth0 is used for overall security for the API.

## Installation
This program uses body-parser, dotenv, express, express-jwt, express-jwt-authz, jwks-rsa, and mongoose. Use git i package name used above to install.

## Start-up

start with cloning the repo

run `npm install`

then `npm run dev`

## Endpoints
```plaintext
`POST` localhost:4000/users
```

- Post request is for creating a user.

Supported attributes:

| Attribute                | Type     | Required | Description                                 |
|:-------------------------|:---------|:----------|:-------------------------------------------|
| `firstName`              | string   | Yes       | First name of the user being created.      |
| `lastName`               | string   | Yes       | Last name of the user being created.       |
| `email`                  | string   | Yes       | Email of the user being created.           |
| `address`                | string   | Yes       | This is the address of the user in the form of an object, all fields below fit inside said object. |
| `address.street`         | string   | Yes       | The street associated with your address.   |
| `address.city`           | string   | Yes       | The city associated with your address.     |
| `address.state`          | string   | Yes       | The state associated with your address.    |
| `address.country`        | string   | Yes       | The country associated with your address.  |
| `address.zip`            | string   | Yes       | The zip code associated with your address. |

If successful, returns `200` and the following
response attributes:

| Attribute                | Type     | Description                                |
|:-------------------------|:---------|:-------------------------------------------|
| `firstName`              | string   | First name of the user being created.      |
| `lastName`               | string   | Last name of the user being created.       |
| `email`                  | string   | Email of the user being created.           | 
| `address`                | string   | This is the address of the user in the form of an object, all fields below fit inside said object. |
| `address.street`         | string   | The street associated with your address.   |
| `address.city`           | string   | The city associated with your address.     |
| `address.state`          | string   | The state associated with your address.    | 
| `address.country`        | string   | The country associated with your address.  |
| `address.zip`            | string   | The zip code associated with your address. |
| `_id`                    | string   | The id associated with your address.       |

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"firstName": "Joe", "lastName": "Fisher", "email": "JoeFisher2006@gmail.com", "address": {"street": "231 W Sandra St.", "city": "Wichita Falls", "state": "Texas", "country": "United States of America", "zip": "76302"}}' \
  http://localhost:4000/users
```
Example response:

```json
{
"firstName": "Joe",
"lastName": "Fisher",
"email": "JoeFisher2006@gmail.com",
"address": {
    "street": "231 W Sandra St.",
    "city": "Wichita Falls",
    "state": "Texas",
    "country": "United States of America",
    "zip": "76302"
},
"_id": "635c28cb36c032e792a92b5b",
"__v": 0
}
```

---

```plaintext
`GET` localhost:4000/users/:id
```

 - Gets the user by passing in the `id` of the user in to the route.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" http://localhost:4000/users/<userId>
```
    
Example response:

```json
{
"firstName": "Joe",
"lastName": "Fisher",
"email": "JoeFisher2006@gmail.com",
"address": {
    "street": "231 W Sandra St.",
    "city": "Wichita Falls",
    "state": "Texas",
    "country": "United States of America",
    "zip": "76302"
},
"_id": "635c28cb36c032e792a92b5b",
"__v": 0
}
```

---


```plaintext
`GET` localhost:4000/users
```

- Returns all users in the database.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" http://localhost:4000/users
```
    
Example response:

```json
[
    {
        "address": {
            "street": "431 Starfish Dr.",
            "city": "Wichita Falls",
            "state": "Texas",
            "country": "United States of America",
            "zip": "76308"
        },
        "_id": "633731f802fd1200dbc19c75",
        "firstName": "Jason",
        "lastName": "Hodges",
        "email": "JasonHodges1998@gmail.com",
        "__v": 0
    },
    {
        "address": {
            "street": "231 W Sandra St.",
            "city": "Wichita Falls",
            "state": "Texas",
            "country": "United States of America",
            "zip": "76302"
        },
        "_id": "633a760891ea495f426538e2",
        "firstName": "Joe",
        "lastName": "Fisher",
        "email": "JoeFisher2006@gmail.com",
        "__v": 0
    }
]
```

---

```plaintext
`PATCH` localhost:4000/users/:id
```
- This request is for updating user information.

Supported attributes:

| Attribute                | Type     | Required | Description                                 |
|:-------------------------|:---------|:---------|:--------------------------------------------|
| `firstName`              | string   | No       | First name of the user being created.       |
| `lastName`               | string   | No       | Last name of the user being created.        |
| `email`                  | string   | No       | Email of the user being created.            |
| `address`                | string   | No       | This is the address of the user in the form of an object, all fields below fit inside said object. |
| `address.street`         | string   | No       | The street associated with your address.    |
| `address.city`           | string   | No       | The city associated with your address.      |
| `address.state`          | string   | No       | The state associated with your address.     |
| `address.country`        | string   | No       | The country associated with your address.   |
| `address.zip`            | string   | No       | The zip code associated with your address.  |

- Put in the information you would like to replace in JSON format like this
{
    "firstName": "Joe",
    "lastName": "Fisher"
}
- Then the user you modified should have the desired update to it's information.

If successful, returns `200` and the following
response attributes:

| Attribute                | Type     | Description                              |
|:-------------------------|:---------|:-----------------------------------------|
| `firstName`              | string | First name of the user being created.      |
| `lastName`               | string | Last name of the user being created.       |
| `email`                  | string | Email of the user being created.           |
| `_id`                    | string | The id associated with your address.       |
| `address`                | string | This is the address of the user in the form of an object, all fields below fit inside said object. |
| `address.street`         | string | The street associated with your address.   |
| `address.city`           | string | The city associated with your address.     |
| `address.state`          | string | The state associated with your address.    |
| `address.country`        | string | The country associated with your address.  |
| `address.zip`            | string | The zip code associated with your address. |

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"firstName": "Joe", "email": "JoeFisher2006@gmail.com"}' \
  http://localhost:4000/users/<userId>
```

```json
{
    "address": {
        "street": "231 W Sandra St.",
        "city": "Wichita Falls",
        "state": "Texas",
        "country": "United States of America",
        "zip": "76302"
    },
    "_id": "633a760891ea495f426538e2",
    "firstName": "Joe",
    "lastName": "Fisher",
    "email": "JoeFisher2006@gmail.com",
    "__v": 0
}
```

---

```plaintext
`DELETE` localhost:4000/users/:id
```
   
- Delete's entire user that is linked to the id.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --request DELETE \
  http://localhost:4000/users/<userId>
```

example response:

```
empty response
```

---

```plaintext
`POST` localhost:4000/items
```

- Post request for creating an item.

Supported attributes:

| Attribute                  | Type     | Required | Description                            |
|:---------------------------|:---------|:---------|:---------------------------------------|
| `name`                     | string   | Yes      | Name of the item being created.        |
| `description`              | string   | No       | Description of the item being created. |
| `price`                    | number   | Yes      | Price of the item being created.       |
| `quantity`                 | number   | Yes      | Quantity of the item being created.    |

If successful, returns `200` and the following
response attributes:

| Attribute                  | Type     | Description                            |
|:---------------------------|:---------|:---------------------------------------|
| `name`                     | string   | Name of the item being created.        |
| `description`              | string   | Description of the item being created. |
| `price`                    | number   | Price of the item being created.       |
| `quantity`                 | number   | Quantity of the item being created.    |
| `_id`                      | string   | id of the item being created.          |
| `__v`                      | number   | version of the item being created.     |

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "Halo: The Master Chief Collection -Steam", "description": "best place to play Halo since they cant figure out infinite.", "price": "39.99", "quantity": "90000000000000"}' \
  http://localhost:4000/items
```

Example response:

```json
{
"name": "Halo: The Master Chief Collection -Steam",
"description": "best place to play Halo since they cant figure out infinite.",
"price": "39.99",
"quantity": "90000000000000",
"_id": "635c3e500432eeee991d01e5",
"__v": 0
}
```

---

```plaintext
`GET` localhost:4000/items/:id
```

- Gets the item by passing in the `id` of the item in to the route.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" http://localhost:4000/items/<itemId>
```
    
Example response:

```json
{
"_id": "635c3e500432eeee991d01e5",
"name": "Halo: The Master Chief Collection -Steam",
"description": "best place to play Halo since they cant figure out infinite.",
"price": 39.99,
"quantity": 90000000000000,
"__v": 0
}
```

---

```plaintext
`GET` localhost:4000/items
```

- Returns all items in the database.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" http://localhost:4000/items
```
    
Example response:

```json
[
    {
        "_id": "6337e823c6b0996831711e5c",
        "name": "Xbox Series X",
        "description": "The best new system to play halo... I meant litteraly anything else I guess",
        "quantity": 5000,
        "__v": 0,
        "price": 499.99
    },
    {
        "_id": "633da674f5bc385887017bcd",
        "name": "Playstation 5",
        "description": "All the games are coming to pc anyway so just wait.",
        "price": 559.99,
        "quantity": 0,
        "__v": 0
    },
    {
        "_id": "633da6ecf5bc385887017bcf",
        "name": "Nintendo Switch",
        "description": "Zelda, and thats about it until Metroid Prime comes out.",
        "price": 299.99,
        "quantity": 1970,
        "__v": 0
    }
]
```

---

```plaintext
`PATCH` localhost:4000/items/:id
```

- Patch request to update item info.

Supported attributes:

| Attribute                  | Type     | Required | Description                            |
|:---------------------------|:---------|:---------|:---------------------------------------|
| `name`                     | string   | No       | Name of the item being created.        |
| `description`              | string   | No       | Description of the item being created. |
| `price`                    | Number   | No       | Price of the item being created.       |
| `quantity`                 | Number   | No       | Quantity of the item being created.    |

- Put in the information you would like to replace in JSON format like this
{
    "name": "Halo: The Master Cheese Collection"
}
- Then the item you modified should have the desired update to it's information.

If successful, returns `200` and the following
response attributes:

| Attribute                  | Type     | Description                            |
|:---------------------------|:---------|:---------------------------------------|
| `name`                     | string   | Name of the item being created.        |
| `description`              | string   | Description of the item being created. |
| `price`                    | number   | Price of the item being created.       |
| `quantity`                 | number   | Quantity of the item being created.    |
| `_id`                      | string   | id of the item being created.          |

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"name": "Halo: The Master Cheese Collection"}' \
  http://localhost:4000/items/<itemId>
```

```json
{
    "_id": "635c3e500432eeee991d01e5",
    "name": "Halo: The Master Cheese Collection",
    "description": "best place to play Halo since they cant figure out infinite.",
    "price": 39.99,
    "quantity": 90000000000000,
    "__v": 0
}
```

---

```plaintext
`DELETE` localhost:4000/items/:id
```
   
 - Delete's entire item that is linked to the id.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --request DELETE \
  http://localhost:4000/items/<itemId>
```

example response:

```
empty response
```

---

```plaintext
`POST` localhost:4000/items/:id/purchase
```

- Post request is for creating a purchase.

Supported attributes:

| Attribute                | Type     | Required | Description                                |
|:-------------------------|:---------|:---------|:-------------------------------------------|
| `userId`                 | string   | Yes      | userId of the user creating the purchase.  |
| `itemId`                 | string   | Yes      | itemId of the item being purchased.        |
| `description`            | string   | No       | description of the purchase being created. |
| `total`                  | number   | Yes      | total cost of the item's being purchased.  |
| `quantity`               | number   | Yes      | Quantity of the item's being purchased.    |

If successful, returns `200` and the following
response attributes:

| Attribute                | Type     | Description                             |
|:-------------------------|:---------|:----------------------------------------|
| `_id`                    | string   | id of the item.                         |
| `name`                   | string   | name of the item.                       |
| `description`            | string   | description of the item.                |
| `total`                  | number   | price of the item.                      |
| `quantity`               | number   | updated quantity of the item purchased. |

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"userId": "633731f802fd1200dbc19c75", "itemId": "633da6ecf5bc385887017bcf", "description": "", "total": "299.99", "quantity": "5"}' \
  http://localhost:4000/items/<itemId>/purchase
```

Example response:

- If successful returns updated item wit updated quantity.

```json
{
"_id": "635c3e500432eeee991d01e5",
"name": "Halo: The Master Chief Collection -Steam",
"description": "best place to play Halo since they cant figure out infinite.",
"price": "39.99",
"quantity": "90000000000000"
}
```

---

```plaintext
`GET` localhost:4000/users/:id/purchases
```

- Get request for grabbing all purchases made by a user.

Example request:

```shell
curl --header "Authorization: Bearer <your_access_token>" http://localhost:4000/users/<userId>/purchases
```

Example response:

```json
[
    {
        "_id": "63405873acbb0e2f9792f6d1",
        "userId": "633a760891ea495f426538e2",
        "itemId": "633da6ecf5bc385887017bcf",
        "description": "",
        "total": 1499.95,
        "quantity": 5,
        "__v": 0
    },
    {
        "_id": "6349bb45a9a07ab62a49740f",
        "userId": "633a760891ea495f426538e2",
        "itemId": "633da6ecf5bc385887017bcf",
        "description": "",
        "total": 1499.95,
        "quantity": 5,
        "__v": 0
    },
    {
        "_id": "6349bb86a9a07ab62a497417",
        "userId": "633a760891ea495f426538e2",
        "itemId": "6343171148183da3197ce14e",
        "description": "",
        "total": 37.98,
        "quantity": 2,
        "__v": 0
    }
]
```

## Support
If you have any questions or concerns don't hesitate to email me at `elijahhodge2003@gmail.com`.

## Roadmap
I plan on fully finishing the API in the future. I plan on eventually adding a frontend application external to this project.

## Authors and acknowledgment
Elijah Hodge, Cosmitt LLC