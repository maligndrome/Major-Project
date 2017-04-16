lineTwoPointInit = function(line) {
    if (autoSnapActive) {
        coords = { x: cursor.getAttribute('cx'), y: cursor.getAttribute('cy') };
        line.setAttribute('x1', coords.x / 1);
        line.setAttribute('x2', coords.x / 1 + 1);
        line.setAttribute('y1', coords.y / 1);
        line.setAttribute('y2', coords.y / 1 + 1);
    } else {
        line.setAttribute('x1', lastPos.x / 1);
        line.setAttribute('x2', lastPos.x / 1 + 1);
        line.setAttribute('y1', lastPos.y / 1);
        line.setAttribute('y2', lastPos.y / 1 + 1);
    }
};
lineOnePointAngleInit = function(line) {
    if (autoSnapActive) {
        coords = { x: cursor.getAttribute('cx'), y: cursor.getAttribute('cy') };
        line.setAttribute('x1', coords.x / 1);
        line.setAttribute('x2', coords.x / 1 + 1);
        line.setAttribute('y1', coords.y / 1);
        line.setAttribute('y2', coords.y / 1 + 1);
    } else {
        line.setAttribute('x1', lastPos.x / 1);
        line.setAttribute('x2', lastPos.x / 1 + 1);
        line.setAttribute('y1', lastPos.y / 1);
        line.setAttribute('y2', lastPos.y / 1 + 1);
    }
};
lineInitFlags=[lineTwoPointInit,lineOnePointAngleInit];