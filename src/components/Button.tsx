import { FC } from "react";
import { ClassNames } from "@44north/classnames";

const Button: FC<{ onClick: () => void; className?: string | ClassNames }> = ({
    onClick = () => {},
    className = "",
    children
}) => {
    return (
        <button
            className={new ClassNames([
                "border",
                "rounded",
                "py-2 px-4",
                "bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600",
                "text-black dark:text-white"
            ])
                .add(className)
                .list()}
            onClick={(event) => {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                onClick();
            }}
        >
            {children}
        </button>
    );
};

export { Button };
