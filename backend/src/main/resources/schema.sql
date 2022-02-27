CREATE TABLE IF NOT EXISTS pokemon (
  id INT NOT NULL PRIMARY KEY,
  name_en CHAR(20) DEFAULT NULL,
  height FLOAT DEFAULT NULL,
  weight FLOAT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS type (
  id INT NOT NULL PRIMARY KEY,
  name CHAR(20) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS ability (
  id INT NOT NULL PRIMARY KEY,
  name CHAR(20) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS pokemon_type (
  pokemon_id INT NOT NULL,
  type_id INT NOT NULL,
  PRIMARY KEY (pokemon_id, type_id),
  CONSTRAINT fk_pokemon_type_pokemon_id FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
  CONSTRAINT fk_pokemon_type_type_id FOREIGN KEY (type_id) REFERENCES type (id)
);

CREATE TABLE IF NOT EXISTS pokemon_ability (
  pokemon_id INT NOT NULL,
  ability_id INT NOT NULL,
  PRIMARY KEY (pokemon_id, ability_id),
  CONSTRAINT fk_pokemon_ability_pokemon_id FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
  CONSTRAINT fk_pokemon_ability_ability_id FOREIGN KEY (ability_id) REFERENCES ability (id)
);
