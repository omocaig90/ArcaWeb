
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { sbarcaAnimal } from "../redux/animaliSlice";


function FormSbarca() {
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ id: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.id) {
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
        const actionResult = await dispatch(sbarcaAnimal(formData));
        const isRejected = sbarcaAnimal.rejected.match(actionResult);
        if (isRejected) {
            showError();
        } else {
            showSuccess();
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
    };

    const showError = () => {
        toast.error('Si è verificato un errore, l\'animale non è presente sull\'arca', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    const showSuccess = () => {
        toast.success('Sbarco completato con successo!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }






    return (
        <>
            <Navbar />
            <div className="App">
                <ToastContainer />
            </div>
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <legend></legend>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">ID</label>
                            <input type="number" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#87CEFA' }}>Invia</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default FormSbarca;