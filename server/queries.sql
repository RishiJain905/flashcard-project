-- Database init --
CREATE DATABASE flashcard_project;

-- /c flashcard_project

-- Tables to create --
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(40) NOT NULL,
    lname VARcHAR(40) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE flashcard_groups (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    subject VARCHAR(30) NOT NULL,
    user_id INT REFERENCES users(id)  
);

CREATE TABLE t_f_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    answer CHAR(1) NOT NULL,
    group_id INT REFERENCES flashcard_groups(id), 
    mastery VARCHAR(20) NOT NULL
);

CREATE TABLE basic_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    answer TEXT NOT NULL,
    group_id INT REFERENCES flashcard_groups(id),  
    mastery VARCHAR(20) NOT NULL
);

CREATE TABLE mcq_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT,
    option4 TEXT,
    answer CHAR(1) NOT NULL,
    group_id INT REFERENCES flashcard_groups(id),  
    mastery VARCHAR(20) NOT NULL
);
