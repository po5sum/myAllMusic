package com.felix.myallmusic.businesslayer.artist;

import com.felix.myallmusic.presentationlayer.artist.ArtistRequestDTO;
import com.felix.myallmusic.presentationlayer.artist.ArtistResponseDTO;

import java.util.List;

public interface ArtistService {
    List<ArtistResponseDTO> getAllArtist();

    ArtistResponseDTO getArtistById(String artistId);

    ArtistResponseDTO addArtist(ArtistRequestDTO artistRequestDTO);

    ArtistResponseDTO updateArtist(ArtistRequestDTO artistRequestDTO, String artistId);

    void deleteArtist(String artistId);
}
