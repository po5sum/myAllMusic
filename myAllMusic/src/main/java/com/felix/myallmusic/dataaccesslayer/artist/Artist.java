package com.felix.myallmusic.dataaccesslayer.artist;

import com.felix.myallmusic.dataaccesslayer.album.Album;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "artists")
@Data
@NoArgsConstructor
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "artistid")
    private String artistId;

    private String name;

    @Column(name = "debutyear")
    private String debutYear;

    private String country;

    @Column(name = "imageurl")
    private String imageURL;

    @OneToMany(mappedBy = "artist")
    private Set<Album> albums;
}
