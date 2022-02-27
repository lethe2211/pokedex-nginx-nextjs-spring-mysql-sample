package com.example.repository

import com.example.domain.Pokemon

interface PokemonRepository {
    fun getPokemonById(id: Long): Pokemon?
}