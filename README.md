# ProyectoPIServer

API_URL: https://proyectopi-server.herokuapp.com/

Para cada tabla los CRUDs están distribuidos de esta forma: 

* **GET** /nombretabla seleccionar todos los elementos

* **GET** /nombretabla/:id seleccionar por id

* **POST** /nombretabla crear nuevo elemento body:{todos los campos obligatorios}

* **PUT** /nombretabla actualizar elemento por id body:{todos los campos obligatorios}

* **DELETE** /nombretabla eliminar elemento por id

Para las tablas de detalle (no hay **PUT**):

* **GET** /nombretabla/tablamaster/:id  seleccionar por id

Funciones especificas:

* **POST** /login body:{correo, password}

* **GET** /totalsales ventas totales agrupadas por fecha

* **GET** /totalsalesbyseller/:id ventas totales agrupadas por fecha de un id de vendedor especifico

* **GET** /transferencia/byrepartidor/:id ordenes de transferencia de un repartidor

* **GET** /orden/byrepartidor/:id ordenes de venta de un repartidor

* **PUT** /transferencia/asignarrepartidor body:{estado, id_repartidor, fecha_entrega, id_tranferencia}

* **GET** /transferencia/externa transferencias entre distintas sedes

* **GET** /transferencia/interna transferencias entre la misma sede

* **POST** /recoverpassword body:{correo} recuperar contraseña, se envia una contraseña temporal al correo especificado que tiene una validez de 15 minutos y solo sirve para iniciar sesión una vez

**El formato para fecha es '%Y-%m-%d'**

Nombre de las tablas y campos:

![Image of Database](https://github.com/diegog56/ProyectoPIServer/blob/master/sql/Relational.png)
