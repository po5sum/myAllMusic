package com.felix.myallmusic.presentationlayer.artist;

import com.felix.myallmusic.businesslayer.artist.ArtistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/artists")
public class ArtistController {
    private ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping()
    public ResponseEntity<List<ArtistResponseDTO>> getAllAlbums(){
        return ResponseEntity.status(HttpStatus.OK).body(artistService.getAllArtist());
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<ArtistResponseDTO> getArtistById(@PathVariable String artistId){
        return ResponseEntity.status(HttpStatus.OK).body(artistService.getArtistById(artistId));
    }

    @PostMapping()
    public ResponseEntity<ArtistResponseDTO> addArtist(@RequestBody ArtistRequestDTO artistRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(artistService.addArtist(artistRequestDTO));
    }
    @PutMapping("/{artistId}")
    public ResponseEntity<ArtistResponseDTO> updateArtist(@RequestBody ArtistRequestDTO artistRequestDTO, @PathVariable String artistId){
        return ResponseEntity.status(HttpStatus.OK).body(artistService.updateArtist(artistRequestDTO, artistId));
    }
    @DeleteMapping("/{artistId}")
    public ResponseEntity<Void> deleteArtist(@PathVariable String artistId){
        artistService.deleteArtist(artistId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
