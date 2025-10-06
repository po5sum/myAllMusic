import { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import ArtistCard from "./ArtistCard";
import AddArtist from "./AddArtist";
import './Card.css'
import { successToast, errorToast } from "../Utilities/Toast";

export default function ArtistList() {

    const [artists, setArtists] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/artists");
                const artists = await response.json()
                setArtists(artists)

                const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
                const countriesData = await countriesResponse.json();
                const countryNames = countriesData.map(country => country.name.common).sort();
                setCountries(countryNames);
            }
            catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    function getAllArtists() {
        (async () => {
            const artistResponse = await fetch("http://localhost:8080/api/v1/artists", {
                method: "GET"
            });
            const artists = await artistResponse.json()
            setArtists(artists)
            setIsLoading(false)
        })();
    }

    if (isLoading) {
        return <div><h1 className="loading">Loading...</h1></div>
    }

    function addArtist(name, debutYear, country, imageURL) {
        console.log("ArtistList addArtist")

        var artistRequestDTO = {
            name: name,
            debutYear: debutYear,
            country: country,
            imageURL: imageURL
        }
        fetch(`http://localhost:8080/api/v1/artists`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistRequestDTO)
        })
            .then(async response => {
                const isJson = response.headers.get('Content-Type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("data is: " + data.title)

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log("post error occured");
                    return Promise.reject(error);
                }
                getAllArtists()
            })
    }

    function updateArtist(updatedArtist) {
        console.log("ArtistList editArtist")

        var artistRequestDTO = {
            name: updatedArtist.name,
            debutYear: updatedArtist.debutYear,
            country: updatedArtist.country,
            imageURL: updatedArtist.imageURL
        }
        fetch(`http://localhost:8080/api/v1/artists/${updatedArtist.artistId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistRequestDTO)
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
                getAllArtists()
            })
    }


    async function deleteArtistHandler(artistId) {

        const response = await fetch(`http://localhost:8080/api/v1/artists/${artistId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
            .then(response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                if (response.status == 204) {
                    successToast('Artist successfully deleted *Sniff* 💔')
                    getAllArtists()
                }
                else{
                    errorToast('Failed to delete Artist 💔')
                }
            })
            .catch(function (error) {
                console.log("An error has occured")
                errorToast('Error deleting Artist 💔')
                return Promise.reject(error)
            })
    }


    return (
        <Container fluid> 
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {artists && artists.map((artist) =>
                    <ArtistCard key={artist.artistId}
                        artist={artist}
                        updateArtist={updateArtist}
                        onDeleteArtistHandler={deleteArtistHandler}
                        countries={countries}
                        showAllButtons={true}/>
                )}
                <AddArtist addArtist={addArtist} />
            </Row>
        </Container>
    )
}