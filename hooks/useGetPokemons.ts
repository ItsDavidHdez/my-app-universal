import { API } from "@/constants/api"
import axios from "axios"

export const useGetPokemons = async (setPokemons: () => void) => {
    await axios.get(`${API}`).then(response => {
      setPokemons(response.data.results)
    }).catch((error) => {
        console.log("Error getting pokemons from PokeAPI: ", error)
    })
  }