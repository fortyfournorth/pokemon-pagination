import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import type { IPokemonRecord } from "./../types";

const PokemonCard: FC<{ data: IPokemonRecord; className?: string | ClassNames }> = ({
    data,
    className = ""
}) => {
    return (
        <div
            className={new ClassNames("flex", "flex-row", "items-center", "p-2")
                .add(className)
                .list()}
        >
            <div className={new ClassNames("w-20", "h-20", "bg-cover").list()}>
                <img
                    src={data.sprites.official_artwork_front_default}
                    alt={`pokemon-img-${data.id}`}
                />
            </div>
            <div className={new ClassNames("p-2", "ml-2").list()}>
                <p className={new ClassNames("font-bold", "text-xl").list()}>{data.name}</p>
            </div>
        </div>
    );
};

export { PokemonCard };
