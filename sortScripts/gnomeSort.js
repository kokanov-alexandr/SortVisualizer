import * as index from'../index.js'
import * as colors from "../colors.js"

async function gnomeSort() {
    let rectangles = index.getRectangles();
    let i = 0;
    while (i < rectangles.length) {
        if (index.getSortStatus() > 1) {
            return;
        }
        if  (i == 0) {
            i++;
        }
        if (index.getHeightAsNumber(rectangles[i]) >= index.getHeightAsNumber(rectangles[i - 1])) {
            index.paintRectangles(rectangles[i], rectangles[i - 1], colors.GOOD_COLOR);
            await index.delay();
            index.paintRectangles(rectangles[i], rectangles[i - 1], colors.DEFAULT_COLOR);
            i++;
        }
        else {
            index.paintRectangles(rectangles[i], rectangles[i - 1], colors.BAD_COLOR);
            await index.delay();
            index.swapRectangles(rectangles[i], rectangles[i - 1]);
            index.paintRectangles(rectangles[i], rectangles[i - 1], colors.DEFAULT_COLOR);
            i--;
        }
    }
}       

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(gnomeSort);
})
