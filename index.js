'use strict';
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: '10mb', extended: true }));
var cors = require('cors');
app.use(cors());

const db_credentials = require('./db_credentials');
var conn = mysql.createPool(db_credentials);


/*APP*/
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server running at http://localhost:' + port);
});

app.get('/', function (req, res) {
    /*require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        res.send('Server running at ' + add + ':' + port);
    })*/
    res.send('Welcome to PI');
});

app.get('/locations', function (req, res) {
    conn.query(`SELECT d.nombre as departamento,m.nombre as municipio
                FROM departamento d
                INNER JOIN municipio m
                    ON m.id_departamento=d.id_departamento`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
/* all tables CRUDs */

//departamento

app.get('/departamento', function (req, res) {
    conn.query(`SELECT * FROM departamento`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//municipio

app.get('/municipio', function (req, res) {
    conn.query(`SELECT * FROM municipio`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//sede

app.get('/sede', function (req, res) {
    conn.query(`SELECT * FROM sede`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/sede/:id', function (req, res) {
    conn.query(`SELECT * FROM sede WHERE id_sede=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/sede', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO sede(alias, direccion, id_usuario, id_municipio) VALUES(?,?,?,?)', [body.alias, body.direccion, body.id_usuario, body.id_municipio], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/sede', function (req, res) {
    let body = req.body;
    conn.query('UPDATE sede SET alias=?, direccion=?, id_usuario=?, id_municipio=? WHERE id_sede = ?', [body.alias, body.direccion, body.id_usuario, body.id_municipio,body.id_sede], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/sede', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM sede WHERE id_sede = ?', [body.id_sede], function (err, result) {
        if (err) throw err;
        res.send({ requested: result });
    });
});

//bodega

app.get('/bodega', function (req, res) {
    conn.query(`SELECT * FROM bodega`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/bodega/:id', function (req, res) {
    conn.query(`SELECT * FROM bodega WHERE id_bodega=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/bodega', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO bodega(nombre, estado, id_sede, id_usuario) VALUES(?,?,?,?)', [body.nombre, body.estado, body.id_sede, body.id_usuario], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/bodega', function (req, res) {
    let body = req.body;
    conn.query('UPDATE bodega SET nombre=?, estado=?, id_sede=?, id_usuario=? WHERE id_bodega = ?', [body.nombre, body.estado, body.id_sede, body.id_usuario, body.id_bodega], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/bodega', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM bodega WHERE id_bodega = ?', [body.id_bodega], function (err, result) {
        if (err) throw err;
        res.send({ requested: result });
    });
});

//cliente

app.get('/cliente', function (req, res) {
    conn.query(`SELECT * FROM cliente`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/cliente/:id', function (req, res) {
    conn.query(`SELECT * FROM cliente WHERE id_cliente=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/cliente', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO cliente(nombre, nit, dpi, direccion, id_sede) VALUES(?,?,?,?)', [body.nombre, body.nit, body.dpi, body.direccion, body.id_sede], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/cliente', function (req, res) {
    let body = req.body;
    conn.query('UPDATE cliente SET nombre=?, nit=?, dpi=?, direccion=?, id_sede=? WHERE id_cliente = ?', [body.nombre, body.nit, body.dpi, body.direccion, body.id_sede, body.id_cliente], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/cliente', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM cliente WHERE id_cliente = ?', [body.id_cliente], function (err, result) {
        if (err) throw err;
        res.send({ requested: result });
    });
});

//producto

app.get('/producto', function (req, res) {
    conn.query(`SELECT * FROM producto`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/producto/:id', function (req, res) {
    conn.query(`SELECT * FROM producto WHERE id_producto=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/producto', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO producto(nombre, descripcion, precio) VALUES(?,?,?)', [body.nombre, body.descripcion, body.precio], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/producto', function (req, res) {
    let body = req.body;
    conn.query('UPDATE producto SET nombre=?, descripcion=?, precio=? WHERE id_producto = ?', [body.nombre, body.descripcion, body.precio, body.id_producto], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/producto', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM producto WHERE id_producto = ?', [body.id_producto], function (err, result) {
        if (err) throw err;
        res.send({ requested: result });
    });
});