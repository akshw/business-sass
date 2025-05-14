CREATE DATABASE business_sass;
USER business_sass;

CREATE TABLE USER({
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
    created TIMESTAMP NOT NULL DEFAULT NOW()
})