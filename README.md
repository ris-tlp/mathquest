# MathQuest UI and API

## API Endpoints
Anything within `<angular brackets>` is a parameter.


### User
| Endpoint                     | Description                                                        | Type             |
|------------------------------|--------------------------------------------------------------------|------------------|
| `/api/users/login`          | Authenticates a user for the MathQuest system.                                        | `POST`            |
| `/api/users/signup`                   | Create a new user.                                                 | `POST`           |
| `/api/users/<userId>`   | Fetches user information through a User ID.             | `GET`           |
