import { useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap"
import ArtistCard from "./ArtistCard";

export default function AlbumArtistList({countries}){

    const { state } = useLocation();

    return(
        <Container fluid className="artistAlbum">
            <Row sm={2} lg={4} className='justify-content-evenly'>
                <ArtistCard artist={state.artist} showAllButtons={false}/>
            </Row>
        </Container>
    )
}