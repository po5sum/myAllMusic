package com.felix.myallmusic.businesslayer.artistalbum;

import com.felix.myallmusic.presentationlayer.artistalbum.ArtistAlbumsResponseDTO;

public interface ArtistAlbumsService {
    ArtistAlbumsResponseDTO getAllAlbumByArtistId(String artistId);
}
