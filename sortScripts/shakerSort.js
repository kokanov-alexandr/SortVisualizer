import * as index from'../index.js'

async function shakerSort() {
    let rectangles = index.getRectangles();
    let swapped = true;
    let start = 0;
    let end = rectangles.length - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (index.getSortStatus() > 1) {
                return;
            }
            await index.processRectanglePair(rectangles[i], rectangles[i + 1]);
            swapped = true;
        }
        if (!swapped) {
            break;
        }

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            if (index.getSortStatus() > 1) {
                return;
            }
            await index.processRectanglePair(rectangles[i], rectangles[i + 1]);
            swapped = true;
        }
        start++;
    }
}

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(shakerSort);
})
