import React, { useState, useEffect, useMemo } from "react";
import { FC } from "react";
import { Button } from "./Button";

const Pagination: FC<{ totalCount: number, itemsPerPage: number, pageNo: number, setPageNo: (value :number) => void }> = ({
    totalCount,
    itemsPerPage,
    pageNo,
    setPageNo
}) => {
    // Amount of neighbors on either side of the current pageNo. (default: 2)
    const siblings = 2
    // Amount of visible page numbers per page. (default: 5)
    const _fixedCount = (siblings * 2) + 1
    // Total amount of pages needed.
    let pageCount = Math.ceil(totalCount / itemsPerPage)
    // List of current page numbers
    const [pageList, setPageList] = useState<number[] | []>([])
    
    // Generates a numbered list from `start` to `end` inclusive.
    const rangeList = (start: number, end: number): number[] => {
        if (end < start) return []
        return Array.from(Array(end - start + 1), (_, index) => index + start)
    }

    // Generates a numbered list around a `middle` value, with specified amounts of siblings on either side.
    const wrapList = (middle: number, siblings: number = 2): number[] => {
        return Array.from(Array(_fixedCount), (_, index) => shift(index + middle, -siblings, pageCount))
    }

    // Shifts a number in a range. Wraps around when out of bound (both direction).
    const shift = (curr: number, amount: number, length: number): number => {
        const value = amount < 0 ? (amount + length) : amount
        return (curr + value - 1) % length + 1
    }
    
    useMemo(() => {
        // Amount of pages needed
        pageCount = Math.ceil(totalCount / itemsPerPage)

        // Case 1: No logic required
        if (pageCount <= _fixedCount) {
            setPageList(rangeList(1, pageCount))
        }
        // Case 2: Page Number 1 & 2 (No Centering)
        else if (pageNo - siblings <= 0) {
            setPageList(rangeList(1, _fixedCount))
        }
        // Case 3: Page Number Max & Max-1 (No Centering)
        else if (pageNo + siblings >= pageCount) {
            setPageList(rangeList(pageCount - _fixedCount + 1, pageCount))
        }
        // Case 4: Center Current Page Number
        else {
            setPageList(wrapList(pageNo, siblings))
        }
    }, [pageNo, itemsPerPage]);

    return <div className="flex items-center space-x-2">
                <Button onClick={() => setPageNo(shift(pageNo, -1, pageCount))}>
                    {/* LEFT ARROW ICON */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Button>
                <div className="space-x-2">
                    {
                        pageList.map((i: number) => 
                            <Button 
                                key={i}
                                className={"text-xs lg:text-base"} 
                                selected={pageNo === i} 
                                onClick={() => setPageNo(i)}>
                                {i}
                            </Button>
                        )
                    }
                </div>
                <Button onClick={() => setPageNo(shift(pageNo, 1, pageCount))}>
                    {/* RIGHT ARROW ICON */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Button>
            </div>
}

export { Pagination };