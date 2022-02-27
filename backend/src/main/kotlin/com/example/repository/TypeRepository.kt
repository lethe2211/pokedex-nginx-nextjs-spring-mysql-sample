package com.example.repository

import com.example.domain.Type

interface TypeRepository {
    fun getTypesByPokemonId(pokemonId: Long): List<Type>
}