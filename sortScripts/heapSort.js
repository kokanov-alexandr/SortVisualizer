import * as index from'../index.js'
import * as colors from "../colors.js"

async function heapify(rectangles, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (index.getSortStatus() > 1) {
        return;
    }
    
    if (left < n) {
        if (index.getHeightAsNumber(rectangles[left]) > index.getHeightAsNumber(rectangles[largest])) {
            index.paintRectangle(rectangles[largest], colors.PIVOT_COLOR);
            await index.delay();
            index.paintRectangles(rectangles[left], rectangles[largest], colors.BAD_COLOR);
            await index.delay();
            index.paintRectangle(rectangles[largest], colors.DEFAULT_COLOR);
            index.paintRectangle(rectangles[left], colors.PIVOT_COLOR);
            largest = left;
        }
    }
   
    
    if (right < n) {
        if (index.getHeightAsNumber(rectangles[right]) > index.getHeightAsNumber(rectangles[largest])) {
            index.paintRectangle(rectangles[largest], colors.PIVOT_COLOR);
            await index.delay();
            index.paintRectangles(rectangles[right], rectangles[largest], colors.BAD_COLOR);
            await index.delay();
            index.paintRectangle(rectangles[largest], colors.DEFAULT_COLOR);
            index.paintRectangle(rectangles[right], colors.PIVOT_COLOR);
            largest = right;
        }
    }

    index.paintRectangle(rectangles[largest], colors.DEFAULT_COLOR);

    if (largest != i) {
        index.paintRectangles(rectangles[i], rectangles[largest], colors.BAD_COLOR);
        await index.delay();
        index.swapRectangles(rectangles[i], rectangles[largest]);
        index.paintRectangles(rectangles[i], rectangles[largest], colors.DEFAULT_COLOR);
        await heapify(rectangles, n, largest);
    }

}
async function heapSort() {
    let rectangles = index.getRectangles();
    let n = rectangles.length;
    for (let i = Math.round(n / 2) - 1; i >= 0; i--) {
        await heapify(rectangles, n, i);
    }
    for (let i = n - 1; i >= 0; i--) {
        index.swapRectangles(rectangles[0], rectangles[i]);
        await heapify(rectangles, i, 0);
    }
}   


let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(heapSort);
})
