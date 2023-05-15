import axios from "axios";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';



function FormImbarca() {
    const [formData, setFormData] = useState({ id: '', peso: '', specie: '' });
    const [showToast, setShowToast] = useState(false);
    const [speci, setSpeci] = useState(null);
    //const [timeoutId, setTimeoutId] = useState(null);

    // const showToastWithTimeout = (visible) => {
    //     if (visible) {
    //         setShowToast(true);
    //         const timer = setTimeout(() => {
    //             setShowToast(false);
    //         }, 10000); // Imposta il timeout a 10 secondi
    //         setTimeoutId(timer);
    //     } else {
    //         clearTimeout(timeoutId);
    //         setShowToast(false);
    //     }
    // };

    const navigate = useNavigate()

    const callRestServiceSpeci = async () => {

        const url = '/arca/rest/animale/speci';

        try {
            const response = await axios.get(url);
            setSpeci(response.data)
        }
        catch (error) {
            console.error('si è verificato un errore')

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        callRestServiceImbarca();
    };

    const callRestServiceImbarca = async () => {
        const url = '/arca/rest/animale/imbarca';
        try {
            const response = await axios.post(url, formData)
            console.log('Risposta', response.data);
            navigate('/home')

        }
        catch (error) {
            setShowToast(true)
            console.error(formData)
            console.error('si è verificato un errore')

        }


    };

    useEffect(() => {
        callRestServiceSpeci();
        let timer =null;
        if (showToast){
            timer=setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
        return ()=>{
            if(timer){
                clearTimeout(timer);
            }
        };

    }, [showToast]);

    return (
        <>
            <Navbar />
            <center>
                <div className={`toast position-fixed top-0 end-0 m-3 bg-danger text-white ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" >
                    <div className="toast-header">
                        <strong className="me-auto">ERRORE</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </div>
                    <div className="toast-body">
                        Si è verificato un errore durante l'operazione.
                    </div>

                </div>
            </center>
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <legend></legend>
                        <div className="mb-3">
                            <label for="id" class="form-label">ID</label>
                            <input type="number" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="peso" class="form-label">Peso</label>
                            <input type="number" className="form-control" id="peso" name="peso" value={formData.peso} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="specie" class="form-label">Specie</label>
                            <select class="form-select" id="specie" name="specie" value={formData.specie} onChange={handleChange} >
                                <option selected>Scegli una specie</option>
                                {speci && speci.map((specie, index) => (
                                    <option key={index} value={specie}>{specie}</option>

                                ))}
                            </select>

                        </div>
                        <button type="submit" class="btn btn-primary" style={{ backgroundColor: '#87CEFA' }}>Invia</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default FormImbarca;