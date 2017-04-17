rect = function() {
    id = activeObj;
    delX = cursor.x - lastPos.x;
    if (delX > 0) {
        $('#' + id).attr('x', lastPos.x);
        $('#' + id).attr('width', cursor.x - lastPos.x);
    } else {
        $('#' + id).attr('x', cursor.x);
        $('#' + id).attr('width', -cursor.x + lastPos.x);
    }
    dely = cursor.y - lastPos.y;
    if (dely > 0) {
        $('#' + id).attr('y', lastPos.y);
        $('#' + id).attr('height', cursor.y - lastPos.y);
    } else {
        $('#' + id).attr('y', cursor.y);
        $('#' + id).attr('height', -cursor.y + lastPos.y);
    }
}
circle = function() {
    id = activeObj;
    var r = dist(lastPos.x, lastPos.y, cursor.x, cursor.y);
    $('#' + id).attr('r', r);
}
threePtCircle = function() {
    path = '';
    path += 'M' + threePtRegister[0] + ' ' + threePtRegister[1];
    for (var i = 2; i < threePtRegister.length; i += 2) {
        path += ' L' + threePtRegister[i] + ' ' + threePtRegister[i + 1] + ' M' + threePtRegister[i] + ' ' + threePtRegister[i + 1];
    }
    path += ' L' + cursor.x + ' ' + cursor.y;
    $('#temp').attr('d', path);
    if (threePtRegister.length == 2) {
        hkr = diaCircleParams([threePtRegister[0], threePtRegister[1], cursor.x, cursor.y]);
        $('#temp2').attr('cx', hkr[0]);
        $('#temp2').attr('cy', hkr[1]);
        $('#temp2').attr('r', hkr[2]);
    } else {
        hkr = circleParams([threePtRegister[0], threePtRegister[1], threePtRegister[2], threePtRegister[3], cursor.x, cursor.y]);
        $('#temp2').attr('cx', hkr[0]);
        $('#temp2').attr('cy', hkr[1]);
        $('#temp2').attr('r', hkr[2]);
    }
    return;
}
diaCircle = function() {
    var cursor2={x:cursor.x,y:cursor.y};
    path = '';
    path += 'M' + diaCircleRegister[0] + ' ' + diaCircleRegister[1] + ' L' + cursor2.x + ' ' + cursor2.y;
    $('#temp').attr('d', path);
    hkr = diaCircleParams([diaCircleRegister[0], diaCircleRegister[1], cursor2.x, cursor2.y]);
    $('#temp2').attr('cx', hkr[0]);
    $('#temp2').attr('cy', hkr[1]);
    $('#temp2').attr('r', hkr[2]);
}
line = function() {
    id = activeObj;
    if (autoSnapActive) {
        coords = showSnapPos(cursor.x, cursor.y);
        $('#' + id).attr('x2', coords.x).attr('y2', coords.y);
    } else {
        $('#' + id).attr('x2', cursor.x).attr('y2', cursor.y);
    }
}
lineAngle = function() {
    id = activeObj;
    //var len = dist(x1, y1, cursor.x, cursor.y);
    if (lineAnglePt) {
        if (autoSnapActive) {
            coords = showSnapPos(cursor.x, cursor.y);
            $('#' + id).attr('x2', coords.x).attr('y2', coords.y);
        } else {
            $('#' + id).attr('x2', cursor.x).attr('y2', cursor.y);
        }
    }
}
polyLine = function() {
        if (ongoing) {
            $('#coordX').html(cursor.x);
            $('#coordY').html(cursor.y);
            $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
            $('#temp').attr('points', $('#temp').attr('points').split(' ')[0] + ' ' + cursor.x + ',' + cursor.y);
        }
    }
    // polygon = function(origin, sides, side, inscribed) {
    //     objCount += 1;
    //     var a = 360.0 / sides;
    //     var r = (side / 2) / Math.sin(Math.PI / sides);
    //     var points = '';
    //     for (var i = 0; i <= sides; i++) {
    //         points += (origin[0] + r * Math.cos(2 * Math.PI * i / sides)) + ',' + (origin[1] + r * Math.sin(2 * Math.PI * i / sides)) + ' ';
    //     }
    //     var pline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    //     pline.setAttribute("stroke", "black");
    //     pline.setAttribute('points', points);
    //     pline.setAttribute('fill-opacity', 0);
    //     pline.setAttribute('id', objCount);
    //     SVGRoot.appendChild(pline);
    // };

