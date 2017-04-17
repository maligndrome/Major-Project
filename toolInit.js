lineInit = function() {
    toolPersist = 0;
    objCount += 1;
    activeObj = objCount;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "black");

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

    line.setAttribute('id', objCount);
    line.setAttribute('stroke-width', strokeWidth);
    SVGRoot.appendChild(line);
    line.addEventListener("mousedown", function(e) {
        if (osnapActive === true) {
            activeOSNAPObj = this.id;
        }
    }, false);
}
lineAnglePt = false;
lineAngleInit = function() {
    toolPersist = 1;
    objCount += 1;
    activeObj = objCount;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "black");

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

    line.setAttribute('id', objCount);
    line.setAttribute('stroke-width', strokeWidth);
    SVGRoot.appendChild(line);
    line.addEventListener("mousedown", function(e) {
        if (osnapActive === true) {
            activeOSNAPObj = this.id;
        }
    }, false);
}
rectInit = function() {
    toolPersist = 0;
    objCount += 1;
    activeObj = objCount;
    var rect = createRect(lastPos.x, lastPos.y, 1, 1, objCount, strokeWidth);
    SVGRoot.appendChild(rect);
}
circleInit = function() {
    toolPersist = 0;
    objCount += 1;
    activeObj = objCount;
    var circle = createCircle(lastPos.x, lastPos.y, 1, objCount, strokeWidth);
    SVGRoot.appendChild(circle);
}
threePtRegister = [];
threePtCircleInit = function(pos) {
    toolPersist = 1;
    if (pos) {
        if (threePtRegister.length == 0) {
            if (pos.length == 3) {
                objCount += 1;
                activeObj = objCount;
                threePtRegister.push(pos[0].x / 1, pos[0].y / 1, pos[1].x / 1, pos[1].y / 1, pos[2].x / 1, pos[2].y / 1);
                toolPersist = 0;
                var hkr = circleParams(threePtRegister);
                var circle = createCircle(hkr[0], hkr[1], hkr[2], activeObj, strokeWidth);
                SVGRoot.appendChild(circle);
                for (var i = 0; i < 6; i++) {
                    threePtRegister.pop();
                }
                threePtCircleEnd();
                return;
            } else if (pos.length == 2) {
                objCount += 1;
                activeObj = objCount;
                drawing = true;
                lastPos = pos[1];
                threePtRegister.push(pos[0].x / 1, pos[0].y / 1, pos[1].x / 1, pos[1].y / 1);
                var hkr = diaCircleParams(threePtRegister);
                var circle = createCircle(pos[0].x, pos[0].y, 1, objCount, strokeWidth);
                SVGRoot.appendChild(circle);
                var circleTemp = createCircle(hkr[0], hkr[1], hkr[2], 'temp2', strokeWidth);
                SVGRoot.appendChild(circleTemp);
                var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
                line.setAttribute("stroke", "black");
                line.setAttribute('d', 'M' + threePtRegister[0] + ' ' + threePtRegister[1] + ' L' + threePtRegister[2] + ' ' + threePtRegister[3]);
                line.setAttribute('id', 'temp');
                line.setAttribute('stroke-dasharray', '30');
                line.setAttribute('stroke-width', strokeWidth);
                SVGRoot.appendChild(line);
                osnapUsage = true;
                osnapParams.push(lastPos.x, lastPos.y);
                return;
            } else if (pos.length == 1) {
                objCount += 1;
                activeObj = objCount;
                drawing = true;
                lastPos = pos[0];
                threePtRegister.push(pos[0].x, pos[0].y);
                var circle = createCircle(pos[0].x, pos[0].y, 1, objCount, strokeWidth);
                SVGRoot.appendChild(circle);
                var circleTemp = createCircle(pos[0].x, pos[0].y, 1, 'temp2', strokeWidth);
                SVGRoot.appendChild(circleTemp);
                var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
                line.setAttribute("stroke", "black");
                line.setAttribute('d', 'M' + pos[0].x + ' ' + pos[0].y + ' L' + (pos[0].x + 1) + ' ' + (pos[0].y + 1));
                line.setAttribute('id', 'temp');
                line.setAttribute('stroke-dasharray', '30');
                line.setAttribute('stroke-width', strokeWidth);
                SVGRoot.appendChild(line);
                osnapUsage = true;
                osnapParams.push(lastPos.x, lastPos.y);
                return;
            }
        } else if (threePtRegister.length == 2) {
            if (pos.length == 2) {
                threePtRegister.push(pos[0].x / 1, pos[0].y / 1, pos[1].x / 1, pos[1].y / 1);
                toolPersist = 0;
                var hkr = circleParams(threePtRegister);
                $('#' + activeObj).attr('cx', hkr[0].toFixed(leastCount));
                $('#' + activeObj).attr('cy', hkr[1].toFixed(leastCount));
                $('#' + activeObj).attr('r', hkr[2].toFixed(leastCount));
                for (var i = 0; i < 6; i++) {
                    threePtRegister.pop();
                }
                $('#temp').remove();
                $('#temp2').remove();
                threePtCircleEnd();
                return;
            } else {
                threePtRegister.push(pos[0].x / 1, pos[0].y / 1);
                var hkr = diaCircleParams(threePtRegister);
                $('#temp2').attr('cx', hkr[0].toFixed(leastCount));
                $('#temp2').attr('cy', hkr[1].toFixed(leastCount));
                $('#temp2').attr('r', hkr[2].toFixed(leastCount));
                $('#temp').attr('d', 'M' + threePtRegister[0] + ' ' + threePtRegister[1] + ' L' + threePtRegister[2] + ' ' + threePtRegister[3]);
                return;
            }
        } else if (threePtRegister.length == 4) {
            if (pos.length == 1) {
                threePtRegister.push(pos[0].x / 1, pos[0].y / 1);
                toolPersist = 0;
                var hkr = circleParams(threePtRegister);
                $('#' + activeObj).attr('cx', hkr[0].toFixed(leastCount));
                $('#' + activeObj).attr('cy', hkr[1].toFixed(leastCount));
                $('#' + activeObj).attr('r', hkr[2].toFixed(leastCount));
                for (var i = 0; i < 6; i++) {
                    threePtRegister.pop();
                }
                $('#temp').remove();
                $('#temp2').remove();
                threePtCircleEnd();
                return;
            }
        }
    }
    if (threePtRegister.length == 0) {
        objCount += 1;
        activeObj = objCount;
        threePtRegister.push(lastPos.x, lastPos.y);
        var circle = createCircle(lastPos.x, lastPos.y, 1, objCount, strokeWidth);
        SVGRoot.appendChild(circle);
        var circleTemp = createCircle(lastPos.x, lastPos.y, 1, 'temp2', strokeWidth);
        SVGRoot.appendChild(circleTemp);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", "black");
        line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
        line.setAttribute('id', 'temp');
        line.setAttribute('stroke-dasharray', '5');
        line.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(line);
        osnapUsage = true;
        osnapParams.push(lastPos.x, lastPos.y);
    } else if (threePtRegister.length < 6) {
        osnapParams.pop();
        osnapParams.pop();
        osnapUsage = false;
        threePtRegister.push(lastPos.x, lastPos.y);
        if (threePtRegister.length == 6) {
            toolPersist = 0;
            hkr = circleParams(threePtRegister);
            $('#' + activeObj).attr('cx', hkr[0].toFixed(leastCount));
            $('#' + activeObj).attr('cy', hkr[1].toFixed(leastCount));
            $('#' + activeObj).attr('r', hkr[2].toFixed(leastCount));
            for (var i = 0; i < 6; i++) {
                threePtRegister.pop();
            }
            $('#temp').remove();
            $('#temp2').remove();
        }
    }
    return;
}
diaCircleRegister = [];
diaCircleInit = function(pos) {
    toolPersist = 1;
    if (pos) {
        if (diaCircleRegister.length == 0) {
            if (pos.length == 2) {
                objCount += 1;
                activeObj = objCount;
                diaCircleRegister.push(pos[0].x / 1, pos[0].y / 1, pos[1].x / 1, pos[1].y / 1);
                var hkr = diaCircleParams(diaCircleRegister);
                var circle = createCircle(hkr[0], hkr[1], hkr[2], objCount, strokeWidth);
                SVGRoot.appendChild(circle);
                for (var i = 0; i < 4; i++) {
                    diaCircleRegister.pop();
                }
                lastPos = pos[1];
                cursor.position(lastPos);
                diaCircleEnd();
                $('#coordX').html(cursor.x);
                $('#coordY').html(cursor.y);
                $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
            } else {
                objCount += 1;
                activeObj = objCount;
                drawing = true;
                lastPos = pos[0];
                cursor.position(lastPos);
                $('#coordX').html(cursor.x);
                $('#coordY').html(cursor.y);
                $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
                diaCircleRegister.push(lastPos.x / 1, lastPos.y / 1);
                var circle = createCircle(lastPos.x, lastPos.y, 1, objCount, strokeWidth);
                SVGRoot.appendChild(circle);
                var circleTemp = createCircle(lastPos.x, lastPos.y, 1, 'temp2', strokeWidth);
                SVGRoot.appendChild(circleTemp);
                var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
                line.setAttribute("stroke", "black");
                line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
                line.setAttribute('id', 'temp');
                line.setAttribute('stroke-dasharray', '5');
                line.setAttribute('stroke-width', strokeWidth);
                SVGRoot.appendChild(line);
                osnapUsage = true;
                osnapParams.push(lastPos.x, lastPos.y);
            }
        } else {
            osnapParams.pop();
            osnapParams.pop();
            osnapUsage = false;
            lastPos = pos[0];
            cursor.position(lastPos);
            $('#coordX').html(cursor.x);
            $('#coordY').html(cursor.y);
            $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
            diaCircleRegister.push(lastPos.x / 1, lastPos.y / 1);
            toolPersist = 0;
            hkr = diaCircleParams(diaCircleRegister);
            $('#' + activeObj).attr('cx', hkr[0].toFixed(leastCount));
            $('#' + activeObj).attr('cy', hkr[1].toFixed(leastCount));
            $('#' + activeObj).attr('r', hkr[2].toFixed(leastCount));
            for (var i = 0; i < 4; i++) {
                diaCircleRegister.pop();
            }
            $('#temp').remove();
            $('#temp2').remove();
            diaCircleEnd();
        }
    } else {
        if (diaCircleRegister.length == 0) {
            objCount += 1;
            activeObj = objCount;
            diaCircleRegister.push(lastPos.x / 1, lastPos.y / 1);
            var circle = createCircle(lastPos.x, lastPos.y, 1, objCount, strokeWidth);
            SVGRoot.appendChild(circle);
            var circleTemp = createCircle(lastPos.x, lastPos.y, 1, 'temp2', strokeWidth);
            SVGRoot.appendChild(circleTemp);
            var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
            line.setAttribute("stroke", "black");
            line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
            line.setAttribute('id', 'temp');
            line.setAttribute('stroke-dasharray', '5');
            line.setAttribute('stroke-width', strokeWidth);
            SVGRoot.appendChild(line);
            osnapUsage = true;
            osnapParams.push(lastPos.x, lastPos.y);
        } else {
            osnapParams.pop();
            osnapParams.pop();
            osnapUsage = false;
            diaCircleRegister.push(lastPos.x / 1, lastPos.y / 1);
            toolPersist = 0;
            hkr = diaCircleParams(diaCircleRegister);
            $('#' + activeObj).attr('cx', hkr[0].toFixed(leastCount));
            $('#' + activeObj).attr('cy', hkr[1].toFixed(leastCount));
            $('#' + activeObj).attr('r', hkr[2].toFixed(leastCount));
            for (var i = 0; i < 4; i++) {
                diaCircleRegister.pop();
            }
            $('#temp').remove();
            $('#temp2').remove();
        }
    }
    return;
}
ongoing = 0;
polyLineInit = function(pos) {
    //boy, this ain't gonna be easy!
    if (ongoing == 0 && pos == undefined) {
        ongoing = 1;
        toolPersist = 1;
        objCount += 1;
        activeObj = objCount;
        var pline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        pline.setAttribute("stroke", "black");
        pline.setAttribute('points', '' + lastPos.x + ',' + lastPos.y);
        pline.setAttribute('fill-opacity', 0);
        pline.setAttribute('id', objCount);
        pline.setAttribute('stroke-width', strokeWidth);
        pline.setAttribute('type', 'polyline');
        SVGRoot.appendChild(pline);
        var templine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        templine.setAttribute("stroke", "black");
        templine.setAttribute('points', '' + lastPos.x + ',' + lastPos.y);
        templine.setAttribute('fill-opacity', 0);
        templine.setAttribute('id', 'temp');
        templine.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(templine);
    } else if (ongoing == 1) {
        var rem = '';
        if (pos) {
            lastPos = pos[pos.length - 1];
            cursor.position(lastPos);
            $('#coordX').html(cursor.x);
            $('#coordY').html(cursor.y);
            $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
            for (var i = 0; i < pos.length - 1; i++) {
                rem += ' ' + pos[i].x + ',' + pos[i].y;
            }
        }
        var pts = $('#' + activeObj).attr('points');
        $('#' + activeObj).attr('points', pts + rem + ' ' + lastPos.x + ',' + lastPos.y);
        $('#temp').attr('points', lastPos.x + ',' + lastPos.y);
    } else {
        drawing = true;
        ongoing = 1;
        toolPersist = 1;
        objCount += 1;
        activeObj = objCount;
        var rem = '';
        for (var i = 0; i < pos.length; i++) {
            rem += ' ' + pos[i].x + ',' + pos[i].y;
        }
        lastPos = pos[pos.length - 1];
        cursor.position(lastPos);
        $('#coordX').html(cursor.x);
        $('#coordY').html(cursor.y);
        $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
        var pline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        pline.setAttribute("stroke", "black");
        pline.setAttribute('points', rem);
        pline.setAttribute('fill-opacity', 0);
        pline.setAttribute('id', objCount);
        pline.setAttribute('stroke-width', strokeWidth);
        pline.setAttribute('type', 'polyline');
        SVGRoot.appendChild(pline);
        var templine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        templine.setAttribute("stroke", "black");
        templine.setAttribute('points', '' + lastPos.x + ',' + lastPos.y);
        templine.setAttribute('fill-opacity', 0);
        templine.setAttribute('id', 'temp');
        templine.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(templine);
    }

};

