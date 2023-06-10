import type Type from "../models/type";
import type Ability from "../models/ability";

interface PokedexData {
  id: string;
  nameEn: string;
  height: number;
  weight: number;
  types: Type[];
  abilities: Ability[];
}

export default PokedexData;
