# Express Post

Project Ini adalah Express Starter Api

## Installation

Clone Repository

```bash
  git clone https://github.com/lutfianRhdn/Express-Post-Api.git
```

Create .env

```bash
  cp .env.example .env
```

Install depedencies with npm

```bash

  cd Express-Post-Api/
  npm install
```

Run Project

```bash
  npm start
```

## API Reference

#### Register User

```http
  POST /api/auth/register
```

| Parameter  | Type     | Description              |
| :--------- | :------- | :----------------------- |
| `name`     | `string` | **Required**. Your Name  |
| `email`    | `string` | **Required**. Your Email |
| `password` | `string` | **Required**. Password   |

#### Login User

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Get Access Toeken

```http
  GET /api/auth/refresh-token
```

#### Logout User

```http
  POST /api/auth/refresh-token
```

#### Get All Post

```http
  get /api/post/
```

#### Get detail Post

```http
  GET /api/post/${id}
```

#### Create Post

```http
  POST /api/post/
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `title`   | `string` | **Required**. |
| `desc`    | `string` | **Required**. |

Takes two numbers and returns the sum.

#### Update Post

```http
  PUT /api/post/${id}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `title`   | `string` | **Required**. |
| `desc`    | `string` | **Required**. |

#### Delete Post

```http
  DELETE /api/post/${id}
```

## Authors

-    [@lutfianRhdn](https://www.github.com/lutfianRhdn)
