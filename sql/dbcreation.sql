CREATE TABLE rol (
    id_rol   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre   VARCHAR(200) NOT NULL
);

CREATE TABLE categoria (
    id_categoria   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre         VARCHAR(200) NOT NULL
);

CREATE TABLE departamento (
    id_departamento   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre            VARCHAR(200) NOT NULL
);

CREATE TABLE municipio (
    id_municipio                   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre                         VARCHAR(200) NOT NULL,
    id_departamento   INTEGER NOT NULL
);

CREATE TABLE bodega (
    id_bodega            INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre               VARCHAR(200) NOT NULL,
    estado               CHAR(1) NOT NULL,
    id_sede         INTEGER NOT NULL,
    id_usuario   INTEGER NOT NULL
);


CREATE TABLE cliente (
    id_cliente     INTEGER NOT NULL  PRIMARY KEY AUTO_INCREMENT,
    nombre         VARCHAR(200) NOT NULL,
    nit            VARCHAR(50) NOT NULL,
    dpi            INTEGER NOT NULL,
    direccion      VARCHAR(500) NOT NULL,
    id_sede   INTEGER NOT NULL,
    UNIQUE KEY(nit,dpi,sede)
);


CREATE TABLE detalle_productocategoria (
    id_producto     INTEGER NOT NULL,
    id_categoria   INTEGER NOT NULL
);

ALTER TABLE detalle_productocategoria ADD CONSTRAINT detalle_productocategoria_pk PRIMARY KEY ( id_producto,
                                                                                                id_categoria );

CREATE TABLE detalle_rol (
    id_usuario   INTEGER NOT NULL,
    id_rol           INTEGER NOT NULL
);

ALTER TABLE detalle_rol ADD CONSTRAINT detalle_rol_pk PRIMARY KEY ( id_usuario,
                                                                    id_rol );

CREATE TABLE detalle_venta (
    id_venta         INTEGER NOT NULL,
    id_producto   INTEGER NOT NULL
);

ALTER TABLE detalle_venta ADD CONSTRAINT detalle_venta_pk PRIMARY KEY ( id_venta,
                                                                        id_producto );

CREATE TABLE producto (
    id_producto   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(200) NOT NULL,
    descripcion   VARCHAR(500) NOT NULL,
    precio        FLOAT NOT NULL
);



CREATE TABLE sede (
    id_sede                  INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    alias                    VARCHAR(100) NOT NULL,
    direccion                VARCHAR(500) NOT NULL,
    id_usuario       INTEGER NOT NULL,
    id_municipio   INTEGER NOT NULL
);


CREATE TABLE usuario (
    id_usuario         INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dpi                INTEGER NOT NULL,
    nombre             VARCHAR(200) NOT NULL,
    fecha_nacimiento   DATE NOT NULL,
    correo             VARCHAR(200) NOT NULL,
    password           VARCHAR(200) NOT NULL
);


CREATE TABLE venta (
    id_venta             INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_facturacion    DATE NOT NULL,
    fecha_entrega        DATE,
    id_cliente   INTEGER NOT NULL,
    id_usuario   INTEGER NOT NULL
);

ALTER TABLE bodega
    ADD CONSTRAINT bodega_sede_fk FOREIGN KEY ( id_sede )
        REFERENCES sede ( id_sede ) ON DELETE CASCADE;

ALTER TABLE bodega
    ADD CONSTRAINT bodega_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario ) ON DELETE CASCADE;

ALTER TABLE cliente
    ADD CONSTRAINT cliente_sede_fk FOREIGN KEY ( id_sede )
        REFERENCES sede ( id_sede ) ON DELETE CASCADE;
        
ALTER TABLE detalle_productocategoria
    ADD CONSTRAINT detalle_pcc_fk FOREIGN KEY ( id_categoria )
        REFERENCES categoria ( id_categoria ) ON DELETE CASCADE;

ALTER TABLE detalle_productocategoria
    ADD CONSTRAINT detalle_pcp_fk FOREIGN KEY ( id_producto )
        REFERENCES producto ( id_producto ) ON DELETE CASCADE;

ALTER TABLE detalle_rol
    ADD CONSTRAINT detalle_rol_rol_fk FOREIGN KEY ( id_rol )
        REFERENCES rol ( id_rol ) ON DELETE CASCADE;

ALTER TABLE detalle_rol
    ADD CONSTRAINT detalle_rol_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario ) ON DELETE CASCADE;

ALTER TABLE detalle_venta
    ADD CONSTRAINT detalle_venta_producto_fk FOREIGN KEY ( id_producto )
        REFERENCES producto ( id_producto ) ON DELETE CASCADE;

ALTER TABLE detalle_venta
    ADD CONSTRAINT detalle_venta_venta_fk FOREIGN KEY ( id_venta )
        REFERENCES venta ( id_venta ) ON DELETE CASCADE;

ALTER TABLE municipio
    ADD CONSTRAINT municipio_departamento_fk FOREIGN KEY ( id_departamento )
        REFERENCES departamento ( id_departamento ) ON DELETE CASCADE;

ALTER TABLE sede
    ADD CONSTRAINT sede_municipio_fk FOREIGN KEY ( id_municipio )
        REFERENCES municipio ( id_municipio ) ON DELETE CASCADE;

ALTER TABLE sede
    ADD CONSTRAINT sede_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario ) ON DELETE CASCADE;

ALTER TABLE venta
    ADD CONSTRAINT venta_cliente_fk FOREIGN KEY ( id_cliente )
        REFERENCES cliente ( id_cliente ) ON DELETE CASCADE;

ALTER TABLE venta
    ADD CONSTRAINT venta_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario ) ON DELETE CASCADE;
