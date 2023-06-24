import React from 'react'
import Card from './Card'
import PokemonInfo from './PokemonInfo'
import axios from 'axios'
import { useState, useEffect } from 'react'
export default function Main() {
    const [pokeData, setPokedata] = useState([]);
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [previousUrl, setPreviousUrl] = useState();
    const [pokedex, setPokedex] = useState();


    const pokefun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        // console.log(res.data.results)
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false);
        // console.log(pokeData)

    }
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            // console.log(result)
            setPokedata(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }
    useEffect(() => {
        // console.log("maincomponent rendered")
        pokefun();
    }, [url]
    )
    return (

        <>


            <div className="container">
                <div className="left">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokedex(poke)} />

                    <div className="btn">
                  
                       { previousUrl && <button onClick={() => {
                            setPokedata([])
                            setUrl(previousUrl)

                        }}>Previous</button>}
                        <button onClick={() => {
                            setPokedata([])
                            setUrl(nextUrl)
                        }}>Next</button>
                    </div>
                </div>
                <div className="right">
                    <PokemonInfo data={pokedex} loading={loading} />
                </div>
            </div>



        </>
    )
}