threePtEllipseInit = function() {
    toolPersist = 1;
    if (threePtRegister.length == 0) {
        objCount += 1;
        activeObj = objCount;
        threePtRegister.push(lastPos.x, lastPos.y);
        var ellipse = createEllipse(lastPos.x, lastPos.y, 1, 1, objCount, strokeWidth);
        SVGRoot.appendChild(ellipse);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", "black");
        line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
        line.setAttribute('id', 'temp');
        line.setAttribute('stroke-dasharray', '5');
        line.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(line);
    } else if (threePtRegister.length < 6) {
        threePtRegister.push(lastPos.x, lastPos.y);
        if (threePtRegister.length == 6) {
            toolPersist = 0;
            xyr = ellipseParams(threePtRegister);
            $('#' + activeObj).attr('cx', xyr[0]);
            $('#' + activeObj).attr('cy', xyr[1]);
            $('#' + activeObj).attr('rx', xyr[2]);
            $('#' + activeObj).attr('ry', xyr[3]);
            $('#' + activeObj).attr('transform', 'rotate(' + xyr[4] + ' ' + xyr[0] + ' ' + xyr[1] + ')');
            for (var i = 0; i < 6; i++) {
                threePtRegister.pop();
            }
            $('#temp').remove();
        }
    }
    return;
}

