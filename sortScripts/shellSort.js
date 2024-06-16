shellSort

import * as index from'../index.js'
import * as colors from "../colors.js"

async function shellSort() {
    let rectangles = index.getRectangles();
    let d = rectangles.length;  
    for (let i = Math.floor(d / 2); i > 0; i = Math.floor(i / 2)) {
        for (let j = i; j < d; j++) {
            for (let k = j - i; k >= 0; k -= i) {
                if (index.getSortStatus() > 1) {
                    return;
                }
                if (index.getHeightAsNumber(rectangles[k + i]) >= index.getHeightAsNumber(rectangles[k])) {
                    index.paintRectangles(rectangles[k + i], rectangles[k], colors.GOOD_COLOR);
                    await index.delay();
                    index.paintRectangles(rectangles[k + i], rectangles[k], colors.DEFAULT_COLOR);
                    break;
                }
                else {
                    index.paintRectangles(rectangles[k + i], rectangles[k], colors.BAD_COLOR);
                    await index.delay();
                    index.paintRectangles(rectangles[k + i], rectangles[k], colors.DEFAULT_COLOR);
                    index.swapRectangles(rectangles[k + i], rectangles[k]);
                }
            }            
        }
        
    }
}   

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(shellSort);
})
