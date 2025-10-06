import AlbumList from "../components/AlbumList";

export default function AlbumsPage() {
    return (
        <div className="pagestyle">
            <h2 className="page-header">Click on the Album's cover to see the Album's Artist</h2>
            <AlbumList />
        </div>
    );
}