dimension = function(obj, mode, lP) {
    var id = '';
    if (obj.id.indexOf('aura') > -1) {
        id = obj.id.split('ra')[1];
    } else {
        id = obj.id;
    }
    dimObj = id;
    var tag = obj.tagName;
    if (tag == 'circle' || tag == 'path' && ['rad', 'dia'].indexOf(mode) > -1) {
        dimObjShape = tag;
        if (tag == 'circle')
            dimInitCircle(id, mode, lP);
        else
            dimInitArc(id, mode, lP);
    } else if (mode == 'len') {
        if (tag == 'rect') {
            dimObjShape = 'rect';
            dimInitRect(id, lP);
        } else if (tag == 'ellipse') {
            dimObjShape = 'ellipse';
            dimInitEllipse(id, lP);
        } else if (tag == 'line') {
            dimObjShape = 'line';
            dimInitLineLength(id, lP);
        } else if (tag == 'polygon') {
            dimObjShape = 'polygon';
            dimInitPolygon(id, lP);
        }
    } else if (mode == 'ang') {
        if (tag == 'line') {
            dimObjShape = 'line';
            if (dimCache.length == 0) {
                dimCache.push(id);
            } else {
                dimInitLinesAngle(dimCache.pop(), id, lP);
            }
        }
    }
}

