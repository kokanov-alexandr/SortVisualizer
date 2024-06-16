import * as index from'../index.js'

async function bubbleSort() {
    let rectangles = index.getRectangles();
    for (let i = 0; i < rectangles.length; i++) {
        for (let j = 0; j < rectangles.length - i - 1; j++) {
            if (index.getSortStatus() > 1) {
                return;
            }
            await index.processRectanglePair(rectangles[j], rectangles[j + 1]);
        }
    }
}   

let btn = document.getElementById("sortBtn");
btn.addEventListener("click", () => {
    index.Sort(bubbleSort);
});