import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./../components";
import { ClassNames } from "@44north/classnames";

/**
 * Optional Setup to Use GraphQL API
 */
// import { useQuery, gql } from "@apollo/client";

interface IRecordSet {
    /**
     * Name of the Pokemon
     */
    name: string;
    /**
     * URL to get Pokemon Details
     */
    url: string;
}

function Homepage() {
    const [recordSet, setRecordSet] = useState<IRecordSet[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [pageNo, setPageNo] = useState<number>(1);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getData = () => {
        setIsLoading(true);
        setRecordSet([]);
        axios({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon",
            params: {
                limit: itemsPerPage,
                offset: (pageNo - 1) * itemsPerPage
            }
        })
            .then((response) => {
                if ((response.data?.results || []).length === 0) {
                    setError(`No Results Found at page ${pageNo}`);
                } else {
                    setRecordSet(response.data.results);
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.response.status || error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setError(undefined);
        getData();
    }, [pageNo, itemsPerPage]);

    return (
        <div className={new ClassNames(["flex", "flex-col", "gap-4"]).list()}>
            {error && (
                <p
                    className={new ClassNames([
                        "bg-red-200",
                        "border-2",
                        "border-red-800",
                        "text-red-900",
                        "rounded-lg",
                        "p-4"
                    ]).list()}
                >
                    {error}
                </p>
            )}

            {isLoading ? (
                <p>I am Loading...</p>
            ) : (
                <ul>
                    {recordSet.map((record) => (
                        <li key={record.name}>{record.name}</li>
                    ))}
                </ul>
            )}

            <div className={new ClassNames(["flex", "gap-2", "items-center"]).list()}>
                <Button onClick={() => setPageNo(pageNo - 1)}>Previous Page</Button>
                <p>{pageNo}</p>
                <Button onClick={() => setPageNo(pageNo + 1)}>Next Page</Button>
            </div>
        </div>
    );
}

export default Homepage;
