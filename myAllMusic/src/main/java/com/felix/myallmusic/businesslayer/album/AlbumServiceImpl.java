package com.felix.myallmusic.businesslayer.album;

import com.felix.myallmusic.dataaccesslayer.artist.Artist;
import com.felix.myallmusic.dataaccesslayer.artist.ArtistRepository;
import com.felix.myallmusic.dataaccesslayer.album.Album;
import com.felix.myallmusic.dataaccesslayer.album.AlbumRepository;
import com.felix.myallmusic.presentationlayer.album.AlbumRequestDTO;
import com.felix.myallmusic.presentationlayer.album.AlbumResponseDTO;
import com.felix.myallmusic.presentationlayer.artist.ArtistResponseDTO;
import com.felix.myallmusic.utils.Exception.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AlbumServiceImpl implements AlbumService {

    private AlbumRepository albumRepository;

    private ArtistRepository artistRepository;

    public AlbumServiceImpl(AlbumRepository albumRepository, ArtistRepository artistRepository) {
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
    }

    @Override
    public List<AlbumResponseDTO> getAllAlbums(){
        List<Album> albumEntities = albumRepository.findAll();
        List<AlbumResponseDTO> albumResponseDTOList = new ArrayList<>();

        for(Album album: albumEntities){
            AlbumResponseDTO albumResponseDTO = new AlbumResponseDTO();
            BeanUtils.copyProperties(album, albumResponseDTO);

            ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
            BeanUtils.copyProperties(album.getArtist(), artistResponseDTO);
            albumResponseDTO.setArtist(artistResponseDTO);
            albumResponseDTOList.add(albumResponseDTO);
        }
        return albumResponseDTOList;

    }
    @Override
    public AlbumResponseDTO getAlbumById(String albumId){

        Album album = albumRepository.findAlbumByAlbumId(albumId);

        if(album == null){
            throw new NotFoundException("Unknown Album Id: " + albumId);
        }

        AlbumResponseDTO albumResponseDTO = new AlbumResponseDTO();
        BeanUtils.copyProperties(album, albumResponseDTO);

        ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
        BeanUtils.copyProperties(album.getArtist(), artistResponseDTO);
        albumResponseDTO.setArtist(artistResponseDTO);

        return albumResponseDTO;
    }

    @Override
    public AlbumResponseDTO addAlbum(AlbumRequestDTO albumRequestDTO){
        Artist foundArtist = artistRepository.findArtistByArtistId(albumRequestDTO.getArtistId());

        if(foundArtist == null){
            throw new NotFoundException("Unknown artist id: " + albumRequestDTO.getArtistId());
        }

        Album album = new Album();
        BeanUtils.copyProperties(albumRequestDTO, album);
        album.setAlbumId(UUID.randomUUID().toString());

        album.setArtist(foundArtist);

        Album savedAlbum = albumRepository.save(album);

        AlbumResponseDTO albumResponseDTO = new AlbumResponseDTO();
        BeanUtils.copyProperties(savedAlbum, albumResponseDTO);

        ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
        BeanUtils.copyProperties(savedAlbum.getArtist(), artistResponseDTO);

        albumResponseDTO.setArtist(artistResponseDTO);

        return albumResponseDTO;
    }

    @Override
    public AlbumResponseDTO updateAlbum(AlbumRequestDTO albumRequestDTO, String albumId){
        Album foundAlbum = albumRepository.findAlbumByAlbumId(albumId);
        Artist foundArtist = artistRepository.findArtistByArtistId(albumRequestDTO.getArtistId());
        if(foundAlbum == null){
            throw new NotFoundException("Unknown album id: " + albumId);
        }
        if(foundArtist == null){
            throw new NotFoundException("unknown artist id: " + foundArtist.getArtistId());
        }

        Album updateAlbum = new Album();

        BeanUtils.copyProperties(albumRequestDTO, updateAlbum);
        updateAlbum.setAlbumId(albumId);
        updateAlbum.setId(foundAlbum.getId());
        updateAlbum.setArtist(foundArtist);

        Album savedAlbum = albumRepository.save(updateAlbum);

        AlbumResponseDTO albumResponseDTO = new AlbumResponseDTO();
        BeanUtils.copyProperties(savedAlbum, albumResponseDTO);

        ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
        BeanUtils.copyProperties(foundArtist, artistResponseDTO);
        albumResponseDTO.setArtist(artistResponseDTO);

        return albumResponseDTO;
    }

    @Override
    public void deleteAlbum(String albumId){
        Album foundAlbum = albumRepository.findAlbumByAlbumId(albumId);

        if(foundAlbum == null){
            throw new NotFoundException("Unknown album id: " + albumId);
        }

        albumRepository.delete(foundAlbum);
    }
}
