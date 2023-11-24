import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, getEntidad, getEntidades, getMunicipios, updateBlog } from '../controllers/AppController.js'

const router = express.Router()

router.get('/entidades', getEntidades)
router.get('/entidad/:id', getEntidad)
router.get('/municipiosId/:id_entidad', getMunicipios)
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.post('/', createBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router