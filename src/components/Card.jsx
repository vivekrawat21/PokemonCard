import React from 'react';

export default function Card({ pokemon, loading,infoPokemon }) {
  return (
  
    
    <>
    {loading ? (
      <h1>Loading....</h1>
    ) : (
      <>
        {pokemon
          .filter((item, index, self,infoPokemon) => self.findIndex(p => p.id === item.id) === index) // Filter out duplicates
          .map((item) => (
            
            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
              <h1>{item.id}</h1>
              <img src={item.sprites.front_default} alt="pokemon" />
              <h2 className="text-xl font-bold py-6">{item.name}</h2>
            </div>
          ))}
      </>
    )}
    </>
  );
}
 