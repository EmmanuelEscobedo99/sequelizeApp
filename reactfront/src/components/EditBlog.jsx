import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const EditBlog = () => {
    const URI = 'http://localhost:8000/blogs/';

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [entidad, setEntidad] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [entidades, setEntidades] = useState([]);
    const [cargarEntidad, setCargarEntidad] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedEntidad, setSelectedEntidad] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(URI + id, {
                title: title,
                content: content,
                entidad: selectedEntidad,
                municipio: municipio
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const getBlogById = async () => {
        try {
            const res = await axios.get(URI + id);
            setTitle(res.data.title);
            setContent(res.data.content);
            setEntidad(res.data.entidad);  // Asegúrate de que res.data.entidad contenga el objeto completo de la entidad
            setMunicipio(res.data.municipio);
            setSelectedEntidad(res.data.entidad.id_entidad);  // Asegúrate de que res.data.entidad.id_entidad sea el ID de la entidad
        } catch (error) {
            console.error('Error fetching blog by ID:', error);
        }
    };

    const getEntidades = async () => {
        try {
            const res = await axios.get(URI + 'entidades');
            setEntidades(res.data);
        } catch (error) {
            console.error('Error fetching entities:', error);
        }
    };

    const getEntidad = async () => {
        try {
            const res = await axios.get(URI + "entidad/" + id);
            setCargarEntidad(res.data);
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    const getMunicipiosId = async () => {
        try {
            if (selectedEntidad) {
                const res = await axios.get(URI + 'municipiosId/' + selectedEntidad);
                setMunicipios(res.data);
            } else {
                setMunicipios([]);
            }
        } catch (error) {
            console.error('Error fetching municipalities:', error);
        }
    };

    const handleSelectEntidad = (e) => {
        const idEntidad = e.target.value;
        setSelectedEntidad(idEntidad);
    };

    const handleSelectMunicipio = (e) => {
        const selectedMunicipio = e.target.value;
        setMunicipio(selectedMunicipio);
    };

    useEffect(() => {
        getBlogById();
        getEntidades();
        getEntidad();
    }, []);

    useEffect(() => {
        getMunicipiosId();
    }, [selectedEntidad]);

    //Mapeo de datos entidades y municipios
    let entis
    cargarEntidad.map(enti => {
        entis = enti.entidad
    })

    let munis
    cargarEntidad.map(muni => {
        munis = muni.municipio
    })

    return (
        <div>
            <h3>Edit</h3>
            <form onSubmit={update}>
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
                    <label className='form-label'>Entidad</label>
                    <select onChange={handleSelectEntidad} value={selectedEntidad}>
                        <option value=''>{entis}</option>
                        {entidades.map((enti) => (
                            <option value={enti.id_entidad} key={enti.id_entidad}>
                                {enti.entidad}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=' mb-3'>
                    <label className='form-label'>Municipio</label>
                    <select onChange={handleSelectMunicipio} value={municipio}>
                        <option value=''>{munis}</option>
                        {municipios.map((muni) => (
                            <option key={muni.id_municipio}>{muni.municipio}</option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='btn btn-primary'>
                    Update
                </button>
            </form>
        </div>
    );
};
