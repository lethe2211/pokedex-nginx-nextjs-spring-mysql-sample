package com.example.repository.impl

import com.example.domain.Type
import com.example.repository.TypeRepository
import org.springframework.dao.DataAccessException
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class TypeRepositoryImpl(
    private val jdbcTemplate: NamedParameterJdbcTemplate
) : TypeRepository {
    override fun getTypesByPokemonId(pokemonId: Long): List<Type> {
        return try {
            val param = mapOf(
                "pokemonId" to pokemonId
            )
            jdbcTemplate.queryForList(GET_TYPES_BY_POKEMON_ID, param)
                .map {
                    Type(it["id"].toString().toLong(), it["name"].toString())
                }
        } catch (e: EmptyResultDataAccessException) {
            listOf()
        } catch (e: DataAccessException) {
            throw Exception(e)
        }
    }

    companion object {
        private const val GET_TYPES_BY_POKEMON_ID: String = "SELECT * FROM pokemon_type INNER JOIN type ON pokemon_type.type_id = type.id WHERE pokemon_type.pokemon_id = :pokemonId"
    }
}