threePtEllipse = function() {
    path = '';
    path += 'M' + threePtRegister[0] + ' ' + threePtRegister[1];
    for (var i = 2; i < threePtRegister.length; i += 2) {
        path += ' L' + threePtRegister[i] + ' ' + threePtRegister[i + 1] + ' M' + threePtRegister[i] + ' ' + threePtRegister[i + 1];
    }
    path += ' L' + cursor.x + ' ' + cursor.y;
    $('#temp').attr('d', path);
    return;
};

fociEllipse = function() {
    path = '';
    path += 'M' + threePtRegister[0] + ' ' + threePtRegister[1];
    for (var i = 2; i < threePtRegister.length; i += 2) {
        path += ' L' + threePtRegister[i] + ' ' + threePtRegister[i + 1] + ' M' + threePtRegister[i] + ' ' + threePtRegister[i + 1];
    }
    path += ' L' + cursor.x + ' ' + cursor.y;
    $('#temp').attr('d', path);
    if (threePtRegister.length == 4) {
        var ellipseTemp = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipseTemp.setAttribute('style', 'z-index:1');
        ellipseTemp.setAttribute("stroke", "black");
        ellipseTemp.setAttribute("fill", "white");
        ellipseTemp.setAttribute("fill-opacity", "0");
        ellipseTemp.setAttribute('id', 'temp2');
        ellipseTemp.setAttribute('stroke-width', '1');
        SVGRoot.appendChild(ellipseTemp);
        xyr = ellipseFociParams([threePtRegister[0], threePtRegister[1], threePtRegister[2], threePtRegister[3], cursor.x, cursor.y]);
        $('#temp2').attr('cx', xyr[0]);
        $('#temp2').attr('cy', xyr[1]);
        $('#temp2').attr('rx', xyr[2]);
        $('#temp2').attr('ry', xyr[3]);
        $('#temp2').attr('transform', 'rotate(' + xyr[4] + ' ' + xyr[0] + ' ' + xyr[1] + ')');
    }
    return;
}

polygon = function() {
    if (ongoing)
        $('#temp').attr('points', $('#temp').attr('points').split(' ')[0] + ' ' + cursor.x + ',' + cursor.y + ' ' + $('#' + activeObj).attr('first'));
}

arc3pt = function() {
    path = '';
    var cursor2 = { x: cursor.x, y: cursor.y };
    path += 'M' + threePtRegister[0] + ' ' + threePtRegister[1];
    for (var i = 2; i < threePtRegister.length; i += 2) {
        path += ' L' + threePtRegister[i] + ' ' + threePtRegister[i + 1] + ' M' + threePtRegister[i] + ' ' + threePtRegister[i + 1];
    }
    path += ' L' + cursor2.x + ' ' + cursor2.y;
    $('#temp').attr('d', path);
    if (threePtRegister.length == 2) {
        hkr = diaCircleParams([threePtRegister[0], threePtRegister[1], cursor2.x, cursor2.y]);
        var d = describeArc(hkr[0], hkr[1], hkr[2], getThetaPtCircle(hkr[0], hkr[1], threePtRegister[0], threePtRegister[1]), getThetaPtCircle(hkr[0], hkr[1], cursor2.x, cursor2.y));
        $('#temp2').attr('d', d);
    } else {
        hkr = circleParams([threePtRegister[0], threePtRegister[1], threePtRegister[2], threePtRegister[3], cursor2.x, cursor2.y]);
        var d = describeArc(hkr[0], hkr[1], hkr[2], getThetaPtCircle(hkr[0], hkr[1], threePtRegister[0], threePtRegister[1]), getThetaPtCircle(hkr[0], hkr[1], cursor2.x, cursor2.y));
        $('#temp2').attr('d', d);
        if (checkPtOnPath('temp2', { x: threePtRegister[2], y: threePtRegister[3] })[0] == false) {
            var temp = [cursor2.x,cursor2.y, threePtRegister[2], threePtRegister[3], threePtRegister[0], threePtRegister[1]];
            hkr = circleParams(temp);
            var d = describeArc(hkr[0], hkr[1], hkr[2], getThetaPtCircle(hkr[0], hkr[1], temp[0], temp[1]), getThetaPtCircle(hkr[0], hkr[1], temp[4], temp[5]));
            $('#temp2').attr('d', d);
        }
    }
    return;
}

