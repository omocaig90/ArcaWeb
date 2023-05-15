import axios from "axios";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function FormSbarca() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ id: '' });
    const [showToast, setShowToast] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        callRestServiceSbarca();
    };

    const showError = () => {
        toast.error('Si è verificato un errore durante l\'operazione di sbarca.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => setShowToast(false)
        });
      }

      useEffect(() => {
        if (showToast){
            showError();
        }

    }, [showToast]);


    const callRestServiceSbarca = async () => {
        const url = '/arca/rest/animale/sbarca';
        const data = { id: formData.id }
        try {
            const response = await axios({
                method: 'DELETE',
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            navigate('/home')
            console.log('Risposta', response.data);
        }
        catch (error) {
            setShowToast(true)
            console.error(formData)
            console.error('si è verificato un errore')
        }
    };

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
                            <label for="id" class="form-label">ID</label>
                            <input type="number" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
                        </div>
                        <button type="submit" class="btn btn-primary" style={{ backgroundColor: '#87CEFA' }}>Invia</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default FormSbarca;