fociEllipseInit = function() {
    toolPersist = 1;
    if (threePtRegister.length == 0) {
        objCount += 1;
        activeObj = objCount;
        threePtRegister.push(lastPos.x, lastPos.y);
        var ellipse = createEllipse(lastPos.x, lastPos.y, 1, 1, objCount, strokeWidth);
        SVGRoot.appendChild(ellipse);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", "black");
        line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
        line.setAttribute('id', 'temp');
        line.setAttribute('stroke-dasharray', '5');
        line.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(line);
        osnapUsage = true;
        osnapParams.push(lastPos.x, lastPos.y);
    } else if (threePtRegister.length < 6) {
        threePtRegister.push(lastPos.x, lastPos.y);
        osnapParams.pop();
        osnapParams.pop();
        osnapParams.push(lastPos.x, lastPos.y);
        if (threePtRegister.length == 6) {
            osnapParams.pop();
            osnapParams.pop();
            osnapUsage = false;
            toolPersist = 0;
            xyr = ellipseFociParams(threePtRegister);
            $('#' + activeObj).attr('cx', xyr[0]);
            $('#' + activeObj).attr('cy', xyr[1]);
            $('#' + activeObj).attr('rx', xyr[2]);
            $('#' + activeObj).attr('ry', xyr[3]);
            $('#' + activeObj).attr('transform', 'rotate(' + xyr[4] + ' ' + xyr[0] + ' ' + xyr[1] + ')');
            createCircle(threePtRegister[0], threePtRegister[1], 3);
            createCircle(threePtRegister[2], threePtRegister[3], 3);
            createCircle(threePtRegister[4], threePtRegister[5], 3);
            for (var i = 0; i < 6; i++) {
                threePtRegister.pop();
            }
            $('#temp').remove();
            $('#temp2').remove();
        }
    }
    return;
}

