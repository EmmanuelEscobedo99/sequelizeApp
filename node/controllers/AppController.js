//importamos el Modelo
import { blogModel, entidadModel, municipioModel } from "../models/AppModel.js"

//** Metodos para el CRUD **/

//Mostrar todos los registros
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.findAll()
        res.json(blogs)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar un registro
export const getBlog = async (req, res) => {
    try {
        const blog = await blogModel.findAll({
            where: { id: req.params.id }
        })
        res.json(blog[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear un registro
export const createBlog = async (req, res) => {
    try {
        const { title, content, entidad, municipio } = req.body

        // Buscar el nombre de la entidad basado en el ID
        const entidadObject = await entidadModel.findByPk(entidad, { attributes: ['id_entidad', 'entidad'] });

        if (!entidadObject) {
            return res.status(404).json({ message: 'Entidad no encontrada' })
        }

        // Crear el blog en la base de datos
        await blogModel.create({
            title: title,
            content: content,
            entidad: entidadObject.entidad,
            municipio: municipio
        })

        res.json({ message: '¡Registro creado correctamente!' })
    } catch (error) {
        console.error('Error al crear el blog:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

//Actualizar un registro
// Actualizar un registro
export const updateBlog = async (req, res) => {
    try {
        const { title, content, entidad, municipio } = req.body;
        const blogId = req.params.id;

        // Check if the blog with the given ID exists
        const existingBlog = await blogModel.findByPk(blogId);

        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the entidad provided exists
        const entidadObject = await entidadModel.findByPk(entidad, { attributes: ['id_entidad', 'entidad'] });

        if (!entidadObject) {
            return res.status(404).json({ message: 'Entidad not found' });
        }

        // Update the blog in the database
        await blogModel.update(
            {
                title: title,
                content: content,
                entidad: entidadObject.entidad,
                municipio: municipio
            },
            {
                where: { id: blogId }
            }
        );

        res.json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error updating the blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Eliminar un registro
export const deleteBlog = async (req, res) => {
    try {
        await blogModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// ENTIDADES

//Mostrar entidades en el select Entidad
export const getEntidades = async (req, res) => {
    try {
        const entidades = await entidadModel.findAll({
            attributes: ['id_entidad', 'entidad']
        })
        res.json(entidades)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar entidad que se guardo en la bd para poder editar
export const getEntidad = async (req, res) => {
    try {
        const entidad = await blogModel.findAll({
            where: { id: req.params.id }
        })
        res.json(entidad)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//MUNICIPIOS

//Mostrar municipio en relacion a entidad
export const getMunicipios = async (req, res) => {
    try {
        const municipiosId = await municipioModel.findAll({
            where: { id_entidad: req.params.id_entidad },
            attributes: ['id_municipio', 'id_entidad', 'municipio']
        })
        res.json(municipiosId)
    } catch (error) {
        res.json({ message: error.message })
    }
}
