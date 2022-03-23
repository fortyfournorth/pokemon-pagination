import React, { useState, useEffect } from "react";
import { PokemonCard, ErrorBlock, SelectBox, Pagination } from "./../components";
import { ClassNames } from "@44north/classnames";
import { useQuery, gql } from "@apollo/client";
import type { IPokemonRecord } from "./../types";

const POKEMON_QUERY = gql`
    query GetPokemon($pageNo: Int, $itemsPerPage: Int) {
        listPokemon(pageNo: $pageNo, itemsPerPage: $itemsPerPage) {
            id
            name
            height
            weight
            species {
                genera {
                  	genus
                }
            }
            sprites {
                official_artwork_front_default
            }
            types {
                name
            }
            abilities {
                name
                is_hidden
            }
        }
        countPokemon
    }
`;

function Homepage() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [pageNo, setPageNo] = useState<number>(1);

    const updateItemsPerPage = (amount: number): void => {
        setItemsPerPage(amount)
        setPageNo(1)
    }
    
    const { data, loading, error, refetch } = useQuery<{ listPokemon: IPokemonRecord[], countPokemon: number }>(
        POKEMON_QUERY,
        {
            variables: {
                pageNo,
                itemsPerPage
            }
        }
    );

    useEffect(() => {
        refetch({
            pageNo,
            itemsPerPage
        });
    }, [pageNo, itemsPerPage]);

    return (
        <div className={new ClassNames(["py-2"]).list()}>
            {error && <ErrorBlock error={error}/>}
            {loading ? (
                <p>I am Loading...</p>
            ) : (data?.listPokemon || []).length === 0 ? (
                <ErrorBlock error={new Error("No Records Found")} />
            ) : (
                <div className={new ClassNames("space-y-4 flex flex-col items-center").list()}>
                    <ul className={new ClassNames("grid", "grid-cols-1", "lg:grid-cols-3", "gap-8").list()}
                        style={itemsPerPage === 1 ? {gridTemplateColumns: "1fr"} : {}}>
                        {data.listPokemon.map((record) => (
                            <li key={record.id}>
                                <PokemonCard data={record}/>
                            </li>
                        ))}
                    </ul>
                    <div className={new ClassNames(
                        "flex flex-col lg:flex-row justify-center items-center",
                        "space-y-4 lg:space-y-0 space-x-2",
                    ).list()}>
                        <Pagination
                            totalCount={data.countPokemon}
                            itemsPerPage={itemsPerPage}
                            pageNo={pageNo}
                            setPageNo={setPageNo}>
                        </Pagination>
                        <SelectBox
                            value={itemsPerPage}
                            onChange={(value) => updateItemsPerPage(Number(value))}
                            options={[1, 3, 6, 9, 12, 24, 48]}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;
