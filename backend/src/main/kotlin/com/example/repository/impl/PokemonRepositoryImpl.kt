package com.example.repository.impl

import com.example.domain.Pokemon
import com.example.repository.PokemonRepository
import org.springframework.dao.DataAccessException
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository
import java.lang.Exception

@Repository
class PokemonRepositoryImpl(
    private val jdbcTemplate: NamedParameterJdbcTemplate
) : PokemonRepository {
    override fun getAllPokemon(): List<Pokemon> {
        return try {
            jdbcTemplate.query(GET_ALL_POKEMON_SQL) { rs, _ ->
                Pokemon(rs.getLong("id"), rs.getString("name_en"), rs.getFloat("height"), rs.getFloat("weight"))
            }
        } catch (e: EmptyResultDataAccessException) {
            return listOf()
        } catch (e: DataAccessException) {
            throw Exception(e)
        }
    }

    override fun getPokemonById(id: Long): Pokemon? {
        return try {
            val param = MapSqlParameterSource(
                mapOf("id" to id)
            )
            jdbcTemplate.queryForObject(GET_POKEMON_BY_ID_SQL, param) { rs, _ ->
                Pokemon(rs.getLong("id"), rs.getString("name_en"), rs.getFloat("height"), rs.getFloat("weight"))
            }
        } catch (e: EmptyResultDataAccessException) {
            null
        } catch (e: DataAccessException) {
            throw Exception(e)
        }
//        // Dummy data
//        return Pokemon(
//            1,
//            "bulbasaur",
//            0.7f,
//            6.9f,
//            listOf(
//                Type(
//                    12,
//                    "grass"
//                ),
//                Type(
//                    4,
//                    "poison"
//                )
//            ),
//            listOf(
//                Ability(
//                    65,
//                    "overgrow"
//                ),
//                Ability(
//                    34,
//                    "chlorophyll"
//                )
//            )
//        )
    }

    companion object {
        private const val GET_ALL_POKEMON_SQL = "SELECT * FROM pokemon"
        private const val GET_POKEMON_BY_ID_SQL = "SELECT * FROM pokemon WHERE id = :id"
    }
}