-- Tables to create --
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(40) NOT NULL,
    lname VARcHAR(40) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE flashcard_groups(
	id SERIAL PRIMARY KEY,
	title VARCHAR(30) NOT NULL,
	description TEXT
);

CREATE TABLE flashcards(
	id SERIAL PRIMARY KEY,
	card_type VARCHAR(20) NOT NULL,
	subjects VARCHAR(20),
	user_id INT REFERENCES users(id) NOT NULL,
	group_id INT REFERENCES flashcard_groups(id) NOT NULL
);

CREATE TABLE t_f_cards(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	answer CHAR(1) NOT NULL
);

CREATE TABLE basic_cards(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	answer TEXT NOT NULL
);

-- Session Table--
CREATE TABLE session (
  sid VARCHAR NOT NULL PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);