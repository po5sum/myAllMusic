import { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash'
import './Card.css'
import { successToast, errorToast } from "../Utilities/Toast";

export default function EditAlbum({album, updateAlbum, artistOptions}){
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(album.title)
    const [coverURL, setCoverURL] = useState(album.coverURL)
    const [releaseYear, setReleaseYear] = useState(album.releaseYear)
    const [artistName, setArtistName] = useState (album.artist.name)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const years = _.range(1888, new Date().getFullYear() + 1).reverse()

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            var artist = artistOptions.find(artist => artist.name === artistName)

        updateAlbum({
            albumId: album.albumId,
            title: title,
            releaseYear: releaseYear,
            coverURL: coverURL,
            artist
        })
        successToast('Album successfully updated 😃');
        handleClose();
        }
        catch(error){
            errorToast('Error updating album 💔');
        }
        
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Edit Album
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                
            >
                <Modal.Header className="modal-background">
                    <Modal.Title>Edit Album</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-background">
                    <Form id="addmodal" onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required 
                                        value={title}
                                        type="text" 
                                        onChange={(e) => 
                                        setTitle(e.target.value)}
                                        className="form-option-style"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCoverURL">
                            <Form.Label>Cover URL</Form.Label>
                            <Form.Control value={coverURL}
                                        type="url" 
                                        onChange={(e) => 
                                        setCoverURL(e.target.value)}
                                        className="form-option-style"/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridReleaseYear">
                                <Form.Label>Release Year</Form.Label>
                                <Form.Select required 
                                    value={releaseYear}
                                    onChange={(e) => 
                                    setReleaseYear(e.target.value)}
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

                            <Form.Group as={Col} controlId="formGridArtist">
                                <Form.Label>Artist</Form.Label>
                                <Form.Select required 
                                value={artistName}
                                onChange={(e) => 
                                setArtistName(e.target.value)}
                                className="form-option-style">

                                    {/* <option value="">Choose...</option> */}
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
                    <Button form="addmodal" variant="success" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}