dimInitPolygon = function(id, lP) {
    dimId = 4;
    var points = $('#' + id).attr('points').split(' ');
    var pts = [];
    var loc = 0;
    var d = 0;
    for (var j = 0; j < points.length; j++) {
        if (points[j] != "") {
            points[j] = points[j].split(',');
            pts.push({ x: points[j][0] / 1, y: points[j][1] / 1 });
        }
    }
    pts.push(pts[0]);
    for (var i = 1; i < pts.length; i++) {
        d = distToSegmentSq(lP.x, lP.y, pts[i - 1].x, pts[i - 1].y, pts[i].x, pts[i].y);
        console.log('distance from ', i, d);
        if (d < 100) {
            loc = i;
            break;
        }
    }
    //console.log(pts[loc],pts[loc-1]);
    if (pts[loc].y == pts[loc - 1].y) {
        if (loc == pts.length - 1) {
            var a1 = 0;
            var b = loc - 1;
        } else {
            var a1 = loc;
            var b = loc - 1;
        }
        dimCache = [pts[b], pts[a1], 'zero', 'dc'];
        var p2=pts[b];
        var p1=pts[a1];
        var line = createLine(p1.x, p1.y, p2.x, p2.y, 'dim-' + a1 + '_' + b + '-' + id, 0.5 * strokeWidth);
        dimObj = 'dim-' + a1 + '_' + b + '-' + id;
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(pts[a1].x, pts[a1].y, p1.x, p1.y, 'pro2-' + dimObj, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        line = createLine(pts[b].x, pts[b].y, p2.x, p2.y, 'pro1-' + dimObj, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-" + dimObj);
        text.setAttribute("x", lastPos.x - 10);
        text.setAttribute("y", lastPos.y - 10);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (25.4 * dist(pts[a1].x, pts[a1].y, pts[b].x, pts[b].y) / currRes).toFixed(leastCount) * 2;
        SVGRoot.appendChild(text);
        setDimension = true;
        return;
    }
    if (pts[loc].x == pts[loc - 1].x) {
        if (loc == pts.length - 1) {
            var a1 = 0;
            var b = loc - 1;
        } else {
            var a1 = loc;
            var b = loc - 1;
        }
        dimCache = [pts[b], pts[a1], 'Infy', 'dc'];
        var p2=pts[b];
        var p1=pts[a1];
        var line = createLine(p1.x, p1.y, p2.x, p2.y, 'dim-' + a1 + '_' + b + '-' + id, 0.5 * strokeWidth);
        dimObj = 'dim-' + a1 + '_' + b + '-' + id;
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(pts[a1].x, pts[a1].y, p1.x, p1.y, 'pro2-' + dimObj, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        line = createLine(pts[b].x, pts[b].y, p2.x, p2.y, 'pro1-' + dimObj, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        var theta = -90;
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-" + dimObj);
        text.setAttribute("x", lastPos.x - 10);
        text.setAttribute("y", lastPos.y - 10);
        text.setAttribute("transform", "rotate(" + theta + " " + (lastPos.x - 10) + " " + (lastPos.y - 10) + ")");
        text.setAttribute("data-theta", theta);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (25.4 * dist(pts[a1].x, pts[a1].y, pts[b].x, pts[b].y) / currRes).toFixed(leastCount) * 2;
        SVGRoot.appendChild(text);
        setDimension = true;
        return;
    }
    var a = (pts[loc].y - pts[loc - 1].y) / (pts[loc].x - pts[loc - 1].x);
    var c = pts[loc - 1].y - a * pts[loc - 1].x;
    var d1 = Math.sqrt(d * (a * a + 1));
    if (!isPtOnLine(lP.x, lP.y, a, -1, c + d1)) {
        console.log('not on the positive one!');
        d1 = -d1;
    }
    var p1 = linesIntersection2(-1 / a, pts[loc - 1].x, pts[loc - 1].y, a, -1, c + d1);
    var p2 = linesIntersection2(-1 / a, pts[loc].x, pts[loc].y, a, -1, c + d1);
    if (loc == pts.length - 1) {
        var a1 = 0;
        var b = loc - 1;
    } else {
        var a1 = loc;
        var b = loc - 1;
    }
    dimCache = [pts[b], pts[a1], a, c];
    var line = createLine(p1.x, p1.y, p2.x, p2.y, 'dim-' + a1 + '_' + b + '-' + id, 0.5 * strokeWidth);
    dimObj = 'dim-' + a1 + '_' + b + '-' + id;
    line.setAttribute('marker-start', 'url(#head)');
    line.setAttribute('marker-end', 'url(#head)');
    SVGRoot.appendChild(line);
    line = createLine(pts[a1].x, pts[a1].y, p1.x, p1.y, 'pro2-' + dimObj, 0.5 * strokeWidth);
    SVGRoot.appendChild(line);
    line = createLine(pts[b].x, pts[b].y, p2.x, p2.y, 'pro1-' + dimObj, 0.5 * strokeWidth);
    SVGRoot.appendChild(line);
    var theta = -180 * angPts(p1.x, p1.y, p2.x, p2.y, p1.x + 10, p1.y) / Math.PI;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "central");
    text.setAttribute("id", "text-" + dimObj);
    text.setAttribute("x", lastPos.x - 10);
    text.setAttribute("y", lastPos.y - 10);
    text.setAttribute("transform", "rotate(" + theta + " " + (lastPos.x - 10) + " " + (lastPos.y - 10) + ")");
    text.setAttribute("data-theta", theta);
    text.setAttribute("font-size", "50");
    text.innerHTML = '' + (25.4 * dist(pts[a1].x, pts[a1].y, pts[b].x, pts[b].y) / currRes).toFixed(leastCount) * 2;
    SVGRoot.appendChild(text);
    setDimension = true;
    return;
}
dimInitLineLength = function(id, lP) {
    // body...
}

dimInitArc = function(id, mode, lastPos) {
    if (mode == 'rad') {
        dimId = 5;
        var temp = splitPath($('#' + id).attr('d'))[0].params;
        var circ = convert(temp.x1, temp.y1, temp.x2, temp.y2, temp.large, temp.sweep, temp.rx, temp.ry, 0);
        var cx = circ.cx / 1;
        var cy = circ.cy / 1;
        var r = temp.rx / 1;
        $('#' + id).attr('cx', cx);
        $('#' + id).attr('cy', cy);
        $('#' + id).attr('r', r);
        var end = circleInfyLineIntersection(cx, cy, r, lastPos.x, lastPos.y, cx, cy);
        if (dist2(end[0].x, end[0].y, lastPos.x, lastPos.y) < dist2(end[1].x, end[1].y, lastPos.x, lastPos.y)) {
            end = end[0];
        } else {
            end = end[1];
        }
        dimObj = 'dim' + id;
        var line = createLine(end.x, end.y, cx, cy, 'dim' + id, 0.5 * strokeWidth);
        line.setAttribute('marker-start', 'url(#head)');
        SVGRoot.appendChild(line);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-dim" + id);
        text.setAttribute("x", lastPos.x);
        text.setAttribute("y", lastPos.y);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (25.4 * r / currRes).toFixed(leastCount);
        SVGRoot.appendChild(text);
        setDimension = true;
    }
}
dimInitCircle = function(id, mode, lastPos) {
    var r = $('#' + id).attr('r') / 1;
    if (mode == 'dia') {
        dimId = 0;
        var cx = $('#' + id).attr('cx') / 1;
        var cy = $('#' + id).attr('cy') / 1;
        var end = circleInfyLineIntersection(cx, cy, r, lastPos.x, lastPos.y, cx, cy);
        dimObj = 'dim' + id;
        var line = createLine(end[0].x, end[0].y, end[1].x, end[1].y, 'dim' + id, 0.5 * strokeWidth);
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-dim" + id);
        text.setAttribute("x", lastPos.x);
        text.setAttribute("y", lastPos.y);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (25.4 * r / currRes).toFixed(leastCount) * 2;
        SVGRoot.appendChild(text);
        setDimension = true;
    } else if (mode == 'rad') {
        dimId = 1;
        var cx = $('#' + id).attr('cx') / 1;
        var cy = $('#' + id).attr('cy') / 1;
        var end = circleInfyLineIntersection(cx, cy, r, lastPos.x, lastPos.y, cx, cy);
        if (dist2(end[0].x, end[0].y, lastPos.x, lastPos.y) < dist2(end[1].x, end[1].y, lastPos.x, lastPos.y)) {
            end = end[0];
        } else {
            end = end[1];
        }
        dimObj = 'dim' + id;
        var line = createLine(end.x, end.y, cx, cy, 'dim' + id, 0.5 * strokeWidth);
        line.setAttribute('marker-start', 'url(#head)');
        SVGRoot.appendChild(line);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-dim" + id);
        text.setAttribute("x", lastPos.x);
        text.setAttribute("y", lastPos.y);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (25.4 * r / currRes).toFixed(leastCount);
        SVGRoot.appendChild(text);
        setDimension = true;
    }

};

dimInitRect = function(id, lastPos) {
    var x1 = $('#' + id).attr('x') / 1;
    var y1 = $('#' + id).attr('y') / 1;
    var h = $('#' + id).attr('height') / 1;
    var w = $('#' + id).attr('width') / 1;
    var d1 = distToSegmentSq(lastPos.x, lastPos.y, x1, y1, x1 + w, y1); //top
    var d2 = distToSegmentSq(lastPos.x, lastPos.y, x1 + w, y1, x1 + w, y1 + h); //right
    var d3 = distToSegmentSq(lastPos.x, lastPos.y, x1 + w, y1 + h, x1, y1 + h); //bottom
    var d4 = distToSegmentSq(lastPos.x, lastPos.y, x1, y1 + h, x1, y1); //left
    dimId = 2;
    if (Math.min(d1, d3) < Math.min(d2, d4)) {
        //horizontal distance
        var line = createLine(x1, lastPos.y, x1 + w, lastPos.y, 'dimh' + id, 0.5 * strokeWidth);
        dimObj = 'dimh' + id;
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(x1, y1, x1, lastPos.y, 'pro1-dimh' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        line = createLine(x1 + w, y1, x1 + w, lastPos.y, 'pro2-dimh' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-dimh" + id);
        text.setAttribute("x", lastPos.x);
        text.setAttribute("y", lastPos.y);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (25.4 * w / currRes).toFixed(leastCount);
        SVGRoot.appendChild(text);
        setDimension = true;
    } else {
        //vertical distance
        var line = createLine(lastPos.x, y1, lastPos.x, y1 + h, 'dimv' + id, 0.5 * strokeWidth);
        dimObj = 'dimv' + id;
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(x1, y1, lastPos.x, y1, 'pro1-dimv' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        line = createLine(x1, y1 + h, lastPos.x, y1 + h, 'pro2-dimv' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("id", "text-dimv" + id);
        text.setAttribute("x", lastPos.x);
        text.setAttribute("y", lastPos.y);
        text.setAttribute("font-size", "50");
        text.innerHTML = '' + (h * 25.4 / currRes).toFixed(leastCount);
        SVGRoot.appendChild(text);
        $('#text-dimv' + id).click(function(e) {
            alert("trying to edit this, huh? ");
        })
        setDimension = true;
    }
};

dimInitEllipse = function(id, lastPos) {
    var cx = $('#' + id).attr('cx') / 1;
    var cy = $('#' + id).attr('cy') / 1;
    var rx = $('#' + id).attr('rx') / 1;
    var ry = $('#' + id).attr('ry') / 1;
    var d = dist2(cx, cy, lastPos.x, lastPos.y);
    dimId = 3;
    if (Math.abs(d - rx * rx) < Math.abs(d - ry * ry)) {
        //that is if the point is less deviant from small radius, dimension smaller radius
        var line = createLine(cx - rx, lastPos.y, cx + rx, lastPos.y, 'dimh' + id, 0.5 * strokeWidth);
        dimObj = 'dimh' + id;
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(cx - rx, cy, cx - rx, lastPos.y, 'pro1-dimh' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        line = createLine(cx + rx, cy, cx + rx, lastPos.y, 'pro2-dimh' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        setDimension = true;
    } else {
        var line = createLine(lastPos.x, cy - ry, lastPos.x, cy + ry, 'dimv' + id, 0.5 * strokeWidth);
        dimObj = 'dimv' + id;
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(cx, cy - ry, lastPos.x, cy - ry, 'pro1-dimv' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        line = createLine(cx, cy + ry, lastPos.x, cy + ry, 'pro2-dimv' + id, 0.5 * strokeWidth);
        SVGRoot.appendChild(line);
        setDimension = true;
    }
};

dimInitLinesAngle = function(line1, line2, lastPos) {
    var t = angLines($('#' + line1).attr('x1') / 1, $('#' + line1).attr('y1') / 1,
        $('#' + line1).attr('x2') / 1, $('#' + line1).attr('y2') / 1,
        $('#' + line2).attr('x1') / 1, $('#' + line2).attr('y1') / 1,
        $('#' + line2).attr('x2') / 1, $('#' + line2).attr('y2') / 1);

};
