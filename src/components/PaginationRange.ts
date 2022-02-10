import { useMemo } from "react";

function range(start: number, end: number): number[] {
    const result = [];
    if (start == end) return [start];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

export function usePagination(
    totalPageCount: number,
    itemsPerPage: number,
    siblingCount: number = 1,
    currentPage: number
) {
    const paginationRange = useMemo<number[]>((): number[] => {
        const totalPageNumber = siblingCount + 5;

        if (totalPageCount <= totalPageNumber) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDot = leftSiblingIndex > 2;
        const shouldShowRightDot = rightSiblingIndex < totalPageCount - 1;

        const firstIndex = 1;
        const dotIndex = -1;

        if (!shouldShowLeftDot && shouldShowRightDot) {
            const leftRange = range(1, rightSiblingIndex);
            return [...leftRange, dotIndex, totalPageCount];
        } else if (shouldShowLeftDot && !shouldShowRightDot) {
            const rightRange = range(leftSiblingIndex, totalPageCount);
            return [firstIndex, dotIndex, ...rightRange];
        } else {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstIndex, dotIndex, ...middleRange, dotIndex, totalPageCount];
        }
    }, [totalPageCount, itemsPerPage, siblingCount, currentPage]);

    return paginationRange;
}
