import { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { successToast, errorToast } from "../Utilities/Toast";
import './Card.css'

export default function AddArtist({ addArtist }) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState(null)
    const [debutYear, setDebutYear] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const years = _.range(476, new Date().getFullYear() + 1).reverse()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const countryNames = data.map(country => country.name.common).sort();
                setCountries(countryNames);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        try{
            var url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
        if (event.target[1].value && event.target[1] !== "") {
            var url = event.target[1].value;
        }
        successToast('Artist sucessfully added 😃')
        addArtist(name, debutYear, selectedCountry, url)
        handleClose();
        }
        catch(error){
            errorToast('Error adding Artist 💔')
        }
        
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Add Artist
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="modal-background">
                    <Modal.Title>Add Artist</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-background">

                    <Form id="addmodal" onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Artist's name</Form.Label>
                            <Form.Control required
                                placeholder="Artist's name"
                                type="text"
                                onChange={(e) =>
                                    setName(e.target.value)} 
                                    className="form-option-style white-placeholder"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCoverURL">
                            <Form.Label>Image URL Of The Artist</Form.Label>
                            <Form.Control placeholder="https://..."
                                type="url"
                                onChange={(e) =>
                                    setImageURL(e.target.value)} 
                                    className="form-option-style white-placeholder"/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridReleaseYear">
                                <Form.Label>Debut Year of the Artist</Form.Label>
                                <Form.Select required
                                    onChange={(e) =>
                                        setDebutYear(e.target.value)}
                                        className="form-option-style">
                                    <option value="">Choose year...</option>
                                    {years.map((year, i) => {
                                        return (
                                            <option key={i} value={year}>
                                                {year}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridArtist">
                                <Form.Label>Artist's Country</Form.Label>
                                <Form.Select required
                                    defaultValue="Choose country..."
                                    onChange={handleCountryChange}
                                    className="form-option-style">
                                    <option value="">Choose country...</option>
                                    {countries.map((country, i) => {
                                        return (
                                            <option key={i} value={country}>
                                                {country}
                                            </option>
                                        )

                                    })}



                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-background">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="addmodal" variant="success" type="submit">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
