package com.example.repository.impl

import com.example.domain.Ability
import com.example.repository.AbilityRepository
import org.springframework.dao.DataAccessException
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class AbilityRepositoryImpl(
    private val jdbcTemplate: NamedParameterJdbcTemplate
) : AbilityRepository {
    override fun getAbilitiesByPokemonId(pokemonId: Long): List<Ability> {
        return try {
            val param = mapOf(
                "pokemonId" to pokemonId
            )
            jdbcTemplate.queryForList(GET_ABILITIES_BY_POKEMON_ID, param)
                .map {
                    Ability(
                        id = it["id"].toString().toLong(),
                        nameEn = it["name_en"].toString()
                    )
                }
        } catch (e: EmptyResultDataAccessException) {
            listOf()
        } catch (e: DataAccessException) {
            throw Exception(e)
        }
    }

    companion object {
        private const val GET_ABILITIES_BY_POKEMON_ID = "SELECT * FROM pokemon_ability INNER JOIN ability ON pokemon_ability.ability_id = ability.id WHERE pokemon_ability.pokemon_id = :pokemonId"
    }
}