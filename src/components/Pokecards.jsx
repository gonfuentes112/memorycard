/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/pokecard.css"
function Pokecard({reqId, handleChoice}) {
    function capitalize(s) {
        if (s === '') {
            return ''
        }
        return s[0].toUpperCase() + s.slice(1)
    }
  async function getPoke(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    async function fetchPokemon(id) {
      const data = await getPoke(id);
      setPokeData(data);
    }
    fetchPokemon(reqId);
  }, [reqId]);
  return (
    <>
        {pokeData ? (
          <div className="card" data-id={reqId} onClick={(e) => {handleChoice(e.currentTarget.dataset.id)}}>
            <img src={pokeData.sprites.front_default} />
            <div> {capitalize(pokeData.name)}</div>
          </div>
        ) : (
          "Loading..."
        )}
    </>
  );
}
export default Pokecard;
