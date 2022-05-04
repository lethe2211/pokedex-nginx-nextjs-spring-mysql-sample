package com.example.service.impl

import com.example.domain.PokedexData
import com.example.repository.AbilityRepository
import com.example.repository.PokemonRepository
import com.example.repository.TypeRepository
import com.example.service.PokedexService
import org.springframework.stereotype.Service

@Service
class PokedexServiceImpl(
    private val pokemonRepository: PokemonRepository,
    private val typeRepository: TypeRepository,
    private val abilityRepository: AbilityRepository
): PokedexService {
    override fun getAllPokedexData(): List<PokedexData> {
        return pokemonRepository.getAllPokemon()
            .map { pokemon ->
                    val pokemonId = pokemon.id

                    // FIXME: N+1 queries
                    val type = typeRepository.getTypesByPokemonId(pokemonId)
                    val ability = abilityRepository.getAbilitiesByPokemonId(pokemonId)

                    PokedexData.of(pokemon, type, ability)
            }
    }

    override fun getPokedexData(id: Long): PokedexData {
        val pokemon = pokemonRepository.getPokemonById(id) ?: throw Exception("No pokemon was found")
        val types = typeRepository.getTypesByPokemonId(id)
        val abilities = abilityRepository.getAbilitiesByPokemonId(id)
        return PokedexData.of(pokemon, types, abilities)
    }
}