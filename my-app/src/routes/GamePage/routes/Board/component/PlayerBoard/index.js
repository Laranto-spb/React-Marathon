import PokemonCard from "../../../../../../components/PokemonCard";
import {useState} from 'react';
import cn from 'classnames';
import s from "./style.module.css";

const PlayerBoard = ({cards}) => {

    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div className={cn(s.cardBoard, {[s.selected]: isSelected === item.id})}
                         onClick={() => {
                             setSelected(item.id)
                         }}>
                        <PokemonCard
                            pokemonKey={item.key}
                            minimize
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive

                        />
                    </div>
                ))
            }
        </>
    )

}

export default PlayerBoard;
