import { CardBody, Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap'
import EditAlbum from './EditAlbum'
import { Button } from 'react-bootstrap'
import './Card.css'

export default function AlbumCard({ album, updateAlbum, artistOptions, onDeleteAlbumHandler, showAllButtons }) {


    const onDelete = () => {
        onDeleteAlbumHandler(album.albumId)
    }
    return (

        /*<div className='p-3' type='button'>
            <Card>
                <LinkContainer to="/albumartist" state={album} >
                    <Card.Img src={album.coverURL} />
                </LinkContainer>
                <CardBody className="bg-secondary text-light">
                    <Card.Title> {album.title} </Card.Title>
                    <Card.Text>
                        <strong> Release Year: {album.releaseYear}</strong>
                        <br />
                        <strong>Artist: </strong> {album.artist.name}
                    </Card.Text>
                    {showAllButtons && (
                        <>
                            <EditAlbum album={album} updateAlbum={updateAlbum} artistOptions={artistOptions} />
                            <Button variant="danger" onClick={onDelete}>Delete</Button>
                        </>
                    )}

                </CardBody>
            </Card>
        </div>*/


        <div className='p-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', backgroundColor: '#343a40', color: 'white', borderRadius: '5px', margin: '2%' }}>
            <LinkContainer to="/albumartist" state={album} style={{ marginRight: '20px' }}>
                <img src={album.coverURL} alt="Album Cover" className='album-cover' />
            </LinkContainer>
            <div style={{ flex: 1, marginRight: '20px' }}>
                <div className='name-title'>{album.title}</div>
                <div>
                    <strong> Release Year: {album.releaseYear}</strong><br />
                    <strong>Artist: </strong> {album.artist.name}
                </div>
            </div>
            {showAllButtons && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <EditAlbum album={album} updateAlbum={updateAlbum} artistOptions={artistOptions} />
                    <Button variant="dark" onClick={onDelete} style={{ marginTop: '10px' }}>Delete Album</Button>
                </div>
            )}
        </div>
    )
}