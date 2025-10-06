import AlbumArtistList from "../components/AlbumArtistList";
import './Pages.css'

export default function AlbumArtist(){
    return(
        <div className="pagestyle">
            <h1 className='page-header'>the Album's Artist</h1>
            <h3 className="page-header">(You can't edit the Artist in this page, if you want to edit an Artist's information, go to the Artists Page)</h3>
            <AlbumArtistList />
        </div>
    )
}