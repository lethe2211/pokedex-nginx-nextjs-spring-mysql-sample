package com.example.service

import com.example.domain.PokedexData

interface PokedexService {
    fun getAllPokedexData(): List<PokedexData>

    fun getPokedexData(id: Long): PokedexData
}