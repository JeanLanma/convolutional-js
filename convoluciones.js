const matrix = [
    [0, 1, 0],
    [1, -4, 1],
    [0, 1, 0]
];
const matrix2 = [
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
];
const boxBlurMatrix = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];
const focusMatrix = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
];

const sobelVertical = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

const sobelHorizontal = [
    [-1, -2, -1],
    [0,   0,  0],
    [1,   2,  1]
];

const image = new Image();
image.onload = imageLoaded;
image.src = 'brie.jpg';

function imageLoaded() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    const output = document.getElementById('output');

    blackAndWhite(canvas);

    convolutionFilter(canvas, output, focusMatrix);

}

function blackAndWhite(){
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        // const alpha = pixels[i + 3];

        const average = (red + green + blue) / 3;

        pixels[i] = average;
        pixels[i + 1] = average;
        pixels[i + 2] = average;
    }

    ctx.putImageData(imageData, 0, 0);

    // console.log(imageData);
}

function convolutionFilter(soruceCanvas, outputCanvas, matrix = matrix2) {
    const ctx = soruceCanvas.getContext('2d');
    const ctxOut = outputCanvas.getContext('2d');

    outputCanvas.width = soruceCanvas.width;
    outputCanvas.height = soruceCanvas.height;

    const imageData = ctx.getImageData(0, 0, soruceCanvas.width, soruceCanvas.height);
    const imageDataOut = ctxOut.getImageData(0, 0, soruceCanvas.width, soruceCanvas.height);

    const h = soruceCanvas.height;
    const w = soruceCanvas.width;

    const pixels = imageData.data;
    const pixelsOut = imageDataOut.data;

    for (let y = 1; y < h -1; y++) {
        for (let x = 1; x < w-1; x++) {

            const idx = ((y * w) + x) * 4;

            // const box1 = matrix[0][0] * pixels[((((y - 1) * w) + (x - 1)) * 4)];
            // const box2 = matrix[0][1] * pixels[((((y - 1) * w) + (x)) * 4)];
            // const box3 = matrix[0][2] * pixels[((((y - 1) * w) + (x + 1)) * 4)];
            // const box4 = matrix[1][0] * pixels[((((y) * w) + (x - 1)) * 4)];
            // const box5 = matrix[1][1] * pixels[((((y) * w) + (x)) * 4)];
            // const box6 = matrix[1][2] * pixels[((((y) * w) + (x + 1)) * 4)];
            // const box7 = matrix[2][0] * pixels[((((y + 1) * w) + (x - 1)) * 4)];
            // const box8 = matrix[2][1] * pixels[((((y + 1) * w) + (x)) * 4)];
            // const box9 = matrix[2][2] * pixels[((((y + 1) * w) + (x + 1)) * 4)];

            // const sum = box1 + box2 + box3 + box4 + box5 + box6 + box7 + box8 + box9;

            const boxY1 = sobelVertical[0][0] * pixels[((((y - 1) * w) + (x - 1)) * 4)];
            const boxY2 = sobelVertical[0][1] * pixels[((((y - 1) * w) + (x)) * 4)];
            const boxY3 = sobelVertical[0][2] * pixels[((((y - 1) * w) + (x + 1)) * 4)];
            const boxY4 = sobelVertical[1][0] * pixels[((((y) * w) + (x - 1)) * 4)];
            const boxY5 = sobelVertical[1][1] * pixels[((((y) * w) + (x)) * 4)];
            const boxY6 = sobelVertical[1][2] * pixels[((((y) * w) + (x + 1)) * 4)];
            const boxY7 = sobelVertical[2][0] * pixels[((((y + 1) * w) + (x - 1)) * 4)];
            const boxY8 = sobelVertical[2][1] * pixels[((((y + 1) * w) + (x)) * 4)];
            const boxY9 = sobelVertical[2][2] * pixels[((((y + 1) * w) + (x + 1)) * 4)];

            const sumY = boxY1 + boxY2 + boxY3 + boxY4 + boxY5 + boxY6 + boxY7 + boxY8 + boxY9;

            const boxX1 = sobelHorizontal[0][0] * pixels[((((y - 1) * w) + (x - 1)) * 4)];
            const boxX2 = sobelHorizontal[0][1] * pixels[((((y - 1) * w) + (x)) * 4)];
            const boxX3 = sobelHorizontal[0][2] * pixels[((((y - 1) * w) + (x + 1)) * 4)];
            const boxX4 = sobelHorizontal[1][0] * pixels[((((y) * w) + (x - 1)) * 4)];
            const boxX5 = sobelHorizontal[1][1] * pixels[((((y) * w) + (x)) * 4)];
            const boxX6 = sobelHorizontal[1][2] * pixels[((((y) * w) + (x + 1)) * 4)];
            const boxX7 = sobelHorizontal[2][0] * pixels[((((y + 1) * w) + (x - 1)) * 4)];
            const boxX8 = sobelHorizontal[2][1] * pixels[((((y + 1) * w) + (x)) * 4)];
            const boxX9 = sobelHorizontal[2][2] * pixels[((((y + 1) * w) + (x + 1)) * 4)];

            const sumX = boxX1 + boxX2 + boxX3 + boxX4 + boxX5 + boxX6 + boxX7 + boxX8 + boxX9;

            let sum = Math.sqrt((sumX * sumX) + (sumY * sumY));

            sum = (sum < 60 ) ? 0 : sum;

            pixelsOut[idx] = sum;
            pixelsOut[idx + 1] = sum;
            pixelsOut[idx + 2] = sum;
            pixelsOut[idx + 3] = 255;

            // pixelsOut[idx] = pixels[idx]
            // pixelsOut[idx + 1] = pixels[idx + 1]
            // pixelsOut[idx + 2] = pixels[idx + 2]
            // pixelsOut[idx + 3] = pixels[idx + 3]

        }
    }

    ctxOut.putImageData(imageDataOut, 0, 0);
}