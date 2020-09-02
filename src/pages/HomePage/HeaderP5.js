
export const HeaderMedia = ( p ) => {
    let canvasDiv = document.getElementById('homeSection');
    let angleOffset = 0.0;
    let time = 0.0;

    const bgColor = '#0a0d0f';
    const color1 = '#539987';
    const color2 = '#52FFB8';

    const drawTriangle = function(x, y, size, flip) {
        const ratioOffset1 = 1.0;
        const ratioOffset2 = 0.9;
        const ratioOffset3 = 0.5;
        p.push();
        if (flip) {
            p.rotate(p.PI);
        }
        p.triangle(x, y+size*ratioOffset1, x+size*ratioOffset2, y-size*ratioOffset3, x-size*ratioOffset2, y-size*ratioOffset3);
        p.pop();
    }

    const getAngle = function(segmentNum, numSegments) {
        return p.map(segmentNum, 0, numSegments, 0.0, 2.0 * p.PI);
    }

    const drawSymbols = function() {
        p.push();
        p.translate(p.width / 2, p.height / 2);

        const numSegments = 16;
        
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) + angleOffset*0.75);
            p.translate(0, 800);
            drawTriangle(0, 0, 60, i % 2 !== 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments+10; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments+10) + angleOffset*0.75);
            p.translate(0, 500);
            drawTriangle(0, 0, 40, i % 2 !== 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) + angleOffset*0.75);
            p.translate(0, 350);
            drawTriangle(0, 0, 10, i % 2 !== 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) + angleOffset*0.75);
            p.translate(0, 200);
            drawTriangle(0, 0, 30, i % 2 !== 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) - angleOffset*1.1);
            p.translate(0, 100);
            drawTriangle(0, 0, 20, i % 2 === 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) + angleOffset*0.75);
            p.translate(0, 60);
            drawTriangle(0, 0, 10, i % 2 !== 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) - angleOffset*2.0);
            p.translate(0, 30);
            drawTriangle(0, 0, 5, i % 2 === 0 );
            p.pop();
        }
        for (let i = 0; i < numSegments; i++) {
            if (i % 2 === 0) {
                p.fill(color1);
            } else {
                p.fill(color2);
            }
            p.push();
            p.rotate(getAngle(i, numSegments) + angleOffset*1.3);
            p.translate(0, 15);
            drawTriangle(0, 0, 3, i % 2 !== 0 );
            p.pop();
        }

        p.pop();
    }

    p.setup = function() {
        p.createCanvas(0, 0);
        p.noStroke();
    };

    p.draw = function() {
        p.resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
        p.background(bgColor);
        angleOffset = Math.sin(time)*2.0;
        time += 0.001;

        drawSymbols();
    };
};