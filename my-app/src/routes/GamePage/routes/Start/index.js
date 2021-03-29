import {useHistory} from 'react-router-dom';
import PokemonCard from "../../../../components/PokemonCard";
import {useContext, useState, useEffect} from 'react';
import {FireBaseContext} from "../../../../service/firebaseContext";
import {PokemonContext} from "../../../../context/pokemonContext";


import s from './style.module.css';

const StartPage = () => {
    const history = useHistory();
    const handlerClickButton = () => {
        history.push('/');
    }
    const firebase = useContext(FireBaseContext);
    const selectedPokemons = useContext(PokemonContext);

    const [pokemons, setPokemons] = useState({});

    const getPokemons = async () => {
        const response = await firebase.getPokemonsOnce();
        setPokemons(response);
    }

    useEffect(() => {
        getPokemons();
        return () => {
            firebase.offPokemonSoket();
        }
    }, []);

    //Adding active state to Pokemon
    const handlerClicker = (key) => {
        const stateActivePokemon = pokemons[key].active;
        firebase.postPokemon(key, {active: !stateActivePokemon})
    };

    //Go to Board Page
    const handlerStartButton = () => {
        history.push('/game/board');
    }

    //Add selected pokemon to state in GamePage
    const handlerSelect = (key) => {
        const pokemon = {...pokemons[key]};
        selectedPokemons.onSelectedPokemon(key, pokemon);
    }

    return (
        <>
            <h1 className={s.title}>This is Game Page!</h1>
            <div className={s.buttons}>
                <button className={s.home_btn} onClick={handlerClickButton}>Back to Home</button>
                <button className={s.add_btn} onClick={handlerStartButton} disabled={Object.keys(selectedPokemons.pokemons).length < 5}>Start Game</button>
            </div>

            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, item]) =>
                        <PokemonCard
                            key={key}
                            className={s.card}
                            pokemonKey={key}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            onClickCard={handlerClicker}
                            onSelectCard={() => {
                                if (Object.keys(selectedPokemons.pokemons).length < 5) {
                                    handlerSelect(key);
                                }
                            }
                            }
                            // isActive={item.active}
                            isActive={true}
                        />
                    )
                }
            </div>
        </>
    )
}

export default StartPage;
