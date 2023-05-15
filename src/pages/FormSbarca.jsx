import axios from "axios";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';


function FormSbarca() {
    const [formData, setFormData] = useState({ id: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        callRestServiceSbarca();
    };

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
            console.log('Risposta', response.data);
        }
        catch (error) {
            console.error(formData)
            console.error('si è verificato un errore')
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <legend></legend>
                    <div className="mb-3">
                        <label for="id" class="form-label">ID</label>
                        <input type="number" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
                    </div>
                    <button type="submit" class="btn btn-primary"style={{backgroundColor: '#87CEFA'}}>Invia</button>
                </form>
            </div>
            </div>

        </>
    );
}

export default FormSbarca;