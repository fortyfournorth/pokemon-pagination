import React, { FC } from "react";
import Head from "next/head";
import { ClassNames } from "@44north/classnames";
import { Button } from "./Button";

const Layout: FC<{ title?: string }> = ({ children, title = "The Page!" }) => {
    const cellPadding = new ClassNames(["py-2", "px-4"]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main
                className={new ClassNames([
                    "min-h-screen",
                    "grid",
                    "grid-cols-1",
                    "grid-rows-layout"
                ]).list()}
            >
                <header
                    className={new ClassNames([
                        "bg-gray-200 dark:bg-gray-800",
                        "text-gray-900 dark:text-gray-200"
                    ])
                        .add(cellPadding)
                        .add(["flex", "justify-between", "items-center"])
                        .list()}
                >
                    <h1
                        className={new ClassNames([
                            "text-4xl",
                            "font-bold",
                            "font-serif",
                            "my-4"
                        ]).list()}
                    >
                        {title}
                    </h1>
                    <div>
                        <Button
                            onClick={() => {
                                window.open("/api/graphql", "_blank");
                            }}
                        >
                            GraphQL
                        </Button>
                    </div>
                </header>
                <section
                    className={new ClassNames([
                        "bg-white dark:bg-gray-700",
                        "text-black dark:text-gray-100"
                    ])
                        .add(cellPadding)
                        .list()}
                >
                    {children}
                </section>
                <footer
                    className={new ClassNames([
                        "bg-gray-200 dark:bg-gray-800",
                        "text-gray-900 dark:text-gray-100"
                    ])
                        .add(cellPadding)
                        .list()}
                >
                    <p
                        className={new ClassNames([
                            "font-serif",
                            "text-sm",
                            "text-center",
                            "text-gray-500"
                        ]).list()}
                    >
                        &copy;{" "}
                        <a href="https://44north.dev" target="_blank">
                            44North.dev
                        </a>{" "}
                        {new Date().getFullYear()}
                    </p>
                </footer>
            </main>
        </>
    );
};

export { Layout };
