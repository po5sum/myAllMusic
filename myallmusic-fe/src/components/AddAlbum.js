import { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import './Card.css'
import { successToast, errorToast } from "../Utilities/Toast";

export default function AddAlbum({addAlbum}){
    const [show, setShow] = useState(false);
    const [artistOptions, setArtistOptions] = useState(null);

    const[title, setTitle] = useState(null)
    const[releaseYear, setReleaseYear] = useState(null)
    const[coverURL, setCoverURL] = useState(null)
    const[artistName, setArtistName] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const years = _.range(1888, new Date().getFullYear() + 1).reverse()

    useEffect(() => {
        (async() => {
            const artistResponse = await fetch("http://localhost:8080/api/v1/artists",{
                method: "GET"
            });
            const artists = await artistResponse.json()
            console.log(artists)
            setArtistOptions(artists)
        })();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        try{
            var url = "https://banner2.cleanpng.com/20190419/itt/kisspng-portable-network-graphics-computer-icons-clip-art-ocm-epk-one-church-5cba0363cac613.0848359515556944358306.jpg"
        if(event.target[1].value && event.target[1] !== ""){
            var url = event.target[1].value;
        }

        var artist = artistOptions.find(artist => artist.name === artistName)

        addAlbum(title, url, releaseYear, artist.artistId)
        successToast('Album successfully added 😃');
        handleClose();
        }
        catch(error){
            errorToast('Error adding Album 💔')
        }

        
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Add Album
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="modal-background">
                    <Modal.Title>Add Album</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-background">
                    
                    <Form id="addmodal" onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required 
                                placeholder="Album Name" 
                                type="text"
                                onChange={(e) => 
                                setTitle(e.target.value)}
                                className="form-option-style white-placeholder"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCoverURL">
                            <Form.Label>Cover URL</Form.Label>
                            <Form.Control placeholder="https://" 
                                        type="url"
                                        onChange={(e) => 
                                        setCoverURL(e.target.value)}
                                        className="form-option-style white-placeholder"/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridReleaseYear">
                                <Form.Label>Release Year</Form.Label>
                                <Form.Select required 
                                    onChange={(e) => 
                                    setReleaseYear(e.target.value)}
                                    className="form-option-style ">
                                    <option value="">Choose...</option>
                                    {years.map((year, i) =>{
                                        return(
                                            <option key={i} value={year}>
                                                {year}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridArtist">
                                <Form.Label>Artist</Form.Label>
                                <Form.Select required 
                                    defaultValue="Choose..."
                                    onChange={(e) => 
                                    setArtistName(e.target.value)}
                                    className="form-option-style">
                                    <option value="">Choose...</option>
                                    {artistOptions && artistOptions.map((artist, i) => {
                                        return (
                                            <option key={i} value={artist.name}>
                                                {artist.name}
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
