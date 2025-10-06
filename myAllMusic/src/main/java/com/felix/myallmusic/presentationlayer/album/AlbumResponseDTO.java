package com.felix.myallmusic.presentationlayer.album;

import com.felix.myallmusic.presentationlayer.artist.ArtistResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AlbumResponseDTO {

    private String albumId;
    private String title;
    private Integer releaseYear;
    private String coverURL;

    private ArtistResponseDTO artist;

}