polygonInit = function() {
    //boy, this ain't gonna be easy!
    if (ongoing == 0) {
        ongoing = 1;
        toolPersist = 1;
        objCount += 1;
        activeObj = objCount;
        var pline = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        pline.setAttribute("stroke", "black");
        pline.setAttribute('points', '' + lastPos.x + ',' + lastPos.y);
        pline.setAttribute('fill-opacity', 0);
        pline.setAttribute('id', objCount);
        pline.setAttribute('stroke-width', strokeWidth);
        pline.setAttribute('first', '' + lastPos.x + ',' + lastPos.y);
        SVGRoot.appendChild(pline);
        var templine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        templine.setAttribute("stroke", "black");
        templine.setAttribute('points', '' + lastPos.x + ',' + lastPos.y);
        templine.setAttribute('fill-opacity', 0);
        templine.setAttribute('id', 'temp');
        templine.setAttribute('stroke-width', strokeWidth);
        templine.setAttribute('stroke-dasharray', '5');
        SVGRoot.appendChild(templine);

    } else {
        points = $('#' + activeObj).attr('points').split(' ');
        pts = '';
        for (var i = 0; i < points.length; i++) {
            if (i != 0) pts += ' ';
            pts += points[i];
        }
        $('#' + activeObj).attr('points', pts + ' ' + lastPos.x + ',' + lastPos.y);
        $('#temp').attr('points', lastPos.x + ',' + lastPos.y);
    }
    return;
};

