import { FC } from "react";
import { ClassNames } from "@44north/classnames";

const Button: FC<{ onClick: () => void; className?: string | ClassNames; disabled?: boolean; selected?: boolean }> = ({
    onClick = () => {},
    className = "",
    children,
    disabled = false,
    selected = false,
    ...props
}) => {
    const btnClassNames = new ClassNames([
        "inline-flex items-center px-2 lg:px-4 py-2 border border-transparent text-base font-medium rounded-full"
    ]).add(className);

    if (selected) {
        btnClassNames.add("bg-blue-500 focus:bg-blue-500");
    }
    if (disabled) {
        btnClassNames.add("bg-gray-700");
    }
    if (!btnClassNames.has(new RegExp("^bg-"))) {
        btnClassNames.add("hover:bg-[#0004] dark:hover:bg-[#0004]");
    }
    if (!btnClassNames.has(new RegExp("^text-"))) {
        btnClassNames.add("text-black dark:text-white");
    }

    return (
        <button
            {...props}
            disabled={disabled || selected}
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
