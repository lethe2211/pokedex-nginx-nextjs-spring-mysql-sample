package com.example.service

import com.example.domain.PokedexData

interface PokedexService {
    fun getPokedexData(id: Long): PokedexData
}