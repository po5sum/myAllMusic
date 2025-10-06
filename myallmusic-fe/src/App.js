import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import AlbumsPage from './pages/AlbumsPage';
import ArtistsPage from './pages/ArtistsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavBar from './components/MyNavBar';
import AlbumArtist from './pages/AlbumArtist';
import ArtistAlbum from './pages/ArtistAlbum';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
      <Router>
        <MyNavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/albumartist" element={<AlbumArtist />} />
          <Route path="/artistalbum" element={<ArtistAlbum />} />
        </Routes>
        <ToastContainer />
      </Router>
      
  );
}