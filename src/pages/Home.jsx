import axios from 'axios'
import React, { useState, useEffect } from 'react';
//import { Form } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Home = () => {
    const [jsonData, setJsonData] = useState(null);
    const [updatingAnimal, setUpdatingAnimal] = useState(null);
    const [newPeso, setNewPeso] = useState('');
    const [showToast, setShowToast] = useState(false);
    
    

    const callRestService = async () => {

        const url = '/arca/rest/animale/lista';

        try {
            const response = await axios.get(url);
            setJsonData(response.data)
        }
        catch (error) {
            console.error('si è verificato un errore')

        }
    }

    const handleDelete = async (id) => {
        const url = '/arca/rest/animale/sbarca';
        const data = { id: id }
        try {
            const response = await axios({
                method: 'DELETE',
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            //setJsonData(jsonData.filter(animal => animal.id !== id));
            callRestService();
            console.log(response);
        }
        catch (error) {

            console.error('si è verificato un errore')
        }
    };

    const handleCancel = () => {
        setUpdatingAnimal(null);
        setNewPeso('');
        callRestService();
    }



    const handleUpdate = (id, peso) => {
        setUpdatingAnimal(id);
        setNewPeso(peso);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'put',
                url: '/arca/rest/animale/update',
                data: {
                    id: updatingAnimal,
                    peso: newPeso
                }
            });
            setUpdatingAnimal(null);
            setNewPeso('');
            callRestService();

        } catch (error) {
            setShowToast(true)
            console.error("errore")
        }

    }



    useEffect(() => {
        callRestService();
    }, []);

    return (
        <>
            <Navbar />

            <div className={`toast position-fixed top-0 end-0 m-3 bg-danger text-white ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" >
                <div className="toast-header">
                    <strong className="me-auto">ERRORE</strong>
                    <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                </div>
                <div className="toast-body">
                    Si è verificato un errore durante l'operazione. Controlla di aver inserito un peso
                </div>

            </div>

            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Peso</th>
                            <th>Specie</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData && (jsonData.map((animal) => {
                            return (
                                <tr key={animal.id} className={updatingAnimal === animal.id ? 'table-info' : ''}>
                                    <td>{animal.id}</td>
                                    <td>{animal.peso}</td>
                                    <td>{animal.specie}</td>
                                    <td>
                                        <button className='btn btn-primary me-2' style={{ backgroundColor: '#87CEFA' }} onClick={() => handleUpdate(animal.id, animal.peso, animal.specie)}>
                                            <i className='bi bi-arrow-repeat'></i>
                                        </button>
                                        <button className='btn btn-danger' style={{ backgroundColor: '#ff7f7f' }} onClick={() => handleDelete(animal.id)}>
                                            <i className='bi bi-trash-fill'></i>
                                        </button>
                                    </td>
                                </tr>);
                        }))}
                    </tbody>
                </table>
                {updatingAnimal && (
                    <div style={{ maxWidth: '300px', margin: 'auto' }}>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <strong>
                                    <label htmlFor='newPeso'>Nuovo Peso:&nbsp;</label> </strong>
                                <input type='number' id='newPeso' className='form-control' value={newPeso} onChange={(e) => setNewPeso(e.target.value)} />
                            </div>
                            <div className='d-grid gap-2'>
                                <button type='submit' className="btn btn-primary my-2" style={{ backgroundColor: '#87CEFA' }}> Aggiorna</button>
                                <button type='button' className="btn btn-secondary my-2" style={{ backgroundColor: '#ff7f7f' }} onClick={handleCancel}>Cancella</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );

}




export default Home;