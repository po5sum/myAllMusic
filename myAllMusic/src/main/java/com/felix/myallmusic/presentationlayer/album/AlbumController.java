package com.felix.myallmusic.presentationlayer.album;

import com.felix.myallmusic.businesslayer.album.AlbumService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/albums")
public class AlbumController {
    private AlbumService albumService;

    public AlbumController(AlbumService albumService){
        this.albumService = albumService;
    }

    @GetMapping()
    public ResponseEntity<List<AlbumResponseDTO>> getAllAlbums(){
        return ResponseEntity.status(HttpStatus.OK).body(albumService.getAllAlbums());
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<AlbumResponseDTO> getAlbumById(@PathVariable String albumId){
        return ResponseEntity.status(HttpStatus.OK).body(albumService.getAlbumById(albumId));
    }
    @PostMapping()
    public ResponseEntity<AlbumResponseDTO> addAlbum(@RequestBody AlbumRequestDTO albumRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(albumService.addAlbum(albumRequestDTO));
    }
    @PutMapping("/{albumId}")
    public ResponseEntity<AlbumResponseDTO> updateAlbum(@RequestBody AlbumRequestDTO albumRequestDTO,
                                                        @PathVariable String albumId){
        return ResponseEntity.status(HttpStatus.OK).body(albumService.updateAlbum(albumRequestDTO, albumId));
    }
    @DeleteMapping("/{albumId}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable String albumId){
        albumService.deleteAlbum(albumId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
