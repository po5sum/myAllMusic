package com.felix.myallmusic.presentationlayer.artistalbum;

import com.felix.myallmusic.presentationlayer.album.AlbumResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ArtistAlbumsResponseDTO {

    private String artistId;
    private String name;
    private String debutYear;
    private String country;
    private String imageURL;
    private List<AlbumResponseDTO> albums;
}
