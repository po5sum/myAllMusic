package com.felix.myallmusic.presentationlayer.album;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AlbumRequestDTO {

    private String title;
    private Integer releaseYear;
    private String coverURL;
    private String artistId;
}
