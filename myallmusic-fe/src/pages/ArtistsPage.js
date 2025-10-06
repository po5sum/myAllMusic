import ArtistList from "../components/ArtistList";

export default function ArtistsPage() {
  return (
    <div className="pagestyle">
      <h2 className="page-header">Click on the Artist's image to see all of their Albums</h2>
      <ArtistList />
    </div>
  );
}