arc3ptInit = function(pos) {
    toolPersist = 1;
    if (threePtRegister.length == 0) {
        objCount += 1;
        activeObj = objCount;
        threePtRegister.push(lastPos.x, lastPos.y);
        var circle = createPath('M' + lastPos.x + ' ' + lastPos.y, objCount, strokeWidth);
        SVGRoot.appendChild(circle);
        var circle2 = createPath('M' + lastPos.x + ' ' + lastPos.y, 'temp2', strokeWidth);
        SVGRoot.appendChild(circle2);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", "black");
        line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
        line.setAttribute('id', 'temp');
        line.setAttribute('stroke-dasharray', '5');
        line.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(line);
        osnapUsage = true;
        osnapParams.push(lastPos.x, lastPos.y);
    } else if (threePtRegister.length < 6) {
        osnapParams.pop();
        osnapParams.pop();
        osnapUsage = false;
        threePtRegister.push(lastPos.x, lastPos.y);
        if (threePtRegister.length == 6) {
            toolPersist = 0;
            hkr = circleParams(threePtRegister);
            var d = describeArc(hkr[0], hkr[1], hkr[2], getThetaPtCircle(hkr[0], hkr[1], threePtRegister[0], threePtRegister[1]), getThetaPtCircle(hkr[0], hkr[1], threePtRegister[4], threePtRegister[5]));
            $('#' + activeObj).attr('d', d);
            if (checkPtOnPath(activeObj,{x:threePtRegister[2],y:threePtRegister[3]})[0]==false){
                var temp=[threePtRegister[4],threePtRegister[5],threePtRegister[2],threePtRegister[3],threePtRegister[0],threePtRegister[1]];
                poI[''+activeObj]=[{x:temp[0],y:temp[1]},{x:temp[4],y:temp[5]}];
                hkr = circleParams(temp);
                var d = describeArc(hkr[0], hkr[1], hkr[2], getThetaPtCircle(hkr[0], hkr[1], temp[0], temp[1]), getThetaPtCircle(hkr[0], hkr[1], temp[4], temp[5]));
                $('#' + activeObj).attr('d', d);
            } else {
                poI[''+activeObj]=[{x:threePtRegister[0],y:threePtRegister[1]},{x:threePtRegister[4],y:threePtRegister[5]}];
            }
            for (var i = 0; i < 6; i++) {
                threePtRegister.pop();
            }
            $('#temp').remove();
            $('#temp2').remove();
        }
    }
    return;
};

