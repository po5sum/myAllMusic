package com.felix.myallmusic.dataaccesslayer.album;

import com.felix.myallmusic.dataaccesslayer.album.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
    Album findAlbumByAlbumId(String albumId);

    List<Album> findAlbumByArtist_ArtistId(String artistId);
}
