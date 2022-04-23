package com.example.repository

import com.example.domain.Pokemon

interface PokemonRepository {
    fun getAllPokemon(): List<Pokemon>

    fun getPokemonById(id: Long): Pokemon?
}