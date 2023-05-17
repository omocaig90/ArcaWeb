import axios from "axios";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { imbarcaAnimal } from "../redux/animaliSlice";

function FormImbarca() {
    const [formData, setFormData] = useState({ id: '', peso: '', specie: '' });
    const [speci, setSpeci] = useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const showError = () => {
        toast.error('Si è verificato un errore durante l\'operazione di imbarca.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    const callRestServiceSpeci = async () => {

        const url = 'http://localhost:8080/arca/rest/animale/speci';

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const actionResult = await dispatch(imbarcaAnimal(formData));
        const isRejected = imbarcaAnimal.rejected.match(actionResult);
        if (isRejected) {
            showError();

        } else {
            navigate('/home');
        }
    };



    useEffect(() => {
        callRestServiceSpeci();
    }, []);

    return (
        <>
            <Navbar />
            <center>
                <div className="App">
                    <ToastContainer />
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