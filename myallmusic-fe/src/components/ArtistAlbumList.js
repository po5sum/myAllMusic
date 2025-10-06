import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, Row } from "react-bootstrap"
import AlbumCard from './AlbumCard'

export default function ArtistAlbumList(){

    const { state } = useLocation()

    const [albums, setAlbums] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        (async () => {
            const response = await fetch(`http://localhost:8080/api/v1/artists/${state.artistId}/albums`,{
                    method: "GET" 
                });

            const result = await response.json()
            const albums = result.albums
            setAlbums(albums)
            setIsLoading(false)

        })();
    }, []);

    if (isLoading) {
        return <div><p>Loading...</p></div>
    }


    return (
        <Container fluid className="artistAlbum">
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {albums && albums.map((album) =>
                    <AlbumCard key={album.id} album={album} showAllButtons={false}/>
                )}
            </Row>
        </Container>
    )
}