import { FC } from "react";
import { ClassNames } from "@44north/classnames";

const Container: FC<{ className?: string | ClassNames }> = ({ className = "", children }) => (
    <section className={new ClassNames(["mx-auto", "max-w-layout"]).add(className).list()}>
        {children}
    </section>
);

export { Container };
