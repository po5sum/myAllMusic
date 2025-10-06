import { CardBody } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap'
import EditArtist from './EditArtist'
import { Button } from 'react-bootstrap'
import './Card.css'

export default function ArtistCard({ artist, updateArtist, countries, onDeleteArtistHandler, showAllButtons }) {

    const onDeleteArtist = () => {
        onDeleteArtistHandler(artist.artistId)
    }
    return (

        /*<div className='p-3' type="button">
            <Card>
                <LinkContainer to="/artistalbum" state={{ artistId: artist.artistId }}>
                    <Card.Img src={artist.imageURL} />
                </LinkContainer>
                <CardBody className='bg-secondary text-light'>
                    <Card.Title>{artist.name}</Card.Title>
                    <Card.Text>
                        <strong>Country: </strong> {artist.country}
                        <br />
                        <strong>Debut Year:</strong> {artist.debutYear}
                    </Card.Text>
                    {showAllButtons && (
                        <>
                            <EditArtist artist={artist} updateArtist={updateArtist} countries={countries} />
                            <Button variant="danger" onClick={onDeleteArtist}>Delete</Button>
                        </>
                    )}

                </CardBody>
            </Card>
        </div>*/

        <div className='p-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', backgroundColor: '#343a40', color: 'white', borderRadius: '5px', margin: '2%' }}>
            <LinkContainer to="/artistalbum" state={{ artistId: artist.artistId }} style={{ marginRight: '20px' }}>
                <img src={artist.imageURL} alt="Artist Image" className='album-cover' />
            </LinkContainer>
            <div style={{ flex: 1, marginRight: '20px' }}>
                <div className='name-title'>{artist.name}</div>
                <div>
                    <strong>Country: </strong> {artist.country}
                    <br />
                    <strong>Debut Year:</strong> {artist.debutYear}
                </div>
            </div>
            {showAllButtons && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <EditArtist artist={artist} updateArtist={updateArtist} countries={countries} />
                    <Button variant="dark" onClick={onDeleteArtist} style={{ marginTop: '10px' }}>Delete Artist</Button>
                </div>
            )}
        </div>

    )
}