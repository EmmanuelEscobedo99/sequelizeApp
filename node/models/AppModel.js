//importamos la conexion a la BD
import db from "../database/db.js"
//importamos sequelize
import { DataTypes, Sequelize } from "sequelize"

const blogModel = db.define('blogs', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    entidad: { type: DataTypes.STRING },
    municipio: { type: DataTypes.STRING },
})

const entidadModel = db.define('entidades', {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,


    id_entidad: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    entidad: { type: DataTypes.STRING },
})

const municipioModel = db.define('municipios', {
    createdAt: false,
    updatedAt: false,

    id_municipio: { type: DataTypes.INTEGER },
    id_entidad: { type: DataTypes.INTEGER },
    municipio: { type: DataTypes.STRING },
})

export { blogModel, entidadModel, municipioModel }