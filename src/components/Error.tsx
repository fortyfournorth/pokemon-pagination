import { FC } from "react";
import { ClassNames } from "@44north/classnames";

const ErrorBlock: FC<{ error: Error | string; className?: string | ClassNames }> = ({
    error,
    className = ""
}) => {
    return (
        <p
            className={new ClassNames([
                "bg-red-200",
                "border-2",
                "border-red-800",
                "text-red-900",
                "rounded-lg",
                "p-4"
            ])
                .add(className)
                .list()}
        >
            {error instanceof Error ? error.message : error}
        </p>
    );
};

export { ErrorBlock };
