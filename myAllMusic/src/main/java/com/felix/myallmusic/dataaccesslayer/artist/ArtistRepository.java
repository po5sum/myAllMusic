package com.felix.myallmusic.dataaccesslayer.artist;

import com.felix.myallmusic.dataaccesslayer.artist.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
    Artist findArtistByArtistId(String artistId);
}
