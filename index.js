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

/* functions */

//PENDING asign deliver guy and date
//Mindi, falta agregar CRUDs para orden, transferencia y detalle_transferencia. En base a los cruds ya hechos.

//LOGIN

app.post('/login', function (req, res) {
    let body = req.body;
    console.log(body);
    conn.query(`SELECT *
                FROM usuario u
                INNER JOIN detalle_rol dr
                    ON dr.id_usuario=u.id_usuario
                INNER JOIN rol r ON r.id_rol=dr.id_rol
                WHERE correo=? AND password=SHA1(?)`,
                [body.correo, body.password], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//TOTAL SALES BY DATE

app.get('/totalsales', function (req, res) {
    conn.query(`SELECT v.fecha_facturacion as fecha, SUM(cantidad*precio_venta) as total
                FROM venta v
                INNER JOIN detalle_venta dv
                    ON dv.id_venta=v.id_venta
                GROUP BY v.fecha_facturacion`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//TOTAL SALES BY DATE AND SELLER

app.get('/totalsalesbyseller/:id', function (req, res) {
    conn.query(`SELECT v.fecha_facturacion as fecha, u.nombre, SUM(cantidad*precio_venta) as total
                FROM venta v
                INNER JOIN detalle_venta dv
                    ON dv.id_venta=v.id_venta
                INNER JOIN usuario u
                    ON u.id_usuario=v.id_usuario
                WHERE v.id_usuario=${req.params.id}
                GROUP BY v.fecha_facturacion`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

/*  all tables CRUDs
    all tables CRUDs
    all tables CRUDs
    all tables CRUDs
    all tables CRUDs */

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

//rol

app.get('/rol', function (req, res) {
    conn.query(`SELECT * FROM rol`, function (err, result) {
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
        res.send({ request: result });
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
        res.send({ request: result });
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

    conn.query('INSERT INTO cliente(nombre, nit, dpi, direccion, id_sede) VALUES(?,?,?,?,?)', [body.nombre, body.nit, body.dpi, body.direccion, body.id_sede], function (err, result) {
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
        res.send({ request: result });
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
        res.send({ request: result });
    });
});

//categoria

app.get('/categoria', function (req, res) {
    conn.query(`SELECT * FROM categoria`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/categoria/:id', function (req, res) {
    conn.query(`SELECT * FROM categoria WHERE id_categoria=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/categoria', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO categoria(nombre) VALUES(?)', [body.nombre], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/categoria', function (req, res) {
    let body = req.body;
    conn.query('UPDATE categoria SET nombre=? WHERE id_categoria = ?', [body.nombre, body.id_categoria], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/categoria', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM categoria WHERE id_categoria = ?', [body.id_categoria], function (err, result) {
        if (err) throw err;
        res.send({ request: result });
    });
});

//usuario

app.get('/usuario', function (req, res) {
    conn.query(`SELECT * FROM usuario`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/usuario/:id', function (req, res) {
    conn.query(`SELECT * FROM usuario WHERE id_usuario=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/usuario', function (req, res) {
    let body = req.body;

    conn.query("INSERT INTO usuario(nombre, fecha_nacimiento, dpi, correo, password) VALUES(?,STR_TO_DATE(?,'%Y-%m-%d'),?,?,SHA1(?))", [body.nombre, body.fecha_nacimiento, body.dpi, body.correo, body.password], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/usuario', function (req, res) {
    let body = req.body;
    conn.query('UPDATE usuario SET nombre=?, fecha_nacimiento=?, dpi=?, correo=?, password=SHA1(?) WHERE id_usuario = ?', [body.nombre, body.fecha_nacimiento, body.dpi, body.correo, body.password, body.id_usuario], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/usuario', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM usuario WHERE id_usuario = ?', [body.id_usuario], function (err, result) {
        if (err) throw err;
        res.send({ request: result });
    });
});

//venta

app.get('/venta', function (req, res) {
    conn.query(`SELECT * FROM venta`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/venta/:id', function (req, res) {
    conn.query(`SELECT * FROM venta WHERE id_venta=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/venta', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO venta(fecha_facturacion, fecha_entrega, id_cliente, id_usuario) VALUES(?,?,?,?)', [body.fecha_facturacion, body.fecha_entrega, body.id_cliente, body.id_usuario], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/venta', function (req, res) {
    let body = req.body;
    conn.query('UPDATE venta SET fecha_facturacion=?, fecha_entrega=?, id_cliente=?, id_usuario=? WHERE id_venta = ?', [body.fecha_facturacion, body.fecha_entrega, body.id_cliente, body.id_usuario, body.id_venta], function (err, result) {
        if (err) throw err;
        res.send({ request: result});
    });
});

app.delete('/venta', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM venta WHERE id_venta = ?', [body.id_venta], function (err, result) {
        if (err) throw err;
        res.send({ request: result });
    });
});

//detalle_rol

app.get('/detalle_rol', function (req, res) {
    conn.query(`SELECT * FROM detalle_rol`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/detalle_rol/usuario/:id', function (req, res) {
    conn.query(`SELECT * FROM detalle_rol WHERE id_usuario=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/detalle_rol/rol/:id', function (req, res) {
    conn.query(`SELECT * FROM detalle_rol WHERE id_rol=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/detalle_rol', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO detalle_rol(id_usuario,id_rol) VALUES(?,?)', [body.id_usuario, body.id_rol], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/detalle_rol', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM detalle_rol WHERE id_rol = ? AND id_usuario = ?', [body.id_rol, body.id_usuario], function (err, result) {
        if (err) throw err;
        res.send({ request: result });
    });
});

//detalle_venta

app.get('/detalle_venta', function (req, res) {
    conn.query(`SELECT * FROM detalle_venta`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/detalle_venta/venta/:id', function (req, res) {
    conn.query(`SELECT * FROM detalle_venta WHERE id_venta=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/detalle_venta/producto/:id', function (req, res) {
    conn.query(`SELECT * FROM detalle_venta WHERE id_producto=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/detalle_venta', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO detalle_venta(id_venta,id_producto) VALUES(?,?)', [body.id_venta, body.id_producto], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/detalle_venta', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM detalle_venta WHERE id_venta = ? AND id_producto = ?', [body.id_venta, body.id_producto], function (err, result) {
        if (err) throw err;
        res.send({ request: result });
    });
});

//detalle_productocategoria

app.get('/detalle_productocategoria', function (req, res) {
    conn.query(`SELECT * FROM detalle_productocategoria`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/detalle_productocategoria/producto/:id', function (req, res) {
    conn.query(`SELECT * FROM detalle_productocategoria WHERE id_producto=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/detalle_productocategoria/categoria/:id', function (req, res) {
    conn.query(`SELECT * FROM detalle_productocategoria WHERE id_categoria=${req.params.id}`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/detalle_productocategoria', function (req, res) {
    let body = req.body;

    conn.query('INSERT INTO detalle_productocategoria(id_categoria,id_producto) VALUES(?,?)', [body.id_categoria, body.id_producto], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/detalle_productocategoria', function (req, res) {
    let body = req.body;
    conn.query('DELETE FROM detalle_productocategoria WHERE id_categoria = ? AND id_producto = ?', [body.id_categoria, body.id_producto], function (err, result) {
        if (err) throw err;
        res.send({ request: result });
    });
});