arcStartCenEnd = function() {
    path = '';
    var cursor2 = { x: cursor.x, y: cursor.y };
    if (threePtRegister.length == 2) {
        path += 'M' + threePtRegister[0] + ' ' + threePtRegister[1];
        for (var i = 2; i < threePtRegister.length; i += 2) {
            path += ' L' + threePtRegister[i] + ' ' + threePtRegister[i + 1] + ' M' + threePtRegister[i] + ' ' + threePtRegister[i + 1];
        }
        path += ' L' + cursor2.x + ' ' + cursor2.y;
        $('#temp').attr('d', path);
        // hkr = diaCircleParams([threePtRegister[0],threePtRegister[1],cursor2.x,cursor2.y]);
        // var d=describeArc(hkr[0],hkr[1],hkr[2],getThetaPtCircle(hkr[0],hkr[1],threePtRegister[0],threePtRegister[1]),getThetaPtCircle(hkr[0],hkr[1],cursor2.x,cursor2.y));
        // $('#temp2').attr('d',d);
    } else {
        var r = dist(threePtRegister[0], threePtRegister[1], threePtRegister[2], threePtRegister[3]);
        var endPt = circleInfyLineIntersection(threePtRegister[2], threePtRegister[3], r, threePtRegister[2], threePtRegister[3], cursor2.x, cursor2.y);
        var dir1 = dir(threePtRegister[2], threePtRegister[3], endPt[0].x, endPt[0].y);
        var dir2 = dir(threePtRegister[2], threePtRegister[3], cursor2.x, cursor2.y);
        if (dir1.i > 0 && dir2.i > 0 || dir1.i <= 0 && dir2.i <= 0) {
            endPt = endPt[0];
        } else {
            endPt = endPt[1];
        }
        path += 'M' + threePtRegister[0] + ' ' + threePtRegister[1];
        for (var i = 2; i < threePtRegister.length; i += 2) {
            path += ' L' + threePtRegister[i] + ' ' + threePtRegister[i + 1] + ' M' + threePtRegister[i] + ' ' + threePtRegister[i + 1];
        }
        path += ' L' + endPt.x + ' ' + endPt.y;
        $('#temp').attr('d', path);
        var d = describeArc(threePtRegister[2], threePtRegister[3], r, getThetaPtCircle(threePtRegister[2], threePtRegister[3], threePtRegister[0], threePtRegister[1]), getThetaPtCircle(threePtRegister[2], threePtRegister[3], endPt.x, endPt.y));
        $('#temp2').attr('d', d);

    }
    return;
}

bezier = function() {
    if (ongoing) {
        $('#temp2').attr('x2', mousePos.x).attr('y2', mousePos.y);
        if (curveRegister.length == 2) {
            $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' L ' + mousePos.x + ' ' + mousePos.y);
            return;
        } else if (curveRegister.length == 4) {
            //quad bezier
            $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' Q ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + mousePos.x + ' ' + mousePos.y);
            return;
        } else if (curveRegister.length == 6) {
            //cubic bezier
            $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' C ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5] + ' ' + mousePos.x + ' ' + mousePos.y);
            return;
        } else {
            //fake bezier
            var temp = curveRegister.slice();
            temp.push(mousePos.x / 1, mousePos.y / 1);
            $('#' + activeObj).attr('d', bezierfy(temp));
        }
    }
    return;
}
interpolate = function() {
    if (ongoing) {
        var temp = curveRegister.slice();
        temp.push(mousePos.x / 1, mousePos.y / 1);
        $('#temp').attr('d', curvify(temp));
    }
}
var toolActive = [rect, circle, line, threePtCircle, diaCircle, polyLine, threePtEllipse, fociEllipse, polygon, arc3pt, arcStartCenEnd, lineAngle, bezier, interpolate];
//var toolActive = [rect, circle, line, lineAngle, threePtCircle, diaCircle, polyLine];,arc2ptRad
