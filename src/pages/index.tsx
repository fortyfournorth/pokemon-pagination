import React, { useState, useEffect } from "react";
import { Button, PokemonCard, ErrorBlock, SelectBox } from "./../components";
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
                habitat {
                    name
                }
                color {
                    name
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
    }
`;

function Homepage() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [pageNo, setPageNo] = useState<number>(1);

    const { data, loading, error, refetch } = useQuery<{ listPokemon: IPokemonRecord[] }>(
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
        <div className={new ClassNames(["flex", "flex-col", "space-y-4", "justify-center", "items-center", "py-4"]).list()}>
            {error && <ErrorBlock error={error} />}

            {loading ? (
                <p>I am Loading...</p>
            ) : (data?.listPokemon || []).length === 0 ? (
                <ErrorBlock error={new Error("No Records Found")} />
            ) : (
                <ul className={new ClassNames("grid", "grid-cols-1", "lg:grid-cols-3", "gap-8").list()}>
                    {data.listPokemon.map((record) => (
                        <li key={record.id}>
                            <PokemonCard data={record}/>
                        </li>
                    ))}
                </ul>
            )}

            <div
                className={new ClassNames([
                    "flex",
                    "justify-between items-center",
                    "space-x-8"
                ]).list()}
            >
                <div className={new ClassNames(["flex", "space-x-2", "items-center"]).list()}>
                    <Button onClick={() => setPageNo(pageNo - 1)}>Previous Page</Button>
                    <p>{pageNo}</p>
                    <Button onClick={() => setPageNo(pageNo + 1)}>Next Page</Button>
                </div>
                <div>
                    <SelectBox
                        value={itemsPerPage}
                        onChange={(value) => setItemsPerPage(Number(value))}
                        options={[1, 3, 6, 9, 12, 24, 48]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
