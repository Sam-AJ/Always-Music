const { Pool } = require('pg');
const yargs = require('yargs');

const pool = new Pool({
    user: 'postgres',
    password: 'postgresql',
    host: 'localhost',
    database: 'alwaysmusic',
    port: 5432
});

// Función asíncrona para registrar un nuevo estudiante en la base de datos.
yargs.command("registrar", "Insertar registro de estudiante",{
    rut:{
        describe: 'Identificación única del estudiante',
        demand: true,
        alias: 'r'
    },
    nombre:{
        describe: 'Nombre del estudiante',
        demand: true,
        alias: 'n'
    },
    curso:{
        describe: 'Curso al que se inscribe el estudiante',
        demand: true,
        alias: 'c'
    },
    nivel:{
        describe: 'Nivel del estudiante',
        demand: true,
        alias: 'nv'
    }
}, async (argumentos) => {
    let { rut, nombre, curso, nivel } = argumentos;
    let sql = `INSERT INTO estudiantes(rut, nombre, curso, nivel) VALUES('${rut}', '${nombre}', '${curso}', ${nivel}) RETURNING *`;
    let respuesta = await pool.query(sql);
    console.log(respuesta.rows);
}).help().argv;

// Función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
yargs.command("rut", "Obtener registro de estudiante por rut",{
    rut:{
        describe: 'Identificación única del estudiante',
        demand: true,
        alias: 'r'
    }
}, async (argumentos) => {
    let { rut } = argumentos;
    let sql = `SELECT * FROM estudiantes WHERE rut= '${rut}'`;
    let respuesta = await pool.query(sql);
    console.log(respuesta.rows);
}).help().argv;

// Función asíncrona para obtener por consola todos los estudiantes registrados
yargs.command("consulta", "Obtener todos los estudiantes registrados", 
    async () => {
        let sql = `SELECT * FROM estudiantes`;
        let respuesta = await pool.query(sql);
        console.log(respuesta.rows);
}).help().argv;

// Función asíncrona para actualizar los datos de un estudiante en la base de datos. 
yargs.command("editar", "Actualizar registro de estudiante",{
    rut:{
        describe: 'Identificación única del estudiante',
        demand: true,
        alias: 'r'
    },
    nombre:{
        describe: 'Nombre del estudiante',
        demand: true,
        alias: 'n'
    },
    curso:{
        describe: 'Curso al que se inscribe el estudiante',
        demand: true,
        alias: 'c'
    },
    nivel:{
        describe: 'Nivel del estudiante',
        demand: true,
        alias: 'nv'
    }
}, async (argumentos) => {
    let { rut, nombre, curso, nivel } = argumentos;
    let sql = `UPDATE estudiantes SET nombre='${nombre}', curso='${curso}', nivel=${nivel} WHERE rut='${rut}' RETURNING *`;
    let respuesta = await pool.query(sql);
    console.log(respuesta.rows);
}).help().argv;

// Función asíncrona para eliminar el registro de un estudiante de la base de datos.
yargs.command("eliminar", "Eliminar registro de estudiante",{
    rut:{
        describe: 'Identificación única del estudiante',
        demand: true,
        alias: 'r'
    }
}, async (argumentos) => {
    let { rut } = argumentos;
    let sql = `DELETE FROM estudiantes WHERE rut= '${rut}' RETURNING *`;
    let respuesta = await pool.query(sql);
    console.log(respuesta.rows);
}).help().argv;