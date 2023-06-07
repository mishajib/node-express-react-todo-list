# TODO APP

## Installation guide

- Clone the repository
- Run from both directories `npm install` or `yarn` to install both app dependencies
- Run from both directories `npm start` or `yarn start` to start both apps

## Database setup

- Change the database credentials in `backend/index.js` file with your own credentials.
- Create a database named `todo_list` in your MySQL database.
- Import the `todo_list.sql` file from the root directory of the project into your database.
- Now you are ready to go.

## Redis setup

- Install redis on your machine if you don't have it already.
- Run `redis-server` to start the redis server.
- Run `redis-cli` to start the redis client.
- Check if the redis server is running by running `ping` command in the redis client.
- You should get a response `PONG` if the redis server is running.
- Run `set test "It's working!"` to set a test key-value pair in the redis client.
- Run `get test` to get the value of the test key.
- You should get a response `"It's working!"` if the redis server is working.
- Exit the redis client by running `exit` command.
- Now change the redis credentials in `backend/index.js` file with your own credentials.
- Now you are ready to go.

##### Open `http://localhost:5000` in your browser to see the backend app running.

##### Open `http://localhost:3000` in your browser to see the frontend app running.

## Backend packages used

- express (Express used as a web framework)
- mysql (MySQL used as a database)
- cors (CORS used to enable cross-origin resource sharing)
- redis (Redis used as a cache)
- nodemon (Nodemon used to restart the server on file changes)

## Frontend packages used

- react (React used as a frontend framework)
- bootstrap (Bootstrap used as a CSS framework)
- axios (Axios used to make HTTP requests)

## Backend API endpoints

- GET `/todos` - Get all todos
- POST `/todos` - Create a new todo
- PUT `/todos/:id` - Update a todo
- DELETE `/todos/:id` - Delete a todo

**Note:** The frontend app is configured to run on port 3000 and the backend app is configured to run on port 5000. Make
sure that these ports are not used by any other apps on your machine.

**Note:** The backend app is configured to use the redis server on port 6379. Make sure that this port is not used by
any other apps on your machine.

**Note:** The backend app is configured to use the MySQL database on port 3306. Make sure that this port is not used by
any other apps on your machine.


<h1 style="text-align: center;">
    Thanks for reading and happy coding!
</h1>




