import time
import requests

ddl = '''DROP DATABASE IF EXISTS pokedex;

CREATE DATABASE IF NOT EXISTS pokedex;
use pokedex;

CREATE TABLE IF NOT EXISTS pokemon (
  id INT NOT NULL PRIMARY KEY,
  name_en CHAR(50) DEFAULT NULL,
  height FLOAT DEFAULT NULL,
  weight FLOAT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS type (
  id INT NOT NULL PRIMARY KEY,
  name_en CHAR(50) DEFAULT NULL,
  sort_order INT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ability (
  id INT NOT NULL PRIMARY KEY,
  name_en CHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS pokemon_type (
  pokemon_id INT NOT NULL,
  type_id INT NOT NULL,
  sort_order INT NOT NULL,
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
'''

def generate_insert_pokemon_sql():
    params = {
        'query': '{ pokemon_v2_pokemon( order_by: { id: asc } ) { id name height weight } }'
    }
    headers = {'Content-Type': 'application/json'}
    res = requests.post('https://beta.pokeapi.co/graphql/v1beta', json=params, headers=headers)
    pokemons = res.json()['data']['pokemon_v2_pokemon']

    sql = 'INSERT INTO pokemon (id, name_en, height, weight) VALUES\n'
    for index, pokemon in enumerate(pokemons):
        sql += f'''  ({pokemon['id']}, '{pokemon['name']}', {pokemon['height'] / 10}, {pokemon['weight'] / 10})'''

        if index != len(pokemons) - 1:
            sql += ','
        sql += '\n'
    sql += ';\n'

    return sql

# print(generate_insert_pokemon_sql())

def generate_insert_type_sql():
    sql = '''INSERT INTO type (id, name_en, sort_order) VALUES
  (1, 'normal', 1),
  (2, 'fighting', 7),
  (3, 'flying', 10),
  (4, 'poison', 8),
  (5, 'ground', 9),
  (6, 'rock', 13),
  (7, 'bug', 12),
  (8, 'ghost', 14),
  (9, 'steel', 17),
  (10, 'fire', 2),
  (11, 'water', 3),
  (12, 'grass', 5),
  (13, 'electric', 4),
  (14, 'psychic', 11),
  (15, 'ice', 6),
  (16, 'dragon', 15),
  (17, 'dark', 16),
  (18, 'fairy', 18),
  (10001, 'unknown', 10001),
  (10002, 'shadow', 10002)
;
'''

    return sql

# print(generate_insert_type_sql())

def generate_insert_ability_sql():
    params = {
        'query': '{ pokemon_v2_ability(order_by: {id: asc}) { id name } }'
    }
    headers = {'Content-Type': 'application/json'}
    res = requests.post('https://beta.pokeapi.co/graphql/v1beta', json=params, headers=headers)
    types = res.json()['data']['pokemon_v2_ability']

    sql = 'INSERT INTO ability (id, name_en) VALUES\n'
    for index, type in enumerate(types):
        sql += f'''  ({type['id']}, '{type['name']}')'''

        if index != len(types) - 1:
            sql += ','
        sql += '\n'
    sql += ';\n'

    return sql

# print(generate_insert_ability_sql())

def generate_insert_pokemon_type_sql():
    params = {
        'query': '{ pokemon_v2_pokemontype(order_by: {pokemon_id: asc}) { pokemon_id type_id } }'
    }
    headers = {'Content-Type': 'application/json'}
    res = requests.post('https://beta.pokeapi.co/graphql/v1beta', json=params, headers=headers)
    types = res.json()['data']['pokemon_v2_pokemontype']

    sql = 'INSERT INTO pokemon_type (pokemon_id, type_id, sort_order) VALUES\n'
    cnt = 0
    prev_id = ''
    for index, type in enumerate(types):
        if prev_id != type['pokemon_id']:
            cnt = 0
        else:
            cnt += 1

        sql += f'''  ({type['pokemon_id']}, {type['type_id']}, {cnt})'''

        if index != len(types) - 1:
            sql += ','
        sql += '\n'

        prev_id = type['pokemon_id']

    sql += ';\n'

    return sql

print(generate_insert_pokemon_type_sql())

def generate_insert_pokemon_ability_sql():
    params = {
        'query': '{   pokemon_v2_pokemonability(order_by: {pokemon_id: asc}) { pokemon_id ability_id } }'
    }
    headers = {'Content-Type': 'application/json'}
    res = requests.post('https://beta.pokeapi.co/graphql/v1beta', json=params, headers=headers)
    types = res.json()['data']['pokemon_v2_pokemonability']

    sql = 'INSERT INTO pokemon_ability (pokemon_id, ability_id) VALUES\n'
    for index, type in enumerate(types):
        sql += f'''  ({type['pokemon_id']}, {type['ability_id']})'''

        if index != len(types) - 1:
            sql += ','
        sql += '\n'
    sql += ';\n'

    return sql

# print(generate_insert_pokemon_ability_sql())

def get_pokemon_image_files():
    for i in range(0, 810):
        numstr = str(i).zfill(3)
        image_url = f'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/{numstr}.png'
        print(image_url)
        res = requests.get(image_url)
        with open(f'results/images/{numstr}.png', 'wb') as file:
            file.write(res.content)
        time.sleep(1)


if __name__ == '__main__':
    # Fetch Pokemon images from https://github.com/fanzeyi/pokemon.json/tree/master/images
    # Note that these images do not contain Sword and Shield versions
    get_pokemon_image_files()

# Use the below if you want to generate 
# 
#     dml = f'''{generate_insert_pokemon_sql()}
# {generate_insert_type_sql()}
# {generate_insert_ability_sql()}
# {generate_insert_pokemon_type_sql()}
# {generate_insert_pokemon_ability_sql()}'''

#     print(dml)

#     init_sql = f'''-- DDL
# {ddl}

# -- DML
# {dml}'''
#     with open('results/init.sql', 'w') as file:
#         file.write(init_sql)