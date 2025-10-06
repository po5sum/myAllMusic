package com.felix.myallmusic.businesslayer.artistalbum;

import com.felix.myallmusic.dataaccesslayer.artist.Artist;
import com.felix.myallmusic.dataaccesslayer.artist.ArtistRepository;
import com.felix.myallmusic.dataaccesslayer.album.Album;
import com.felix.myallmusic.dataaccesslayer.album.AlbumRepository;
import com.felix.myallmusic.presentationlayer.artistalbum.ArtistAlbumsResponseDTO;
import com.felix.myallmusic.presentationlayer.album.AlbumResponseDTO;
import com.felix.myallmusic.presentationlayer.artist.ArtistResponseDTO;
import com.felix.myallmusic.utils.Exception.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArtistAlbumsServiceImpl implements ArtistAlbumsService {

    private AlbumRepository albumRepository;
    private ArtistRepository artistRepository;

    public ArtistAlbumsServiceImpl(AlbumRepository albumRepository, ArtistRepository artistRepository) {
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
    }

    @Override
    public ArtistAlbumsResponseDTO getAllAlbumByArtistId(String artistId){
        Artist foundArtist = artistRepository.findArtistByArtistId(artistId);

        if(artistId == null){
            throw new NotFoundException("Unknown artist id: " + artistId);
        }
        ArtistAlbumsResponseDTO artistAlbumsResponseDTO = new ArtistAlbumsResponseDTO();
        BeanUtils.copyProperties(foundArtist, artistAlbumsResponseDTO);

        List<Album> albumList = albumRepository.findAlbumByArtist_ArtistId(artistId);

        List<AlbumResponseDTO> albumResponseDTOList = new ArrayList<>();

        for(Album album: albumList){
            AlbumResponseDTO albumResponseDTO = new AlbumResponseDTO();
            BeanUtils.copyProperties(album, albumResponseDTO);

            ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
            BeanUtils.copyProperties(album.getArtist(), artistResponseDTO);
            albumResponseDTO.setArtist(artistResponseDTO);
            albumResponseDTOList.add(albumResponseDTO);
        }
        artistAlbumsResponseDTO.setAlbums(albumResponseDTOList);
        return artistAlbumsResponseDTO;
    }
}
