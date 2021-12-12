import React, { useState, useEffect } from "react";
import { Button, PokemonCard, ErrorBlock, SelectBox } from "./../components";
import { ClassNames } from "@44north/classnames";
import { useQuery, gql } from "@apollo/client";
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

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
    const [maxPage, setMaxPage] = useState<number>(94)
    const [pageCount, setPageCount] = useState<Array<number>>([1, 2, 3, 4, 5]);

    const { data, loading, error, refetch } = useQuery<{ listPokemon: IPokemonRecord[] }>(
        POKEMON_QUERY,
        {
            variables: {
                pageNo,
                itemsPerPage
            }
        }
    );

    const total:number = 1118


    const setPagination = (event?:any, page?:number) => {
        if(page === 1 || page === 2 || page === 3 || page ===4){
            setPageCount([1, 2, 3, 4, 5])
        }
        else if(page===maxPage || page===maxPage-1 || page===maxPage-2 || page===maxPage-3 || page > maxPage){
            setPageCount([maxPage-4,maxPage-3,maxPage-2,maxPage-1,maxPage])
        }
        else if(page > 0){
            setPageCount([page-2, page-1, page, page+1, page+2])
        }

        if(page > 0 && page <=maxPage){
            setPageNo(page)
        }

    }

    const setNumPerPage = (event?:any, num?:number) => {
        setItemsPerPage(num)
        if(num === 1){
            setMaxPage(Math.floor(1118/num))
        }
        else {
            setMaxPage((Math.floor(1118/num)+1))
        }
    }

    useEffect(() => {
        refetch({
            pageNo,
            itemsPerPage
        });
    }, [pageNo, itemsPerPage]);

    return (
        <div className={new ClassNames(["flex", "flex-col", "space-y-4"]).list()}>
            {error && <ErrorBlock error={error} />}

            {loading ? (
                <p>I am Loading...</p>
            ) : (data?.listPokemon || []).length === 0 ? (
                    <ErrorBlock error={new Error("No Records Found")} />
            ) : (
                <ul>
                    {data.listPokemon.map((record) => (
                        <li key={record.id}>
                            <PokemonCard data={record} />
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
                    
                    {(pageNo !== 1) ? (
                        <Button onClick={() => setPagination(true, pageNo - 1)}>&lt;</Button>
                    ) : (
                        <p></p>
                    )}

                    {(pageNo<=4) ? (
                        <div>
                            <ToggleButtonGroup value={pageNo} size="large" exclusive onChange={setPagination}>
                                {pageCount.map(index=>(
                                    <ToggleButton style={{color: "white"}} value={index}>{index}</ToggleButton>
                                ))}
                                <ToggleButton style={{color: "white"}} value={0}>...</ToggleButton>
                                <ToggleButton style={{color: "white"}} value={maxPage}>{maxPage}</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    ) : (pageNo>=maxPage-3) ? (
                        <div>
                            <ToggleButtonGroup value={pageNo} size="large" exclusive onChange={setPagination}>
                                <ToggleButton style={{color: "white"}} value={1}>1</ToggleButton>
                                <ToggleButton style={{color: "white"}} value={0}>...</ToggleButton>
                                {pageCount.map(index=>(
                                    <ToggleButton style={{color: "white"}} value={index}>{index}</ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </div>
                    ) : (
                        <div>
                            <ToggleButtonGroup value={pageNo} size="large" exclusive onChange={setPagination}>
                                <ToggleButton style={{color: "white"}} value={1}>1</ToggleButton>
                                <ToggleButton style={{color: "white"}} value={0}>...</ToggleButton>
                                {pageCount.map(index=>(
                                    <ToggleButton style={{color: "white"}} value={index}>{index}</ToggleButton>
                                ))}
                                <ToggleButton style={{color: "white"}} value={0}>...</ToggleButton>
                                <ToggleButton style={{color: "white"}} value={maxPage}>{maxPage}</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    )}

                    {(pageNo !== maxPage) ? (
                        <Button onClick={() => setPagination(true, pageNo + 1)}>&gt;</Button>
                    ) : (
                        <p></p>
                    )}

                </div>
                <div>
                    <SelectBox
                        value={itemsPerPage}
                        onChange={(value) => {setNumPerPage(true, Number(value)); setPagination(true, 1)}}
                        options={[1, 3, 6, 9, 12, 24, 48]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
