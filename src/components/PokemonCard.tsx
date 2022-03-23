import { FC } from "react";
import type { IPokemonRecord } from "./../types";
import { POKEMON_TYPE_COLORS, POKEMON_STAT_COLORS, MODIFY_HEX } from "./../utils";
import { ClassNames } from "@44north/classnames";

const PokemonCard: FC<{ data: IPokemonRecord; }> = ({
    data
}) => {
    return (
        <div className="flex flex-col justify-between w-72 h-96 p-2 rounded-md drop-shadow-lg"
        style={{backgroundColor: `${POKEMON_TYPE_COLORS[data.types[0].name]}`}} >
            {/* POKEMON TYPE */}
            <div>
                <div className="flex space-x-4">
                    {data.types.map((type, i) =>
                        <span 
                            key={i} 
                            className={new ClassNames(
                                "w-full py-1", 
                                "rounded-xl shadow-inner shadow-[#0008]",
                                "text-xl text-center capitalize"
                            ).list()}
                            style={{backgroundColor: `${MODIFY_HEX(POKEMON_TYPE_COLORS[type.name], i === 0 ? -20 : 0)}`}}>
                            {type.name}
                        </span>
                    )}
                </div>

                {/* POKEMON NUMBER, NAME & IMAGE  */}
                <div className={"flex justify-between items-start pt-2 px-2"}>
                    <div className={"flex flex-col capitalize text-black"}>
                        <span className="text-md">{`#${data.id.padStart(3, '0')}`}</span>
                        <span className="text-xl font-bold">{data.name}</span>
                        <span className="text-xs">{`${data.species.genera.genus}`}</span>
                    </div>
                    <img 
                        className="w-7/12 drop-shadow-lg"
                        src={data.sprites.official_artwork_front_default} 
                        alt={data.name}>
                    </img>
                </div>

                <div className="flex justify-between items-start px-2 text-xs text-black">
                    <div className="flex flex-col justify-around items-start space-y-1 capitalize">
                        {
                        data.abilities.map((ability, i) =>
                            ability.is_hidden
                                ? <div key={i} className="flex flex-row items-center space-x-1">
                                    <span className="text-white font-bold">{ability.name}</span>
                                    {/* HIDDEN ICON */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    </div>
                                : <span key={i}>{ability.name}</span>
                        )
                    }
                    </div>
                {/* POKEMON WEIGHT & HEIGHT */}
                <div className="flex flex-col justify-around items-end space-y-1">
                    <div className="flex flex-row items-center space-x-1">
                        {/* HEIGHT ICON */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                        <span>{`Height: ${(data.height / 10).toFixed(1)} m`}</span>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        {/* WEIGHT ICON */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        <span>{`Weight: ${(data.weight / 10).toFixed(1)} kg`}</span>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex justify-between items-end px-4 text-black text-sm h-full">
                {
                    data.stats.map((stat, i) =>
                        <div className="flex flex-col justify-end items-center h-full pt-2">
                            <div className="w-5 h-full my-2 rounded-lg shadow-inner shadow-[#0008]"
                                 style={{height: `${stat.base_stat/180 * 100}%`, backgroundColor: `${POKEMON_STAT_COLORS(stat.base_stat)}`}}>
                            </div>
                            <span className="text-xs" key={i}>{stat.base_stat}</span>
                        </div>
                )}
            </div>
        </div>
    );
};

export { PokemonCard };
