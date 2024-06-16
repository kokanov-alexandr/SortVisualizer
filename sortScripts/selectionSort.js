import * as index from'../index.js'
import * as colors from "../colors.js"

async function selectionSort() {
    let rectangles = index.getRectangles();
    for (let i = 0; i < rectangles.length; i++) {
        let m = i;
        for (let j = i + 1; j < rectangles.length; j++) {
            if (index.getSortStatus() > 1) {
                return;
            }            
            if (index.getHeightAsNumber(rectangles[m]) > index.getHeightAsNumber(rectangles[j])) {
                index.paintRectangles(rectangles[m], rectangles[j], colors.BAD_COLOR);
                await index.delay();
                index.paintRectangles(rectangles[m], rectangles[j], colors.DEFAULT_COLOR);
                m = j;
            }
            else {
                index.paintRectangles(rectangles[m], rectangles[j], colors.GOOD_COLOR);
                await index.delay();
                index.paintRectangles(rectangles[m], rectangles[j], colors.DEFAULT_COLOR);
            }
        }
        await index.processRectanglePair(rectangles[i], rectangles[m]);
    }
}   

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(selectionSort);
})
