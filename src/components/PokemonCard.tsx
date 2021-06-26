import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import type { IPokemonRecord } from "./../types";

const PokemonCard: FC<{ data: IPokemonRecord; className?: string | ClassNames }> = ({
    data,
    className = ""
}) => {
    return <div className={new ClassNames().add(className).list()}>{data.name}</div>;
};

export { PokemonCard };
