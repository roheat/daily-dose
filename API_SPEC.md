# API Specifications

## User

### User object

```
{
 "user": {
  "email": "rohith@email.com",
  "token": "jwt.token.here",
  "username": "test",
  "bio": "I work at Google! (lol jk)",
  "image": "https://i.ibb.co/XCXYv4Y/avatar.png"
  }
}
```

## Sign up

`POST /api/users`

```
{
 "user":{
  "username": "rohith"
  "email": "rohith@email.com",
  "password": "changeme"
  }
}
```

## Login

`POST /api/users/login`

```
{
 "user":{
  "email": "rohith@email.com",
  "password": "changeme"
  }
}
```

## Get user by id

`GET /api/users`

Returns user object. Requires authentication token.

## Update user data

`PUT /api/user`

Requires authentication token.

```
{
 "user":{
  "username": "test",
  "email": "rohith@email.com",
  "bio": "I am the Prime Minister of India",
  "password": "modiji"
  "image": "https://pbs.twimg.com/profile_images/1134082549041393672/QbihPzrL_400x400.png"
  }
}
```

### Profile object

```
{
 "profile": {
  "username": "test",
  "bio": "I work at Google! (lol jk)",
  "image": "https://i.ibb.co/XCXYv4Y/avatar.png",
  "following": false
  }
}
```

## Get public user data for profiles

`GET /api/profiles/:username`

Authentication optional, returns profile object.

## Follow/Unfollow user

`POST /api/profiles/:username/follow`

`DELETE /api/profiles/:username/follow`

Authentication optional, returns profile object.

## Articles

### Article object

```
{
  "article": {
    "slug": "how-to-become-a-super-saiyan",
    "title": "How to become a Super Saiyan",
    "description": "Ever wonder how?",
    "body": "Are you Goku?",
    "createdAt": "2020-04-8T03:22:56.637Z",
    "updatedAt": "2020-04-8T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "test",
      "bio": "I work at Google",
      "image": "https://i.ibb.co/XCXYv4Y/avatar.png",
      "following": false
    }
  }
}
```

## Create article

`POST /api/articles`

```
{
  "article": {
    "title": "How to become a Super Saiyan?",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ['reactjs', 'angularjs', 'super-saiyan']
  }
}
```

## Read articles

`GET /api/articles/:slug`

No authentication required, will return single article

## Update article

`PUT /api/articles/:slug`

```
{
  "article": {
    "title": "How to become Super Saiyan 2?"
  }
}
```

Authentication required, returns the updated article.

## Delete article

`DELETE /api/articles/:slug`

Authentication required.

## Favourite/Unfavourite an article

`POST /api/articles/:slug/favorite`

`DELETE /api/articles/:slug/favorite`

Authentication required, returns the article.

## Comments

### Comments object

```
{
  "comment": {
    "id": 1,
    "body": "Please teach me sensei",
    "createdAt": "2020-04-8T03:22:56.637Z",
    "author": {
      "username": "goku",
      "bio": "I save the world, sometimes",
      "image": "https://i.ibb.co/XCXYv4Y/avatar.png",
      "following": false
    }
  }
}
```

## Create comment

`POST /api/articles/:slug/comments`

```
{
  "comment": {
    "body": "I like apples."
  }
}
```

Authentication required, returns the comment.

## Read comments of an article

`GET /api/articles/:slug/comments`

```
{
  "comments": [{
    "id": 1,
    "body": "body": "Please teach me sensei",
    "createdAt": "2020-04-8T03:22:56.637Z",
    "author": {
      "username": "goku",
      "bio": "I save the world, sometimes",
      "image": "https://i.ibb.co/XCXYv4Y/avatar.png",
      "following": false
    }
  }]
}
```

Authentication optional, returns array of comments.

## Delete comment

`DELETE /api/articles/:slug/comments/:id`

Authentication required

## Get tags

`GET /api/tags`

```
{
  "tags": [
    "reactjs",
    "angularjs"
  ]
}
```
