import { Container, Row } from "react-bootstrap"
import { useState, useEffect } from "react"
import AlbumCard from "./AlbumCard"
import AddAlbum from "./AddAlbum";
import { successToast, errorToast } from "../Utilities/Toast";
import './Card.css'

export default function AlbumList() {

    const [albums, setAlbums] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [artistOptions, setArtistOptions] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const artistResponse = await fetch("http://localhost:8080/api/v1/artists");
                const artists = await artistResponse.json();
                setArtistOptions(artists);

                const albumResponse = await fetch("http://localhost:8080/api/v1/albums");
                const albums = await albumResponse.json();
                setAlbums(albums);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            setIsLoading(false);
        }

        fetchData();
    }, []);

    function getAllAlbums() {
        (async () => {
            const albumReponse = await fetch("http://localhost:8080/api/v1/albums", {
                method: "GET"
            });

            const albums = await albumReponse.json()
            setAlbums(albums)
            setIsLoading(false)
        })();
    }

    if (isLoading) {
        return <div><h1 className="loading">Loading...</h1></div>
    }


    function addAlbum(title, coverURL, releaseYear, artistId) {
        console.log("AlbumList addAlbum")

        var albumRequestDTO = {
            title: title,
            coverURL: coverURL,
            releaseYear: releaseYear,
            artistId: artistId
        }

        fetch(`http://localhost:8080/api/v1/albums`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumRequestDTO)
        })
            .then(async response => {
                const isJson = response.headers
                    .get('Content-Type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("data is: " + data.title)

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log("post error occured");
                    return Promise.reject(error);
                }
                getAllAlbums()
            })
    }

    function updateAlbum(updatedAlbum) {
        console.log("AlbumList editAlbum")

        if (!updatedAlbum.artist || !updatedAlbum.artist.artistId) {
            console.error("Artist or Artist ID is missing");
            return;
        }

        var albumRequestDTO = {
            title: updatedAlbum.title,
            releaseYear: updatedAlbum.releaseYear,
            coverURL: updatedAlbum.coverURL,
            artistId: updatedAlbum.artist.artistId
        }
        fetch(`http://localhost:8080/api/v1/albums/${updatedAlbum.albumId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumRequestDTO)
        })
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("data is: " + data.title)

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log("post error occured");
                    return Promise.reject(error);
                }
                getAllAlbums()
            })
    }

    async function deleteAlbumHandler(albumId) {

        const response = await fetch(`http://localhost:8080/api/v1/albums/${albumId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
            .then(response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                if (response.status == 204) {
                    successToast('Album successfully deleted *Sniff* 💔')
                    getAllAlbums()
                }
                else{
                    errorToast('Failed to delete Album 💔')
                }
            })
            .catch(function (error) {
                console.log("An error has occured")
                errorToast('Failed to delete Album 💔')
                return Promise.reject(error)
            })
    }



    return (
        <Container fluid className="bg-dark">
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {albums && albums.map((album) =>
                    <AlbumCard key={album.albumId}
                        album={album}
                        updateAlbum={updateAlbum}
                        onDeleteAlbumHandler={deleteAlbumHandler}
                        artistOptions={artistOptions}
                        showAllButtons={true}/>
                )}
                <AddAlbum addAlbum={addAlbum} />
            </Row>
        </Container>
    )
}