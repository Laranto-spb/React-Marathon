import {useRouteMatch, Route, Switch} from "react-router-dom";
import {useState} from 'react';
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";

const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [finalPokemons1, setFinalPokemons1] = useState({})
    const [finalPokemons2, setFinalPokemons2] = useState({})

    const handlerSelectedPokemon = (key, pokemon) => {
        setSelectedPokemon(prevState => {
            if(prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];
                return copyState;
            }
            return {
                ...prevState,
                [key]: pokemon

            }
        });
    }

    const getFinalPokemons = (finalPlayer1, finalPlayer2) => {
        finalPlayer1 && setFinalPokemons1(finalPlayer1);
        finalPlayer2 && setFinalPokemons2(finalPlayer2);
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: Object.values(selectedPokemon),
            onSelectedPokemon: handlerSelectedPokemon,
            onFinalPokemons: getFinalPokemons,
            finalPokemons1: finalPokemons1,
            finalPokemons2: finalPokemons2,

        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} component={FinishPage}/>
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;
