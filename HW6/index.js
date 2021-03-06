/*
BD api

CREATE TABLE `users` (
  `id`       int(11)     unsigned NOT NULL AUTO_INCREMENT,
  `name`     varchar(30) DEFAULT '',
  `email`    varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO users (name, email) 
     VALUES ('Sergey', 'sergey@gmail.com'), 
            ('NeSergey',  'nesergey@gmail.com');

*/

// "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld"

const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api',
};

const pool = mysql.createPool(config);
module.exports = pool;

app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});


app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', [request.body], (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});


app.put('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully.');
    });
});


app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send('User deleted.');
    });
});

app.listen(3000,()=> console.log("Server listening on 3000"));