import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimali, sbarcaAnimal } from '../redux/animaliSlice';
import { aggiornaPeso } from '../redux/animaliSlice';


const Home = () => {
    const [updatingAnimal, setUpdatingAnimal] = useState(null);
    const [newPeso, setNewPeso] = useState('');
    const [showToast, setShowToast] = useState(false);

    const animali = useSelector(state => state.animali.entities)


    const dispatch = useDispatch();


    const handleDelete = async (id) => {
        console.log(id)
        const actionResult = await dispatch(sbarcaAnimal({ id: id }));
        const isRejected = sbarcaAnimal.rejected.match(actionResult);
        if (isRejected) {
            console.log("niente sbarco")
        }
    };


    const handleCancel = () => {
        setUpdatingAnimal(null);
        setNewPeso('');

    }



    const handleUpdate = (id, peso) => {
        setUpdatingAnimal(id);
        setNewPeso(peso);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            id: updatingAnimal,
            peso: newPeso
        };
        const actionResult = await dispatch(aggiornaPeso(formData));
        const isRejected = aggiornaPeso.rejected.match(actionResult);
        if (isRejected) {
            console.log("niente update")
            setShowToast(true);
        } else {
            setUpdatingAnimal(null);
            setNewPeso('');
        }

    }



    useEffect(() => {
        dispatch(getAnimali());
    },);

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
                        {animali && Array.isArray(animali) && (animali.map((animal) => {
                            return (
                                <tr key={animal.id} className={updatingAnimal === animal.id ? 'table-info' : ''}>
                                    <td>{animal.id}</td>
                                    <td>{animal.peso}</td>
                                    <td>{animal.specie}</td>
                                    <td>
                                        <button className='btn btn-primary me-2' style={{ backgroundColor: '#87CEFA' }} onClick={() => handleUpdate(animal.id, animal.peso, animal.specie)}>
                                            <i className='bi bi-pencil-fill'></i>
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