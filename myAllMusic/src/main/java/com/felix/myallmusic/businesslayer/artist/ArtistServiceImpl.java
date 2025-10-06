package com.felix.myallmusic.businesslayer.artist;

import com.felix.myallmusic.dataaccesslayer.artist.Artist;
import com.felix.myallmusic.dataaccesslayer.artist.ArtistRepository;
import com.felix.myallmusic.presentationlayer.artist.ArtistRequestDTO;
import com.felix.myallmusic.presentationlayer.artist.ArtistResponseDTO;
import com.felix.myallmusic.utils.Exception.InUseException;
import com.felix.myallmusic.utils.Exception.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ArtistServiceImpl implements ArtistService {
    private ArtistRepository artistRepository;

    public ArtistServiceImpl(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }
    @Override
    public List<ArtistResponseDTO> getAllArtist(){
        List<Artist> artistEntites = artistRepository.findAll();
        List<ArtistResponseDTO> artistResponseDTOList = new ArrayList<>();
        for(Artist artist: artistEntites){
            ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
            BeanUtils.copyProperties(artist, artistResponseDTO);

            artistResponseDTOList.add(artistResponseDTO);
        }
        return artistResponseDTOList;
    }

    @Override
    public ArtistResponseDTO getArtistById(String artistId){

        Artist artist  = artistRepository.findArtistByArtistId(artistId);

        if(artist == null){
            throw new NotFoundException("Unknown artist id: " + artistId);
        }

        ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
        BeanUtils.copyProperties(artist, artistResponseDTO);

        return artistResponseDTO;
    }
    @Override
    public ArtistResponseDTO addArtist(ArtistRequestDTO artistRequestDTO){
        Artist artist = new Artist();
        BeanUtils.copyProperties(artistRequestDTO, artist);
        artist.setArtistId(UUID.randomUUID().toString());

        Artist savedArtist =  artistRepository.save(artist);
        ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
        BeanUtils.copyProperties(savedArtist, artistResponseDTO);

        return artistResponseDTO;
    }

    @Override
    public ArtistResponseDTO updateArtist(ArtistRequestDTO artistRequestDTO, String artistId){
        Artist foundArtist = artistRepository.findArtistByArtistId(artistId);

        if(foundArtist == null){
            throw new NotFoundException("Unknown artist id:" + artistId);
        }

        Artist artist = new Artist();
        BeanUtils.copyProperties(artistRequestDTO, artist);
        artist.setArtistId(foundArtist.getArtistId());
        artist.setId(foundArtist.getId());

        Artist savedArtist = artistRepository.save(artist);

        ArtistResponseDTO artistResponseDTO = new ArtistResponseDTO();
        BeanUtils.copyProperties(savedArtist, artistResponseDTO);

        return artistResponseDTO;
    }
    @Override
    public void deleteArtist(String artistId){
        Artist foundArtist = artistRepository.findArtistByArtistId(artistId);

        if(foundArtist == null){
            throw new NotFoundException("Unknown artist id:" + artistId);
        }
        try{
            artistRepository.delete(foundArtist);
        }
        catch(DataIntegrityViolationException ex){
            throw new InUseException("cannot delete director with directorId: " + artistId
                    + " as it is currently assigned to one or more movies.");
        }

    }
}
