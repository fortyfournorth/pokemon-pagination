import { ClassNames } from "@44north/classnames";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../components/Pagination";
import { ErrorBlock, PokemonCard } from "./../components";
import type { IPokemonRecord } from "./../types";

const POKEMONS_QUERY = gql`
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
        countPokemon
    }
`;

function Homepage() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [pageNo, setPageNo] = useState<number>(1);

    const { data, loading, error, refetch } = useQuery<{
        listPokemon: IPokemonRecord[];
        countPokemon: number;
    }>(POKEMONS_QUERY, {
        variables: {
            pageNo,
            itemsPerPage
        }
    });

    useEffect(() => {
        refetch({
            pageNo,
            itemsPerPage
        });
    }, [pageNo, itemsPerPage]);

    function setNewPageNo(newPageNo: number): void {
        setPageNo(newPageNo);
    }

    function setNewItemsPerPage(newItemsPerPage: number): void {
        setItemsPerPage(newItemsPerPage);
    }

    return (
        <div className={new ClassNames(["flex", "flex-col", "space-y-4"]).list()}>
            {error && <ErrorBlock error={error} />}

            {loading ? (
                <p>I am Loading...</p>
            ) : (data?.listPokemon || []).length === 0 ? (
                <ErrorBlock error={new Error("No Records Found")} />
            ) : (
                <>
                    <ul>
                        {data.listPokemon.map((record) => (
                            <li key={record.id}>
                                <PokemonCard data={record} />
                            </li>
                        ))}
                    </ul>
                    <PaginationComponent
                        totalElements={data.countPokemon}
                        currentPage={pageNo}
                        itemPerPageProp={itemsPerPage}
                        onCurrentPageChange={(newCurrentPage: number) =>
                            setNewPageNo(newCurrentPage)
                        }
                        onItemsPerPageChange={(newItemsPerPage: number) =>
                            setNewItemsPerPage(newItemsPerPage)
                        }
                    />
                </>
            )}
        </div>
    );
}

export default Homepage;