arcStartCenEndInit = function() {
    toolPersist = 1;
    if (threePtRegister.length == 0) {
        objCount += 1;
        activeObj = objCount;
        threePtRegister.push(lastPos.x, lastPos.y);
        var circle = createPath('M' + lastPos.x + ' ' + lastPos.y, objCount, strokeWidth);
        SVGRoot.appendChild(circle);
        var circle2 = createPath('M' + lastPos.x + ' ' + lastPos.y, 'temp2', strokeWidth);
        SVGRoot.appendChild(circle2);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", "black");
        line.setAttribute('d', 'M' + lastPos.x + ' ' + lastPos.y + ' L' + (lastPos.x + 1) + ' ' + (lastPos.y + 1));
        line.setAttribute('id', 'temp');
        line.setAttribute('stroke-dasharray', '5');
        line.setAttribute('stroke-width', strokeWidth);
        SVGRoot.appendChild(line);
        osnapUsage = true;
        osnapParams.push(lastPos.x, lastPos.y);
    } else if (threePtRegister.length < 6) {
        osnapParams.pop();
        osnapParams.pop();
        osnapUsage = false;
        threePtRegister.push(lastPos.x, lastPos.y);
        if (threePtRegister.length == 6) {
            toolPersist = 0;
            var r = dist(threePtRegister[0], threePtRegister[1], threePtRegister[2], threePtRegister[3]);
            var endPt = circleInfyLineIntersection(threePtRegister[2], threePtRegister[3], r, threePtRegister[2], threePtRegister[3], threePtRegister[4], threePtRegister[5]);
            var dir1 = dir(threePtRegister[2], threePtRegister[3], endPt[0].x, endPt[0].y);
            var dir2 = dir(threePtRegister[2], threePtRegister[3], threePtRegister[4], threePtRegister[5]);
            if (dir1.i > 0 && dir2.i > 0 || dir1.i <= 0 && dir2.i <= 0) {
                endPt = endPt[0];
            } else {
                endPt = endPt[1];
            }
            var d = describeArc(threePtRegister[2], threePtRegister[3], r, getThetaPtCircle(threePtRegister[2], threePtRegister[3], threePtRegister[0], threePtRegister[1]), getThetaPtCircle(threePtRegister[2], threePtRegister[3], endPt.x, endPt.y));
            $('#' + activeObj).attr('d', d);
            poI[''+activeObj]=[{x:threePtRegister[0],y:threePtRegister[1]},{x:endPt.x,y:endPt.y}];
            for (var i = 0; i < 6; i++) {
                threePtRegister.pop();
            }
            $('#temp').remove();
            $('#temp2').remove();
        }
    }
    return;
}

