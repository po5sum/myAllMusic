package com.felix.myallmusic.businesslayer.album;

import com.felix.myallmusic.presentationlayer.album.AlbumRequestDTO;
import com.felix.myallmusic.presentationlayer.album.AlbumResponseDTO;

import java.util.List;

public interface AlbumService {

    List<AlbumResponseDTO> getAllAlbums();

    AlbumResponseDTO getAlbumById(String albumId);

    AlbumResponseDTO addAlbum(AlbumRequestDTO albumRequestDTO);

    AlbumResponseDTO updateAlbum(AlbumRequestDTO albumRequestDTO, String albumId);

    void deleteAlbum(String albumId);
}
