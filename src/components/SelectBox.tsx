import React, { FC, useState, useEffect, Fragment, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import ClassNames from "@44north/classnames";

type SelectBoxValueType = string | number | boolean;
interface SelectBoxValueOptionObject {
    label: string;
    value: SelectBoxValueType;
}
type SelectBoxValueOption = SelectBoxValueType | SelectBoxValueOptionObject;
const SelectBox: FC<{
    className?: string | ClassNames;
    value: SelectBoxValueType;
    onChange: (value: SelectBoxValueType) => void;
    options: SelectBoxValueOption[];
}> = ({ value, onChange, options = [], className = "" }) => {
    const [currentValue, setCurrentValue] = useState<SelectBoxValueType>(value);
    const thisInput = useRef();
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const mapOptionToObject = (opt: SelectBoxValueOption): SelectBoxValueOptionObject => {
        if (typeof opt === "object") {
            return opt;
        } else {
            return {
                label: String(opt),
                value: opt
            };
        }
    };

    const isNearBottom = (): boolean => {
        const maxHeightOfOptionList = 240;
        if (thisInput && window !== undefined) {
            const screenTwoThirds = window.innerHeight - window.innerHeight / 3;
            const node: HTMLElement = thisInput.current;
            const elemPos = node.getBoundingClientRect();

            return elemPos.top + maxHeightOfOptionList > screenTwoThirds;
        }

        return false;
    };

    return (
        <Listbox value={currentValue} onChange={onChange}>
            <div className={new ClassNames("relative").list()} ref={thisInput}>
                <Listbox.Button
                    className={new ClassNames([
                        "relative w-full py-2 pl-3 pr-10 text-left bg-white text-gray-900 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                    ]).list()}
                >
                    <span className={new ClassNames(["block"]).list()}>{currentValue}</span>
                    <span
                        className={new ClassNames([
                            "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                        ]).list()}
                    >
                        <SelectorIcon
                            className={new ClassNames(["w-5 h-5", "text-gray-400"]).list()}
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className={({ open }) =>
                            new ClassNames([
                                "absolute right-0",
                                "py-1 mt-1",
                                "overflow-y-scroll",
                                "text-base sm:text-sm  bg-white text-gray-900",
                                "rounded-md",
                                "shadow-lg",
                                "max-h-60",
                                "ring-1 ring-black ring-opacity-5 focus:outline-none"
                            ])
                                .add({
                                    "bottom-12": open ? isNearBottom() : false
                                })
                                .list()
                        }
                    >
                        {options.map(mapOptionToObject).map((opt) => (
                            <Listbox.Option
                                key={`itemsPerPageValue-${opt.value}`}
                                value={opt.value}
                                className={({ active }) =>
                                    new ClassNames([
                                        "relative",
                                        "cursor-default",
                                        "select-none",
                                        "py-2 pl-10 pr-12"
                                    ])
                                        .add({ "text-amber-900 bg-amber-100": active })
                                        .list()
                                }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={new ClassNames("block")
                                                .add({ "font-medium": selected })
                                                .list()}
                                        >
                                            {opt.label}
                                        </span>
                                        {selected && (
                                            <span
                                                className={new ClassNames([
                                                    "absolute inset-y-0 left-0 flex items-center pl-3"
                                                ])
                                                    .add({ "text-amber-600": active })
                                                    .list()}
                                            >
                                                <CheckIcon
                                                    className={new ClassNames(["w-5 h-5"]).list()}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export { SelectBox };