//curves
curveRegister = [];
bezierInit = function(pos) {
    toolPersist = 1;
    if (pos) {
        if (curveRegister.length == 0) {
            drawing = true;
            curveRegister = pos.slice();
            ongoing = 1;
            objCount += 1;
            activeObj = objCount;
            var path = createPath('', activeObj, strokeWidth);
            SVGRoot.appendChild(path);
            if (curveRegister.length == 4) {
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' L ' + curveRegister[2] + ' ' + curveRegister[3]);

            } else if (curveRegister.length == 6) {
                //quad bezier
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' Q ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5]);

            } else if (curveRegister.length == 8) {
                //cubic bezier
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' C ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5] + ' ' + curveRegister[6] + ' ' + curveRegister[7]);

            } else if (curveRegister.length >= 10) {
                //fake bezier
                $('#' + activeObj).attr('d', bezierfy(curveRegister));
            }

            var templine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            templine.setAttribute("stroke", "black");
            templine.setAttribute('points', curveRegister.join(' '));
            templine.setAttribute('fill-opacity', 0);
            templine.setAttribute('id', 'temp');
            templine.setAttribute('stroke-width', strokeWidth);
            templine.setAttribute('stroke-dasharray', '20');
            SVGRoot.appendChild(templine);
            var templine2 = createLine(curveRegister[curveRegister.length - 2], curveRegister[curveRegister.length - 1], curveRegister[curveRegister.length - 2] + 1, curveRegister[curveRegister.length - 1] + 1, 'temp2', strokeWidth);
            templine2.setAttribute('stroke-dasharray', '20');
            SVGRoot.appendChild(templine2);
            return;
        } else {
            var t = $('#temp').attr('points');
            $('#temp').attr('points', t + ' ' + pos.join(' '));
            $('#temp2').attr('x1', pos[pos.length - 2]).attr('y1', pos[pos.length - 1]).attr('x2', pos[pos.length - 2] + 1).attr('y2', pos[pos.length - 1] + 1);
            for (var i = 0; i < pos.length; i++) {
                curveRegister.push(pos[i]);
            }
            if (curveRegister.length == 4) {
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' L ' + curveRegister[2] + ' ' + curveRegister[3]);
                return;
            } else if (curveRegister.length == 6) {
                //quad bezier
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' Q ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5]);
                return;
            } else if (curveRegister.length == 8) {
                //cubic bezier
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' C ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5] + ' ' + curveRegister[6] + ' ' + curveRegister[7]);
                return;
            } else {
                //fake bezier
                $('#' + activeObj).attr('d', bezierfy(curveRegister));
            }
        }
    } else {
        if (curveRegister.length == 0) {
            ongoing = 1;
            objCount += 1;
            activeObj = objCount;
            var path = createPath('M ' + lastPos.x + ' ' + lastPos.y, activeObj, strokeWidth);
            curveRegister.push(lastPos.x / 1, lastPos.y / 1);
            SVGRoot.appendChild(path);
            var templine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            templine.setAttribute("stroke", "black");
            templine.setAttribute('points', '' + lastPos.x + ',' + lastPos.y);
            templine.setAttribute('fill-opacity', 0);
            templine.setAttribute('id', 'temp');
            templine.setAttribute('stroke-width', strokeWidth);
            templine.setAttribute('stroke-dasharray', '20');
            SVGRoot.appendChild(templine);
            var templine2 = createLine(lastPos.x, lastPos.y, lastPos.x + 1, lastPos.y + 1, 'temp2', strokeWidth);
            templine2.setAttribute('stroke-dasharray', '20');
            SVGRoot.appendChild(templine2);
            return;
        } else {
            var t = $('#temp').attr('points');
            $('#temp').attr('points', t + ' ' + lastPos.x + ',' + lastPos.y);
            $('#temp2').attr('x1', lastPos.x).attr('y1', lastPos.y).attr('x2', lastPos.x + 1).attr('y2', lastPos.y + 1);
            if (curveRegister.length == 2) {
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' L ' + lastPos.x + ' ' + lastPos.y);
                curveRegister.push(lastPos.x / 1, lastPos.y / 1);
                return;
            } else if (curveRegister.length == 4) {
                //quad bezier
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' Q ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + lastPos.x + ' ' + lastPos.y);
                curveRegister.push(lastPos.x / 1, lastPos.y / 1);
                return;
            } else if (curveRegister.length == 6) {
                //cubic bezier
                $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' C ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5] + ' ' + lastPos.x + ' ' + lastPos.y);
                curveRegister.push(lastPos.x / 1, lastPos.y / 1);
                return;
            } else {
                //fake bezier
                curveRegister.push(lastPos.x / 1, lastPos.y / 1);
                $('#' + activeObj).attr('d', bezierfy(curveRegister));
            }
        }
    }
}

interpolateInit = function(pos) {
    toolPersist=1;
    if (pos) {

    } else {
        if (curveRegister.length==0) {
            ongoing = 1;
            objCount += 1;
            activeObj = objCount;
            var path = createPath('M ' + lastPos.x + ' ' + lastPos.y, activeObj, strokeWidth);
            curveRegister.push(lastPos.x / 1, lastPos.y / 1);
            SVGRoot.appendChild(path);
            path = createPath('M ' + lastPos.x + ' ' + lastPos.y, 'temp', strokeWidth);
            path.setAttribute('stroke-dasharray',20);
            SVGRoot.appendChild(path);
        } else {
            curveRegister.push(lastPos.x/1,lastPos.y/1);
            $('#'+activeObj).attr('d',curvify(curveRegister));
        }
    }
}
toolInit = [rectInit, circleInit, lineInit, threePtCircleInit, diaCircleInit, polyLineInit, threePtEllipseInit, fociEllipseInit, polygonInit, arc3ptInit, arcStartCenEndInit, lineAngleInit, bezierInit, interpolateInit];
//toolInit = [rectInit, circleInit, lineInit,lineAngleInit, threePtCircleInit, diaCircleInit, polyLineInit];
