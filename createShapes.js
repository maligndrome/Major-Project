createPath = function(d, id = '', strokeWidth = 1, stroke = 'black', fill = 'white', fillOpacity = 0) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", stroke);
    path.setAttribute("fill", fill);
    path.setAttribute("fill-opacity", fillOpacity);
    path.setAttribute('d', d);
    if (id != '') {
        path.setAttribute('id', id);
    }
    path.setAttribute('stroke-width', strokeWidth);
    return path;
};
createCircle = function(x, y, r, id = '', strokeWidth = 1, stroke = 'black', fill = 'white', fillOpacity = 0) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("stroke", stroke);
    circle.setAttribute("fill", fill);
    circle.setAttribute("fill-opacity", fillOpacity);
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    if (id != '') {
        circle.setAttribute('id', id);
    }
    circle.setAttribute('stroke-width', strokeWidth);
    return circle;
}
createLine = function(x1, y1, x2, y2, id = '', strokeWidth = 1, stroke = 'black') {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", strokeWidth);
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);
    line.setAttribute('y1', y1);
    line.setAttribute('y2', y2);
    if (id != '') {
        line.setAttribute('id', id);
    }
    return line;
};

createRect = function(x, y, w, h, id = '', strokeWidth = 1, stroke = 'black', fill = 'white', fillOpacity = 0) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("stroke", stroke);
    rect.setAttribute("fill", fill);
    rect.setAttribute("fill-opacity", fillOpacity);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    if (id != '') {
        rect.setAttribute('id', id);
    }
    rect.setAttribute('stroke-width', strokeWidth);
    return rect;
};

createEllipse = function(x, y, rx, ry, id = '', strokeWidth = 1, stroke = 'black', fill = 'white', fillOpacity = 0) {
    var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("stroke", stroke);
    ellipse.setAttribute("fill", fill);
    ellipse.setAttribute("fill-opacity", fillOpacity);
    ellipse.setAttribute('cx', x);
    ellipse.setAttribute('cy', y);
    ellipse.setAttribute('rx', rx);
    ellipse.setAttribute('ry', ry);
    if (id != '') {
        ellipse.setAttribute('id', id);
    }
    ellipse.setAttribute('stroke-width', strokeWidth);
    return ellipse;
}

createPolygon = function(pointsString, id = '', strokeWidth = 1, stroke = 'black', fill = 'white', fillOpacity = 0) {
    var pline = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    pline.setAttribute("stroke", stroke);
    pline.setAttribute('points', pointsString);
    pline.setAttribute('fill-opacity', fillOpacity);
    pline.setAttribute('id', id);
    pline.setAttribute('stroke-width', strokeWidth);
    return pline;
}
