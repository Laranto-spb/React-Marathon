import s from './style.module.css';
import {useContext} from 'react';
import {PokemonContext} from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard";

const FinishPage = () => {
    const finalPokemons = useContext(PokemonContext);

    const finalBoard1 = Object.values(finalPokemons.finalPokemons1);
    const finalBoard2 = Object.values(finalPokemons.finalPokemons2);

    return (
        <>
            <h1 className={s.title}>Finish</h1>
            <h2>Player 1</h2>
            <div className={s.flex}>
                {
                    finalBoard1.map((item) =>
                        <PokemonCard
                            key={item.id}
                            className={s.card}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive/>
                    )


                }
            </div>
            <button>END GAME</button>
            <h2>Player 2</h2>
            <div className={s.flex}>
                {
                    finalBoard2.map((item) =>
                        <PokemonCard
                            key={item.id}
                            className={s.card}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive/>
                    )


                }
            </div>



        </>
    )
}

export default FinishPage;
