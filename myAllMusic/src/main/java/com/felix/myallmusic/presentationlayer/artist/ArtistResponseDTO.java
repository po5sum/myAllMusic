package com.felix.myallmusic.presentationlayer.artist;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArtistResponseDTO {

    private String artistId;
    private String name;
    private String debutYear;
    private String country;
    private String imageURL;
}
