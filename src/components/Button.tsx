import { FC } from "react";
import { ClassNames } from "@44north/classnames";

const Button: FC<{ onClick: () => void; className?: string | ClassNames; disabled?: boolean }> = ({
    onClick = () => {},
    className = "",
    children,
    disabled = false,
    ...props
}) => {
    const btnClassNames = new ClassNames([
        "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    ]).add(className);

    if (disabled) {
        btnClassNames.add("cursor-not-allowed").add("bg-gray-700 text-gray-500");
    }

    if (!btnClassNames.has(new RegExp("^bg-"))) {
        btnClassNames.add("bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600");
    }
    if (!btnClassNames.has(new RegExp("^text-"))) {
        btnClassNames.add("text-black dark:text-white");
    }

    return (
        <button
            {...props}
            disabled={disabled}
            className={btnClassNames.list()}
            onClick={(event) => {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                if (disabled) {
                    return;
                }

                onClick();
            }}
        >
            {children}
        </button>
    );
};

export { Button };
