import * as index from'../index.js'
import * as colors from "../colors.js"

async function insertionSort() {
    let rectangles = index.getRectangles();
    for (let i = 1; i < rectangles.length; i++) {
        if (index.getSortStatus() > 1) {
            return;
        }        
        let temp = rectangles[i].cloneNode(true);
        let j = 0;
        for (; j < i && index.getHeightAsNumber(rectangles[j]) < index.getHeightAsNumber(temp); j++) {
            index.paintRectangles(rectangles[j], temp, colors.GOOD_COLOR);
            await index.delay();
            index.paintRectangles(rectangles[j], temp, colors.DEFAULT_COLOR);
        } 
        index.paintRectangles(rectangles[j], temp, colors.BAD_COLOR);
        await index.delay();
        index.paintRectangles(rectangles[j], temp, colors.DEFAULT_COLOR);

        for (let k = i; k > j; --k) {
            index.paintRectangle(rectangles[k], colors.BAD_COLOR);
            await index.delay();
            index.changeRectangleValue(rectangles[k], rectangles[k - 1]);
            index.paintRectangle(rectangles[k], colors.DEFAULT_COLOR);
        }
        index.paintRectangle(rectangles[j], colors.BAD_COLOR);
        await index.delay();
        index.changeRectangleValue(rectangles[j], temp);
        index.paintRectangle(rectangles[j], colors.DEFAULT_COLOR);
    }
}   

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(insertionSort);
})
