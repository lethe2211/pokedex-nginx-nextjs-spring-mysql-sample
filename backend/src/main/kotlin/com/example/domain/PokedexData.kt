package com.example.domain

data class PokedexData(
    val id: Long,
    val nameEn: String,
    val height: Float,
    val weight: Float,
    val types: List<Type>,
    val abilities: List<Ability>
) {
    companion object {
        fun of(pokemon: Pokemon, types: List<Type>, abilities: List<Ability>): PokedexData {
            return PokedexData(
                pokemon.id,
                pokemon.nameEn,
                pokemon.height,
                pokemon.weight,
                types,
                abilities
            )
        }
    }
}