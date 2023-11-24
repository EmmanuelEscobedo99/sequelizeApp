import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export const ShowBlogs = () => {

    const URI = 'http://localhost:8000/blogs/'
    const [blogs, setBlogs] = useState([])

    useEffect(() =>{
        getBlogs()
    }, [])

    //procedimiento para mostrar todos los blogs
    const getBlogs = async () => {
        const res = await axios.get(URI)
        setBlogs(res.data)
    }

     //procedimiento para eliminar todos los blogs
     const deleteBlogs = async (id) => {
        await axios.delete(`${URI}${id}`)
        getBlogs()
     }

  return (
    <div className = 'container'>
        <div className = 'row'>
            <div className = 'col'>
                <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className='fas fa-plus'></i></Link>
                <table className='table'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Entidad</th>
                            <th>Municipio</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map ((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                                <td>{blog.content}</td>
                                <td>{blog.entidad}</td>
                                <td>{blog.municipio}</td>
                                <td>
                                    <Link to={`/edit/${blog.id}`} className='btn btn-info' style={{marginRight:"10px"}}><i className='fas fa-edit'></i></Link>
                                    <button onClick={() => deleteBlogs(blog.id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
