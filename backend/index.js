const cors    = require("cors");
const express = require("express");
const app     = express();
const mysql   = require('mysql');
const redis   = require('redis');

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());

// Redis setup
let redisClient;
(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    redisClient.on("connect", () => console.log("Redis connected"));

    await redisClient.connect();
})();

// MySQL setup
const DB = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'toor',
    database: 'todo_list',
});

// Connect to MySQL
DB.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Routes
app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center;">Welcome to the Todo List API!</h1>');
});

app.get('/todos', async (req, res) => {
    try {
        const cachedData = await redisClient.get('todos');
        if (cachedData) {
            return res.send({
                success: true,
                message: 'Todos retrieved from cache successfully!',
                data   : JSON.parse(cachedData)
            });
        }

        const results = await new Promise((resolve, reject) => {
            DB.query('SELECT * FROM todos', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (!results.length) {
            return res.send({
                success: false,
                message: 'No todos found!',
                data   : results
            });
        }

        redisClient.setEx('todos', 3600, JSON.stringify(results));

        return res.send({
            success: true,
            message: 'Todos retrieved from database successfully!',
            data   : results
        });
    } catch (error) {
        throw error;
    }
});

app.post('/todos', (req, res) => {
    // Get data from request body
    const {title, description} = req.body;

    DB.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], (err, results) => {
        if (err) throw err;

        if (!results.affectedRows) {
            return res.send({
                success: false,
                message: 'Todo not added!',
                data   : results
            });
        }

        redisClient.del('todos');

        return res.send({
            success: true,
            message: 'Todo added successfully!',
            data   : {
                id: results.insertId,
                title,
                description
            }
        });
    });
});

app.put('/todos/:id', (req, res) => {
    // Get data from request body
    const {title, description} = req.body;

    DB.query('UPDATE todos SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id], (err, results) => {
        if (err) throw err;

        if (!results.affectedRows) {
            return res.send({
                success: false,
                message: 'Todo not updated!',
                data   : results
            });
        }

        redisClient.del('todos');
        return res.send({
            success: true,
            message: 'Todo updated successfully!',
            data   : {
                id: req.params.id,
                title,
                description
            }
        });
    });
});

app.delete('/todos/:id', (req, res) => {
    DB.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;

        if (!results.affectedRows) {
            return res.send({
                success: false,
                message: 'Todo not deleted!',
                data   : results
            });
        }

        redisClient.del('todos');
        return res.send({
            success: true,
            message: 'Todo deleted successfully!'
        });
    });
});


let port = 5000;
app.listen(port, () => {
    console.log(`Running at - http://localhost:${port}`);
});