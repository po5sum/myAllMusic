drop table artists if exists;
create table artists
(
    id          INT             NOT NULL AUTO_INCREMENT,
    artistid    VARCHAR(36)     NOT NULL UNIQUE,
    name        VARCHAR(255)    NOT NULL,
    debutyear   VARCHAR(36)     NOT NULL,
    country     VARCHAR(255)    NOT NULL,
    imageurl    VARCHAR(255),
    PRIMARY KEY (id)
);

drop table albums if exists;

create table albums
(
    id          INT             NOT NULL AUTO_INCREMENT,
    albumid     VARCHAR(36)     NOT NULL UNIQUE ,
    title       VARCHAR(255)    NOT NULL,
    releaseyear INT             NOT NULL,
    coverurl    VARCHAR(255),
    artistid    VARCHAR(36)     NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (artistid) references artists(artistid)
);