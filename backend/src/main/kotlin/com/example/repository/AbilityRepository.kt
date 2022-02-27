package com.example.repository

import com.example.domain.Ability

interface AbilityRepository {
    fun getAbilitiesByPokemonId(pokemonId: Long): List<Ability>
}