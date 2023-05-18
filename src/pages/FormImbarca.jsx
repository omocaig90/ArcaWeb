import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSpeci, imbarcaAnimal } from "../redux/animaliSlice";


function FormImbarca() {
    const [formData, setFormData] = useState({ id: '', peso: '', specie: '' });

    const speci = useSelector(state => state.animali.speci)

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const showError = () => {
        toast.error(
            <div>
                Si è verificato un errore!!!<br />
                Controlla di non imbarcare un animale già imbarcato<br />
                o un animale già presente come specie in coppia
            </div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
    }

    const showSuccess = () => {
        toast.success('Imbarco completato con successo!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.id || !formData.peso || !formData.specie || formData.specie === "default") {
            toast.error('Per favore, riempi tutti i campi.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
        const actionResult = await dispatch(imbarcaAnimal(formData));
        const isRejected = imbarcaAnimal.rejected.match(actionResult);
        if (isRejected) {
            showError();

        } else {
            showSuccess();
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
    };



    useEffect(() => {
        dispatch(getSpeci());
    }, [dispatch]);

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
                            <label htmlFor="id" className="form-label">ID</label>
                            <input type="number" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="peso" className="form-label">Peso</label>
                            <input type="number" className="form-control" id="peso" name="peso" value={formData.peso} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="specie" className="form-label">Specie</label>
                            <select className="form-select" id="specie" name="specie" value={formData.specie} onChange={handleChange} >
                                <option value="default">Scegli una specie</option>
                                {speci && speci.map((specie, index) => (
                                    <option key={index} value={specie}>{specie}</option>

                                ))}
                            </select>

                        </div>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#87CEFA' }}>Invia</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default FormImbarca;