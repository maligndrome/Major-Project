trimMaster = function(e) {
    var evt = getMousePos(SVGRoot, e);
    var root = $('svg')[0];
    var rpos = root.createSVGRect();
    rpos.x = evt.x;
    rpos.y = evt.y;
    rpos.width = rpos.height = 1;
    var a = SVGRoot.getIntersectionList(rpos, null);
    var b = [];
    for (var i = 3; i < a.length; i++) {
        if (a[i].id.indexOf('a') > -1) {
            if (b.indexOf(a[i].id.split('ra')[1]) == -1) {
                b.push(a[i].id.split('ra')[1]);
            }
        } else {
            if (b.indexOf(a[i].id) == -1) {
                b.push(a[i].id);
            }
        }
    }
    
    for (var i = 0; i < b.length; i++) {
        if (b[i]) {
            var x = checkPtOnPath(b[i], evt);
            if (x[0] == true) {
                trim({ point: evt, id: b[i], shapeObj: x[1] });
                break;
            }
        }
    }
};

trim = function(e) {
    var obj = e.id / 1;
    var shape = e.shapeObj;
    var point = e.point;
    
    var splitPts = [];
    for (var i = 0; i < selected.length; i++) {
        if (selected[i] != obj) {
            var a = intersection(constructShapeObj(selected[i]), shape);
            splitPts.pushArray(a);
        }
    }
    if (shape.type == 5) {
        //it's a freaking path :(
        //gotta be an arc, right? :P
        var path=shape.params;
        var pathComponents = shape.split;
        for (var i = 0; i < pathComponents.length; i++) {
            if (pathComponents[i].type == 6) {
                //arc
                if (checkPtOnPath(pathComponents[i], point, true)[0] == true) {
                    splitTs = [];
                    var arc=pathComponents[i].params;
                    var motherCircle=convert(arc.x1,arc.y1,arc.x2,arc.y2,arc.large,arc.sweep,arc.rx,arc.ry,0);
                    splitTs.push(motherCircle.theta1.toFixed(4)/1);
                    splitTs.push(motherCircle.theta2.toFixed(4)/1);
                    var cx=motherCircle.cx;
                    var cy=motherCircle.cy;
                    var r=arc.rx;
                    for (var i = 0; i < splitPts.length; i++) {
                        let temp=getThetaPtCircle(cx, cy, splitPts[i].x, splitPts[i].y).toFixed(4)/1;
                        if(splitTs.indexOf(temp)==-1)
                        splitTs.push(temp);
                    }
                    splitTs.sort(function(a, b) {
                        return a - b;
                    });
                    if(splitTs.length==2){
                        $('#' + obj).remove();
                        return;
                    }
                    var t = getThetaPtCircle(cx, cy, point.x, point.y).toFixed(4)/1;
                    
                    
                    i1 = index;
                    if(index<splitTs.length-1)
                    i2 = index + 1;
                else 
                    i2=0;
                    if(i1==splitTs.length-1||i2==0){
                        
                        var d = describeArc(cx, cy, r, splitTs[i1], splitTs[i2]);
                        $('#' + obj).remove();
                        $('#aura' + obj).remove();
                        SVGRoot.appendChild(createPath(d, obj, strokeWidth));
                        activeObj = obj;
                        pathEnd();
                        return;
                    } else {
                        
                        var d1 = describeArc(cx, cy, r, splitTs[0], splitTs[i2]);
                        var d2 = describeArc(cx, cy, r, splitTs[i2], splitTs[i1]);
                        $('#' + obj).remove();
                        $('#aura' + obj).remove();
                        SVGRoot.appendChild(createPath(d1, obj,strokeWidth));
                        activeObj = obj;
                        pathEnd();
                        activeObj=objCount+1;
                        SVGRoot.appendChild(createPath(d2, activeObj, strokeWidth));
                        pathEnd();
                        return;
                    }
                }
            }
        }
    }
    if (shape.type == 2) {
        //it's a line :D
        var line = shape.params;
        splitTs = [0];
        for (var i = 0; i < splitPts.length; i++) {
            splitTs.push((splitPts[i].x - line.x1) / (line.x2 - line.x1));
        }
        splitTs.push(1);
        splitTs.sort(function(a, b) {
            return a - b;
        });
        var t = (point.x - line.x1) / (line.x2 - line.x1);
        if (t < splitTs[1]) {
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            SVGRoot.appendChild(createLine(line.x1 + splitTs[1] * (line.x2 - line.x1), line.y1 + splitTs[1] * (line.y2 - line.y1), line.x2, line.y2, obj, strokeWidth,'blue'));
            activeObj = obj;
            lineEnd();
        } else if (t > splitTs[splitTs.length - 2]) {
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            SVGRoot.appendChild(createLine(line.x2, line.y2, line.x1 + splitTs[1] * (line.x2 - line.x1), line.y1 + splitTs[1] * (line.y2 - line.y1), obj, strokeWidth,'blue'));
            activeObj = obj;
            lineEnd();
        } else {
            var index = 0;
            for (var i = 2; i < splitTs.length - 2; i++) {
                if (t < splitTs[i]) {
                    index = i;
                    break;
                }
            }
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            objCount += 1;
            SVGRoot.appendChild(createLine(line.x1 + splitTs[index - 1] * (line.x2 - line.x1), line.y1 + splitTs[index - 1] * (line.y2 - line.y1), line.x1, line.y1, obj, strokeWidth,'blue'));
            activeObj = obj;
            lineEnd();
            SVGRoot.appendChild(createLine(line.x1 + splitTs[index] * (line.x2 - line.x1), line.y1 + splitTs[index] * (line.y2 - line.y1), line.x2, line.y2, objCount, strokeWidth,'blue'));
            activeObj = objCount;
            lineEnd();
            selected.push(objCount);
        }
        return;
    }
    if (shape.type == 1) {
        //its a circle! :P
        var circle = shape.params;
        var cx = circle.cx;
        var cy = circle.cy;
        var r = circle.r;
        splitTs = [];
        for (var i = 0; i < splitPts.length; i++) {
            splitTs.push(getThetaPtCircle(cx, cy, splitPts[i].x, splitPts[i].y));
        }
        splitTs.sort(function(a, b) {
            return a - b;
        });
        var t = getThetaPtCircle(cx, cy, point.x, point.y);
        var index = 0,
            i1 = 0,
            i2 = 0;
        for (var i = 0; i < splitTs.length; i++) {
            if (t < splitTs[i]) {
                index = i;
                break;
            }
        }
        if (index == 0) {
            i1 = 0;
            i2 = splitPts.length - 1;
        } else {
            i1 = index;
            i2 = index - 1;
        }
        var d = describeArc(cx, cy, r, splitTs[i1], splitTs[i2]);
        $('#' + obj).remove();
        $('#aura' + obj).remove();
        SVGRoot.appendChild(createPath(d, obj,strokeWidth));
        activeObj = obj;
        pathEnd();
        var arcObj = splitPath(d)[0].params;
    }
}

