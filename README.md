# ProyectoPIServer

API_URL: https://proyectopi-server.herokuapp.com/

Para cada tabla los CRUDs están distribuidos de esta forma: 

/nombretabla

GET seleccionar todos los elementos
/nombretabla/:id GET seleccionar por id
POST crear nuevo elemento
PUT actualizar elemento por id
DELETE eliminar elemento por id

Para las tablas de detalle:

/nombretabla/tablamaster/:id GET seleccionar por id
