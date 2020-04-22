# ProyectoPIServer

API_URL: https://proyectopi-server.herokuapp.com/

Para cada tabla los CRUDs están distribuidos de esta forma: 

* **GET** /nombretabla seleccionar todos los elementos

* **GET** /nombretabla/:id seleccionar por id

* **POST** /nombretabla crear nuevo elemento

* **PUT** /nombretabla actualizar elemento por id

* **DELETE** /nombretabla eliminar elemento por id

Para las tablas de detalle:

* **GET** /nombretabla/tablamaster/:id  seleccionar por id

Funciones especificas:

* **POST** /login body: {correo, password}

* **GET** /totalsales ventas totales agrupadas por fecha

* **GET** /totalsalesbyseller/:id ventas totales agrupadas por fecha de un id de vendedor especifico

Nombre de las tablas y campos:

![Image of Database](https://github.com/diegog56/ProyectoPIServer/blob/master/sql/Relational.png)
