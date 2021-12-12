import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import type { IPokemonRecord } from "./../types";

const PokemonCard: FC<{ data: IPokemonRecord; info?: boolean; className?: string | ClassNames }> = ({
    data,
    className = ""
}) => {
    return <div className={new ClassNames().add(className).list()} style={{float:"left", padding:15}}>
                {data.name} <img src={data.sprites.official_artwork_front_default} style={{flex:1, height: 75, width: 75}}/>
           </div>;
};

export { PokemonCard };
