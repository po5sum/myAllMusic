import { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { successToast, errorToast } from "../Utilities/Toast";
import './Card.css'

export default function EditArtist({ artist, updateArtist, countries}) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState(artist.name)
    const [debutYear, setDebutYear] = useState(artist.debutYear)
    const [imageURL, setImageURL] = useState(artist.imageURL)
    const [selectedCountry, setSelectedCountry] = useState(artist.country)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const years = _.range(476, new Date().getFullYear() + 1).reverse()

    const handleSubmit = (event) => {
        event.preventDefault()

        try{
            updateArtist({
            artistId: artist.artistId,
            name: name,
            debutYear: debutYear,
            imageURL: imageURL,
            country: selectedCountry
        })

        successToast('Artist successfully updated 😃')
        handleClose();
        }
        catch(error){
            errorToast('Error updating Artist 💔')
        }

        
    }
    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Edit Artist
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="modal-background">
                    <Modal.Title>Edit Artist</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-background">
                    <Form id="addmodal" onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required
                                value={name}
                                type="text"
                                onChange={(e) =>
                                    setName(e.target.value)} 
                                    className="form-option-style"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridImageURL">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control value={imageURL}
                                type="url"
                                onChange={(e) =>
                                    setImageURL(e.target.value)} 
                                    className="form-option-style"/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDebutYear">
                                <Form.Label>Debut Year</Form.Label>
                                <Form.Select required
                                    value={debutYear}
                                    onChange={(e) =>
                                        setDebutYear(e.target.value)}
                                        className="form-option-style">

                                    <option value="">Choose...</option>
                                    {years.map((year, i) => {
                                        return (
                                            <option key={i} value={year}>
                                                {year}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Select required
                                    value={selectedCountry}
                                    onChange={(e) =>
                                        setSelectedCountry(e.target.value)}
                                        className="form-option-style">

                                        <option value=""></option>
                                        {countries.map((country, i)=>{
                                            return(
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
                    <Button form="addmodal" variant="success" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}