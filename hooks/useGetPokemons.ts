import { API } from "@/constants/api";
import { useState, useEffect, useCallback } from "react";

export function useGetPokemons(page: number) {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * 10;
      const response = await fetch(`${API}/pokemon?limit=10&offset=${offset}`);
      const data = await response.json();

      setPokemons(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching Pokémons:", error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return { pokemons, loading, totalPages };
}
