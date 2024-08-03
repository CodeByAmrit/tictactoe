
CREATE database game;
use game;


CREATE TABLE users (
    userId int AUTO_INCREMENT PRIMARY KEY,
    Name varchar(100),
    email varchar(100) UNIQUE,
    password varchar(100)
);

CREATE TABLE scoreSchema (
    playerId int,
    name varchar(100),
    dateTime varchar(100),
    result varchar(100),
    id int auto_increment primary key,
    FOREIGN KEY (playerId) REFERENCES users(userId)
);

CREATE USER 'web'@'%' IDENTIFIED  BY 'Amrit@123';

grant select, insert, delete, update on *.* to 'web'@'%' ;
flush privileges;
