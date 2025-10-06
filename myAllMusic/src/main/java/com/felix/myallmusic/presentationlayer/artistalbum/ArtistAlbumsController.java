package com.felix.myallmusic.presentationlayer.artistalbum;

import com.felix.myallmusic.businesslayer.artistalbum.ArtistAlbumsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/artists/{artistId}/albums")
public class ArtistAlbumsController {

    private ArtistAlbumsService artistAlbumsService;

    public ArtistAlbumsController(ArtistAlbumsService artistAlbumsService) {
        this.artistAlbumsService = artistAlbumsService;
    }

    @GetMapping()
    public ResponseEntity<ArtistAlbumsResponseDTO> getAllAlbumByArtistId(@PathVariable String artistId){
        return ResponseEntity.status(HttpStatus.OK).body(artistAlbumsService.getAllAlbumByArtistId(artistId));
    }
}
