import ArtistAlbumList from "../components/ArtistAlbumList";
import './Pages.css'
export default function ArtistAlbum(){

    return(
        <div className="pagestyle">
            <h1 className='page-header'>List of the Artist's Albums</h1>
            <h3 className="page-header">(You can't edit the Albums in this page, if you want to edit an Album's information, go to the Albums Page)</h3>
            <ArtistAlbumList />
        </div>
    )
}