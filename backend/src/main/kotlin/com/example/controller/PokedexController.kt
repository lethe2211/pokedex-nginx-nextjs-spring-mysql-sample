package com.example.controller

import com.example.domain.PokedexData
import com.example.service.PokedexService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class PokedexController(
    private val pokedexService: PokedexService
) {
    @QueryMapping
    fun getAllPokedexData(): List<PokedexData> {
        return pokedexService.getAllPokedexData()
    }

    @QueryMapping
    fun getPokedexData(@Argument id: Long): PokedexData? {
        return pokedexService.getPokedexData(id)
    }
}