package com.example.service.impl

import com.example.domain.Ability
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
    override fun getPokedexData(id: Long): PokedexData {
        val pokemon = pokemonRepository.getPokemonById(id) ?: throw Exception("No pokemon was found")
        val type = typeRepository.getTypesByPokemonId(id)
        val ability = abilityRepository.getAbilitiesByPokemonId(id)
        return PokedexData.of(pokemon, type, ability)
    }
}