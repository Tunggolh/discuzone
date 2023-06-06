# DISCUZONE REST API

A rest api for a forum website called Discuzone (coming soon)

# Prerequisite

- Node.js
- Connection string for your MongoDB database

# Installation

1. Clone the repository to you local machine
2. Navigate to the project directory

```
cd discuzone-api
```

3. Install dependencies

```
npm install
```

4. Open `config.env` in the root directory of the project and replace `<YOUR_CONNECTION_STRING>` with your MongoDB connection string

```
DATABASE=<YOUR_CONNECTION_STRING>
```

# API

## User Registration and Login

`POST api/v1/users/signup`

```
Content-Type: application/json
{
    "email": "sample@user.io",
    "username": "sample_user",
    "password": "password123",
    "passwordConfirm": "password123"
}
```

`POST api/v1/users/login`

```
Content-Type: application/json
{
    "email": "sample@user.io",
    "password": "password123"
}
```

#### RESPONSE

```
Content-Type: application/json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2VjMGViMzdjODc4OGY1ZGFmMjY3NiIsImlhdCI6MTY4NjAyODUyMywiZXhwIjoxNjkzODA0NTIzfQ.tc4nbJqmb4kQKRo6xAevF414TvETFBQnmf-BJefOE9M",
    "data": {
        "user": {
            "username": "sample_user",
            "email": "sample@user.io",
            "active": true,
            "_id": "647ec0eb37c8788f5daf2676",
            "id": "647ec0eb37c8788f5daf2676"
        }
    }
}
```

## Protected Routes

To access these protected routes, include the Bearer token obtained during the signup/login in the `Authorization` header of your requests.

## List of Routes Available

### Users

```
POST api/v1/users/signup
POST api/v1/users/login
GET api/v1/users PROTECTED
GET api/v1/users/:id PROTECTED
PATCH api/v1/users/:id PROTECTED
DELETE api/v1/users/:id PROTECTED
```

### Posts

```
POST api/v1/posts PROTECTED
POST api/v1/posts/:id/like PROTECTED
GET api/v1/posts
GET api/v1/posts/:id
GET api/v1/users/userId/posts/:id
PATCH api/v1/posts/:id PROTECTED
DELETE api/v1/posts/:id PROTECTED
```

### Comments

```
POST api/v1/posts/:postId/comments PROTECTED
POST api/v1/posts/:postId/comments/:id/like PROTECTED
GET api/v1/psts/:postId/comments
PATCH api/v1/posts/:postId/comments/:id PROTECTED
DELETE api/v1/posts/:postId/comments/:id PROTECTED
```

# EXAMPLE USE OF DISCUZONE API

## CREATING A POST

`POST api/v1/posts`

```
{
    "title": "A new game",
    "body": "new game just released",
    "category": "Games"
}
```

#### RESPONSE

```
HTTP/1.1 201 Created
Content-Type: application/json
{
    "status": "success",
    "data": {
        "post": {
            "title": "A new game",
            "body": "new game just released",
            "category": "Games",
            "likes": [],
            "user": "647ec2321eebf887891bf1ab",
            "_id": "647ecd114142a8cc624604e0",
            "createdAt": "2023-06-06T06:07:13.753Z",
            "__v": 0,
            "likeCount": 0,
            "id": "647ecd114142a8cc624604e0"
        }
    }
}
```

## GETTING ALL POSTS OF A USER

`GET api/v1/users/:userId/posts`

#### RESPONSE

```
{
    "status": "success",
    "results": 1,
    "data": {
        "post": [
            {
                "_id": "647ecd114142a8cc624604e0",
                "title": "A new game",
                "body": "new game just released",
                "category": "Games",
                "likes": [],
                "user": {
                    "_id": "647ec2321eebf887891bf1ab",
                    "username": "sample_userrr",
                    "id": "647ec2321eebf887891bf1ab"
                },
                "createdAt": "2023-06-06T06:07:13.753Z",
                "likeCount": 0,
                "id": "647ecd114142a8cc624604e0"
            }
        ]
    }
}
```

## UPDATING A POST

`PATCH api/v1/posts/:id`

```
{
    "body": "new game content"
}
```

#### RESPONSE

```
{
    "status": "success",
    "data": {
        "post": {
            "title": "A new game",
            "body": "new game content",
            "category": "Games",
            "likes": [],
            "user": "647ec2321eebf887891bf1ab",
            "createdAt": "2023-06-06T06:07:13.753Z",
            "_id": "647ecd114142a8cc624604e0",
            "likeCount": 0,
            "id": "647ecd114142a8cc624604e0"
        }
    }
}
```

## DELETING A POST

`DELETE api/v1/posts/:id`

#### RESPONSE

```
HTTP/1.1 204 No Content
```

## LIKING A POST

`POST api/v1/posts/:id/like`

#### RESPONSE

```
{
    "status": "success",
    "data": {
        "post": {
            "_id": "647eb7d64267299e243a50c8",
            "title": "new POST123",
            "body": "test1234",
            "category": "Games",
            "likes": [
                "647e87d54921d78868b96baf",
                "647e916e9f996af07d62872f",
                "647ec2321eebf887891bf1ab"
            ],
            "user": null,
            "createdAt": "2023-06-06T04:36:38.194Z",
            "likeCount": 3,
            "id": "647eb7d64267299e243a50c8"
        }
    }
}
```
