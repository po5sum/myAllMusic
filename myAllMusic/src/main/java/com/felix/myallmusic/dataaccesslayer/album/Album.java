package com.felix.myallmusic.dataaccesslayer.album;

import com.felix.myallmusic.dataaccesslayer.artist.Artist;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "albums")
@Data
@NoArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "albumid")
    private String albumId;

    private String title;

    @Column(name = "releaseyear")
    private Integer releaseYear;

    @Column(name = "coverurl")
    private String coverURL;

    @ManyToOne
    @JoinColumn(name = "artistid", referencedColumnName = "artistid")
    private Artist artist;
}