function polarToCartesian(centerX, centerY, radius, angleInRadians) {
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    if (endAngle < startAngle) {
        var largeArcFlag = endAngle - startAngle <= -Math.PI ? "0" : "1";
    } else {
        var largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    }

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

// svg : [A | a] (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+

/* x1 y1 x2 y2 fA fS rx ry φ */
function radian(ux, uy, vx, vy) {
    var dot = ux * vx + uy * vy;
    var mod = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
    var rad = Math.acos(dot / mod);
    if (ux * vy - uy * vx < 0.0) rad = -rad;
    return rad;
}
//conversion_from_endpoint_to_center_parameterization
//sample :  convert(200,200,300,200,1,1,50,50,0,{})
function convert(x1, y1, x2, y2, fA, fS, rx, ry, phi) {
    var cx, cy, theta1, delta_theta;

    if (rx == 0.0 || ry == 0.0) return -1; // invalid arguments

    var s_phi = Math.sin(phi);
    var c_phi = Math.cos(phi);
    var hd_x = (x1 - x2) / 2.0; // half diff of x
    var hd_y = (y1 - y2) / 2.0; // half diff of y
    var hs_x = (x1 + x2) / 2.0; // half sum of x
    var hs_y = (y1 + y2) / 2.0; // half sum of y

    // F6.5.1
    var x1_ = c_phi * hd_x + s_phi * hd_y;
    var y1_ = c_phi * hd_y - s_phi * hd_x;

    var rxry = rx * ry;
    var rxy1_ = rx * y1_;
    var ryx1_ = ry * x1_;
    var sum_of_sq = rxy1_ * rxy1_ + ryx1_ * ryx1_; // sum of square
    var coe = Math.sqrt((rxry * rxry - sum_of_sq) / sum_of_sq);
    if (fA == fS) coe = -coe;

    // F6.5.2
    var cx_ = coe * rxy1_ / ry;
    var cy_ = -coe * ryx1_ / rx;

    // F6.5.3
    cx = c_phi * cx_ - s_phi * cy_ + hs_x;
    cy = s_phi * cx_ + c_phi * cy_ + hs_y;

    var xcr1 = (x1_ - cx_) / rx;
    var xcr2 = (x1_ + cx_) / rx;
    var ycr1 = (y1_ - cy_) / ry;
    var ycr2 = (y1_ + cy_) / ry;

    // F6.5.5
    theta1 = radian(1.0, 0.0, xcr1, ycr1);

    // F6.5.6
    delta_theta = radian(xcr1, ycr1, -xcr2, -ycr2);
    var PIx2 = Math.PI * 2.0;
    while (delta_theta > PIx2) delta_theta -= PIx2;
    while (delta_theta < 0.0) delta_theta += PIx2;
    if (fS == false) delta_theta -= PIx2;

    var outputObj = { /* cx, cy, theta1, delta_theta */
        cx: cx,
        cy: cy,
        theta1: getThetaPtCircle(cx, cy, x1, y1),
        theta2: getThetaPtCircle(cx, cy, x2, y2),
        delta_theta: delta_theta
    }
    

    return outputObj;
}
