## Description

Sample auth application.

## Installation

1. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) package (also don't forget about [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/get-started/))
2. Install project dependencies:

```bash
$ yarn install
```

## Running the app

1. Copy file `.env.example` and rename to `.env`
2. Open terminal in the root dir
3. Perform next commands:

```bash
# run docker-compose.yml file
$ docker compose up

# production mode
$ yarn start:prod
```
Or
```bash
# run docker-compose.yml file
$ docker compose up

# run migrations manually
$ yarn migrate

# watch mode
$ yarn run start:dev
```

## Testing

1. Run health-check

```bash
curl --request GET \
  --url http://localhost:3000/health
```

2. Register

```bash
# sign-up
curl --request POST \
  --url http://localhost:3000/authentication/sign-up \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user1@mail.com",
	"password": "Password!123"
  }'
```

3. Login

```bash
# sign-in
# by default auth token ttl 1 hour, refresh token ttl 24 hours
curl --request POST \
  --url http://localhost:3000/authentication/sign-in \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user1@mail.com",
	"password": "Password!123"
  }'
```

4. Get user

```bash
# get user by id
curl --request GET \
  --url http://localhost:3000/users/1 \
  --header 'Authorization: Bearer REPLACE_BY_AUTH_TOKEN_FROM_SIGN_IN_RESPONSE'
```

5. Update user role from `regular` to `admin`

```bash
# run repl interactive environment in second terminal
$ yarn start -- --entryFile repl

# update user role
$ await get("UserRepository").update({ role: 'admin' }, { where: { id: 1 }, returning: true, raw: true })

# close repl
$ .exit
$ Ctrl + C
```

6. Login again

```bash
curl --request POST \
  --url http://localhost:3000/authentication/sign-in \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user1@mail.com",
	"password": "Password!123"
  }'
```

7. Get all users

```bash
# get all users
curl --request GET \
  --url http://localhost:3000/users \
  --header 'Authorization: Bearer REPLACE_BY_AUTH_TOKEN_FROM_THE_LAST_SIGN_IN_RESPONSE'
```

8. Refresh token

```bash
# refresh auth token
curl --request POST \
  --url http://localhost:3000/authentication/refresh-tokens \
  --header 'Content-Type: application/json' \
  --data '{
	"refreshToken": "REPLACE_BY_REFRESH_TOKEN_FROM_THE_LAST_SIGN_IN_RESPONSE"
  }'
```

9. Log out

```bash
# sign-out
curl --request POST \
  --url http://localhost:3000/authentication/sign-out \
  --header 'Authorization: Bearer REPLACE_BY_AUTH_TOKEN_FROM_THE_LAST_REFRESH_TOKEN_RESPONSE'
```