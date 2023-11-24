import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const CreateBlog = () => {
    const URI = 'http://localhost:8000/blogs/'

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [entidad, setEntidad] = useState([])
    const [municipio, setMunicipio] = useState([])
    const [entidadSelected, setEntidadSelected] = useState('')
    const [municipioSelected, setMunicipioSelected] = useState('')
    const [selectedEntidad, setSelectedEntidad] = useState(null)

    const navigate = useNavigate();

    // Procedimiento guardar
    const store = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, {
                title: title,
                content: content,
                entidad: entidadSelected,  // Cambiado a "entidad"
                municipio: municipioSelected  // Cambiado a "municipio"
            });
            console.log(response.data)  // Puedes imprimir la respuesta del servidor si lo necesitas
            navigate('/')
        } catch (error) {
            console.error('Error creating blog:', error)
        }
        navigate('/')
    }

    // CARGAR ENTIDADES
    const entidades = async () => {
        try {
            const res = await axios.get(URI + 'entidades')
            setEntidad(res.data)
        } catch (error) {
            console.error('Error fetching entities:', error)
        }
    }

    // CARGAR MUNICIPIOS
    const municipiosId = async () => {
        try {
            if (selectedEntidad) {
                const res = await axios.get(URI + 'municipiosId/' + selectedEntidad)
                setMunicipio(res.data)
            } else {
                setMunicipio([])
            }
        } catch (error) {
            console.error('Error fetching municipalities:', error)
        }
    }

    // HANDLE SELECT ENTIDAD
    const handleSelectEntidad = (e) => {
        const idEntidad = e.target.value
        setSelectedEntidad(idEntidad)
        setEntidadSelected(e.target.value)
    }

    const handleMuniciioSelected = (e) => {
        setMunicipioSelected(e.target.value)
    }

    // EJECUCION DE ENTIDADES
    useEffect(() => {
        entidades()
    }, [])

    // EJECUCION DE MUNICIPIOS
    useEffect(() => {
        municipiosId();
    }, [selectedEntidad])

    return (

        <div>
            
            <h3>Create</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className=' mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className=' mb-3'>
                    <select onChange={handleSelectEntidad}>
                        <option value={entidadSelected}>ENTIDAD</option>
                        {entidad.map((enti) => (
                            <option name={enti.entidad} value={enti.id_entidad} key={enti.id_entidad}>
                                {enti.entidad}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=' mb-3'>
                    <select onChange={handleMuniciioSelected}>
                        <option value={municipioSelected}>MUNICIPIO</option>
                        {municipio.map((muni) => (
                            <option key={muni.id_municipio}>{muni.municipio}</option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='btn btn-primary'>
                    Send
                </button>
            </form>
        </div>
    )
}
