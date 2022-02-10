import ClassNames from "@44north/classnames";
import { FC, useEffect, useState } from "react";
import { Button, SelectBox } from ".";
import { usePagination } from "./PaginationRange";

const PaginationComponent: FC<{
    totalElements: number;
    currentPage: number;
    itemPerPageProp?: number;
    onCurrentPageChange: Function;
    onItemsPerPageChange: Function;
}> = ({
    totalElements,
    currentPage = 1,
    itemPerPageProp = 12,
    onCurrentPageChange,
    onItemsPerPageChange
}) => {
    const [pageNo, setPageNo] = useState<number>(currentPage);
    const [itemPerPage, setItemPerPage] = useState<number>(itemPerPageProp);
    const [totalPages, setTotalPages] = useState<number>(
        Math.ceil(totalElements / itemPerPageProp)
    );
    const [totalElementState] = useState<number>(totalElements);

    const pageNumberClass = new ClassNames([
        "rounded",
        "hover:text-gray-800",
        "hover:bg-gray-200",
        "focus:shadow-none",
        "transition-all",
        "duration-200",
        "p-2",
        "cursor-default"
    ]);
    const pageNumberActiveClass = new ClassNames([
        "rounded",
        "text-gray-800",
        "bg-gray-200",
        "focus:shadow-none",
        "transition-all",
        "duration-200",
        "px-2",
        "py-1.5",
        "cursor-default"
    ]);

    useEffect(() => {
        const newTotalPages = calculateTotalPage();

        if (newTotalPages != totalPages) {
            setTotalPages(newTotalPages);
        }

        if (pageNo != currentPage) {
            onCurrentPageChange(pageNo);
        }

        if (itemPerPage != itemPerPageProp) {
            onItemsPerPageChange(itemPerPage);
            resetCurrentPageToDefaultState();
        }
    }, [pageNo, itemPerPage]);

    const pageList = usePagination(totalPages, itemPerPage, 1, pageNo);

    function resetCurrentPageToDefaultState(): void {
        setPageNo(1);
    }

    function calculateTotalPage(): number {
        return Math.ceil(totalElementState / itemPerPage);
    }

    function pageNumberChange(newPageNumber: number): void {
        if (newPageNumber > 0 && newPageNumber <= totalPages) {
            setPageNo(newPageNumber);
        }
    }

    return (
        <>
            <div className={new ClassNames(["italic", "text-sm", "font-light"]).list()}>
                <p>{`Showing page ${pageNo} of ${totalPages} pages`}</p>
            </div>
            <div
                className={new ClassNames([
                    "flex",
                    "justify-between items-center",
                    "space-x-8"
                ]).list()}
            >
                <div className={new ClassNames(["flex", "space-x-2", "items-center"]).list()}>
                    <Button disabled={pageNo == 1} onClick={() => pageNumberChange(pageNo - 1)}>
                        Previous Page
                    </Button>
                    {pageList.map((pageNumber, index) =>
                        pageNumber < 0 ? (
                            <a key={index}>&#8230;</a>
                        ) : (
                            <a
                                key={index}
                                className={
                                    pageNumber == pageNo
                                        ? pageNumberActiveClass.list()
                                        : pageNumberClass.list()
                                }
                                onClick={() => pageNumberChange(pageNumber)}
                            >
                                {pageNumber}
                            </a>
                        )
                    )}
                    <Button
                        disabled={pageNo == totalPages}
                        onClick={() => pageNumberChange(pageNo + 1)}
                    >
                        Next Page
                    </Button>
                </div>
                <div>
                    <SelectBox
                        value={itemPerPage}
                        onChange={(value) => setItemPerPage(Number(value))}
                        options={[1, 3, 6, 9, 12, 24, 48]}
                    />
                </div>
            </div>
        </>
    );
};

export { PaginationComponent };
