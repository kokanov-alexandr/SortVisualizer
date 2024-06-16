import * as index from'../index.js'
import * as colors from "../colors.js"

async function partition(rectangles, left, right) {
    let pivot = rectangles[right];
    let i = left - 1;
    index.paintRectangle(pivot, colors.PIVOT_COLOR);

    for (let j = left; j < right; j++) {
        if (index.getSortStatus() > 1) {
            return;
        }
        if (index.getHeightAsNumber(rectangles[j]) <= index.getHeightAsNumber(pivot)) {
            i++;
            index.paintRectangle(rectangles[j], colors.BAD_COLOR);
            await index.delay();
            index.paintRectangle(rectangles[i], colors.BAD_COLOR);
            await index.delay();
            index.swapRectangles(rectangles[i], rectangles[j]);
            index.paintRectangles(rectangles[j], rectangles[i], colors.DEFAULT_COLOR);
        }
        else {
            index.paintRectangle(rectangles[j], colors.GOOD_COLOR);
            await index.delay();
            index.paintRectangle(rectangles[j], colors.DEFAULT_COLOR);
        }
    }
    index.paintRectangles(rectangles[i + 1], rectangles[right], colors.BAD_COLOR);
    await index.delay();

    index.swapRectangles(rectangles[i + 1], rectangles[right]);
    index.paintRectangles(rectangles[i + 1], rectangles[right], colors.DEFAULT_COLOR);
    return i + 1;   
}

async function quickSort(rectangles = index.getRectangles(), left = 0, right = index.getRectangles().length - 1) {
    if (index.getSortStatus() > 1) {
        return;
    }
    if (left >= right) {
        return;
    }
    let pivot = await partition(rectangles, left, right);
    if (pivot == undefined) {
        return;
    }
    await quickSort(rectangles, left, pivot - 1);
    await quickSort(rectangles, pivot + 1, right);
}   

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(quickSort);
})



