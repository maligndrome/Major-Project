Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr);
};
dist = function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
dist2 = function(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
};
slope = function(x1,y1,x2,y2){
    return (y2-y1)/(x2-x1);
};
dir =function(x1,y1,x2,y2){
    //return a vector describing direction of the vector
    return {i:x2-x1, j:y2-y1};
}
angLines = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    m = Math.abs(Math.atan((y2 - y1) / (x2 - x1)) - Math.atan((y3 - y4) / (x3 - x4)));
    if (m > Math.PI / 2) return Math.PI - m;
    return m;
};
linesIntersection = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1
    };
};
linesIntersection2 = function(m,x1,y1,a,b,c){
    //intersection of y-y1=m(x-x1) and ax+by+c=0;
    return linesIntersection(x1,y1,0,y1-m*x1,0,-c/b,-c/a,0);
}
getThetaPtCircle = function(cx, cy, x, y) {
    var theta = Math.atan2(y - cy, x - cx);
    if (theta < 0) theta = 2 * Math.PI + theta; // range [0, 360)
    return theta;
}
angPts = function(x1, y1, x2, y2, x3, y3) {
    return angLines(x1, y1, x2, y2, x1, y1, x3, y3);
}

quadratic = function(a, b, c) {
    var D = b * b - 4 * a * c;
    if (D < 0) {
        return [];
    } else if (D == 0) {
        return [-b / (2 * a)];
    } else {
        var e = Math.sqrt(D)
        return [(-b + e) / (2 * a), (-b - e) / (2 * a)];
    }
}

SVGArcParams = function(arcObj) {
    var center = { x: 0, y: 0 };
    var x1 = arcObj.x1;
    var y1 = arcObj.y1;
    var x2 = arcObj.x2;
    var y2 = arcObj.y2;
    var rx = arcObj.rx;
    var ry = arcObj.ry;
    var lA = arcObj.lA;
    var sF = arcObj.sF;
    if (rx == ry) {
        var a = x1 * x1 - x2 * x2 + y1 * y1 - y2 * y2;
        var b = -2 * (x1 - x2);
        var c = -2 * (y1 - y2);
        var p = -a / c;
        var q = -b / c;
        var d = y1 - p;
        var ptsx = quadratic(1 + q * q, -2 * d * q - 2 * x1, d * d + x1 * x1 - rx * rx);
        var ptsy = [];
        for (var i = 0; i < ptsx.length; i++) {
            ptsy.push(p + q * ptsx[i]);
        }
        if (ptsx.length > 1) {
            if (Math.sign((x2 - x1) * (ptsy[0] - y1) - (y2 - y1) * (ptsx[0] - x1)) == 1) {
                center.x = ptsx[0];
                center.y = ptsy[0];
            } else {
                center.x = ptsx[1];
                center.y = ptsy[1];
            }
        } else {
            center.x = ptsx[0];
            center.y = ptsy[0];
        }
        return center;
    }
}
circleParams = function(ptArray) {
    x1 = ptArray[0];
    x2 = ptArray[2];
    x3 = ptArray[4];
    y1 = ptArray[1];
    y2 = ptArray[3];
    y3 = ptArray[5];
    A = -2 * x1 + 2 * x2;
    C = -2 * x2 + 2 * x3;
    B = -2 * y1 + 2 * y2;
    D = -2 * y2 + 2 * y3;
    E = x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1;
    F = x3 * x3 - x2 * x2 + y3 * y3 - y2 * y2;
    h = (D * E - B * F) / (A * D - B * C);
    k = (-C * E + A * F) / (A * D - B * C);
    r = dist(h, k, x1, y1);
    return [h, k, r];
};

ellipseParams = function(ptArray) {
    return [ptArray[0], ptArray[1], dist(ptArray[0], ptArray[1], ptArray[2], ptArray[3]), dist(ptArray[0], ptArray[1], ptArray[4], ptArray[5]), (ptArray[1] > ptArray[3] ? -1 : 1) * 180 * angPts(ptArray[0], ptArray[1], ptArray[0] + 1, ptArray[1], ptArray[2], ptArray[3]) / Math.PI];
};

ellipseFociParams = function(ptArray) {
    var cx = (ptArray[0] + ptArray[2]) / 2;
    var cy = (ptArray[1] + ptArray[3]) / 2;
    var rx = (dist(ptArray[0], ptArray[1], ptArray[4], ptArray[5]) + dist(ptArray[2], ptArray[3], ptArray[4], ptArray[5])) / 2;
    var e = dist(cx, cy, ptArray[2], ptArray[3]) / rx;
    var ry = rx * Math.sqrt(1 - e * e);
    return [cx, cy, rx, ry, (ptArray[1] > ptArray[3] ? -1 : 1) * 180 * angPts(cx, cy, cx + 1, cy, ptArray[2], ptArray[3]) / Math.PI];
};

fact = function(n) {
    if (n < 0) {
        throw 'Math error';
        return;
    }
    if (n == 0)
        return 1;
    prod = 1;
    while (n > 1) {
        prod *= n;
        n -= 1;
    }
    return prod;
}
binom = function(n, r) {

    return fact(n) / (fact(n - r) * fact(r));
}
diaCircleParams = function(ptArray) {

    return [(ptArray[0] + ptArray[2]) / 2, (ptArray[1] + ptArray[3]) / 2, dist(ptArray[0], ptArray[1], ptArray[2], ptArray[3]) / 2];
}
bezierGenerator = function(ptArray) {

    bzPts = [];
    var temp = [];
    for (var t = 0; t <= 1; t += 0.01) {
        temp.push(0, 0);
        for (var i = 0, n = ptArray.length / 2; i < 2 * n; i += 2) {
            temp[0] += (binom(n - 1, i / 2) * Math.pow((1 - t), n - i / 2 - 1) * Math.pow(t, i / 2) * ptArray[i]);
            temp[1] += (binom(n - 1, i / 2) * Math.pow((1 - t), n - i / 2 - 1) * Math.pow(t, i / 2) * ptArray[i + 1]);
        }
        bzPts.push(temp.pop(), temp.pop());
    }
    return bzPts;
}
bezierfy = function (ptArray) {
    var bzPts = bezierGenerator(ptArray);
    var d='M '+bzPts[1]+ ' '+ bzPts[0];
    for (var i=2, n= bzPts.length /2; i< 2*n; i+=2) {
        d+=' L '+bzPts[i+1]+' '+bzPts[i];
    }
    return d;
}
curvify = function(pts) {
    inPts = getCurvePoints(pts, 0.5, 50, false);
    d = 'M '+inPts[0]+ ' '+ inPts[1];
    for (var i = 2; i < inPts.length; i += 2) {
        d += ' '+inPts[i] + ' ' + inPts[i + 1];
    }
    return d;
};
TDMA = function(a, b, c, d) {
    n = b.length;
    sol = new Array(n);
    for (var i = 1; i < n; i++) {
        b[i] = b[i] - c[i - 1] * a[i] / b[i - 1]
        d[i] = d[i] - d[i - 1] * a[i] / b[i - 1]
    }
    sol[n - 1] = d[n - 1] / b[n - 1]
    for (i = n - 2; i > -1; --i) {
        sol[i] = (d[i] - sol[i + 1] * c[i]) / b[i]
    }
    return sol;
};
getCurvePoints = function(points, tension, numOfSeg, close) {

    'use strict';

    if (typeof points === "undefined" || points.length < 2) return new Float32Array(0);


    tension = typeof tension === "number" ? tension : 0.5;
    numOfSeg = typeof numOfSeg === "number" ? numOfSeg : 25;

    var pts,
        i = 1,
        l = points.length,
        rPos = 0,
        rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0),
        res = new Float32Array(rLen),
        cache = new Float32Array((numOfSeg + 2) << 2),
        cachePtr = 4;

    pts = points.slice(0);

    if (close) {
        pts.unshift(points[l - 1]);
        pts.unshift(points[l - 2]);
        pts.push(points[0], points[1]);
    } else {
        pts.unshift(points[1]);
        pts.unshift(points[0]);
        pts.push(points[l - 2], points[l - 1]);
    }


    cache[0] = 1;

    for (; i < numOfSeg; i++) {

        var st = i / numOfSeg,
            st2 = st * st,
            st3 = st2 * st,
            st23 = st3 * 2,
            st32 = st2 * 3;

        cache[cachePtr++] = st23 - st32 + 1;
        cache[cachePtr++] = st32 - st23;
        cache[cachePtr++] = st3 - 2 * st2 + st;
        cache[cachePtr++] = st3 - st2;
    }

    cache[++cachePtr] = 1;


    parse(pts, cache, l, tension);

    if (close) {

        pts = [];
        pts.push(points[l - 4], points[l - 3],
            points[l - 2], points[l - 1],
            points[0], points[1],
            points[2], points[3]);
        parse(pts, cache, 4, tension);
    }

    function parse(pts, cache, l, tension) {

        for (var i = 2, t; i < l; i += 2) {

            var pt1 = pts[i],
                pt2 = pts[i + 1],
                pt3 = pts[i + 2],
                pt4 = pts[i + 3],

                t1x = (pt3 - pts[i - 2]) * tension,
                t1y = (pt4 - pts[i - 1]) * tension,
                t2x = (pts[i + 4] - pt1) * tension,
                t2y = (pts[i + 5] - pt2) * tension,
                c = 0,
                c1, c2, c3, c4;

            for (t = 0; t < numOfSeg; t++) {

                c1 = cache[c++];
                c2 = cache[c++];
                c3 = cache[c++];
                c4 = cache[c++];

                res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
                res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
            }
        }
    }


    l = close ? 0 : points.length - 2;
    res[rPos++] = points[l++];
    res[rPos] = points[l];

    return res
};
findOne = function(haystack, arr) {
    return arr.some(function(v) {
        return haystack.indexOf(v) >= 0;
    });
};

inCircle = function(cx, cy, r, x, y) {
    //checks if (x,y) lies in the circle defined by (cx,cy) and r
    return ((cx - x) ** 2 + (y - cy) ** 2) < r ** 2;
}
inRectangle = function(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
    //checks if (x,y) lies in the rectangle defined by (xi,yi)
    var d2 = dist(x0, y0, x1, y1);
    var d3 = dist(x0, y0, x3, y3);
    var d1 = dist(x0, y0, x, y);
    var d = d1 * d2 * Math.cos(angPts(x0, y0, x, y, x1, y1));
    var _d = d1 * d3 * Math.cos(angPts(x0, y0, x, y, x3, y3));
    console.log(d, _d);
    return d < d2 * d2 && _d < d3 * d3;
}
distToSegmentSq = function(px, py, x1, y1, x2, y2) {
    var l2 = dist2(x1, y1, x2, y2);
    if (l2 == 0) return dist2(px, py, x1, y1);
    var t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(px, py, x1 + t * (x2 - x1), y1 + t * (y2 - y1));
}

isPtOnLine = function(x,y,a,b,c){
    //is (x,y) on ax+by+c=0?
    if(a*x+b*y+c<0.0001){
        return true;
    }
    return false;
}

circleLineIntersection = function(cx, cy, r, x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = x2 - cx;
    var d = y2 - cy;
    var A = a * a + b * b;
    var B = 2 * (a * c + b * d);
    var C = c * c + d * d - r * r;
    var D = B * B - 4 * A * C;
    if (D < 0) {
        return [];
    } else if (D == 0) {
        var t = -B / (2 * A);
        return [{
            x: t * x1 + (1 - t) * x2,
            y: t * y1 + (1 - t) * y2
        }];
    } else {
        var t1 = (-B + Math.sqrt(D)) / (2 * A);
        var t2 = (-B - Math.sqrt(D)) / (2 * A);
        var pts = [];
        if (0 <= t1 && t1 <= 1) {
            var a1 = {
                x: t1 * x1 + (1 - t1) * x2,
                y: t1 * y1 + (1 - t1) * y2
            };
            pts.push(a1);
        }
        if (0 <= t2 && t2 <= 1) {
            var b1 = {
                x: t2 * x1 + (1 - t2) * x2,
                y: t2 * y1 + (1 - t2) * y2
            };
            pts.push(b1);
        }
        return pts;
    }
}

circleInfyLineIntersection = function(cx, cy, r, x1, y1, x2, y2) {
    if (x1 != x2) {
        var m = (y2 - y1) / (x2 - x1);
        var c = y1 - m * x1;
        var A = 1 + m * m;
        var B = 2 * (m * (c - cy) - cx);
        var C = cy * cy - r * r + cx * cx - 2 * c * cy + c * c;
        var D = B * B - 4 * A * C;
        if (D > 0) {
            var temp = Math.sqrt(D);
            x1 = (-B + temp) / (2 * A);
            x2 = (-B - temp) / (2 * A);
            y1 = m * x1 + c;
            y2 = m * x2 + c;
            return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        } else if (D == 0) {
            return [{ x: -B / (2 * A), y: m * (-B / (2 * A)) + c }];
        } else return [];
    } else {
        var C = (x1 - cx) ** 2 - r * r + cy * cy;
        var B = -2 * cy;
        var D = B * B - 4 * C;
        if (D > 0) {
            var temp = Math.sqrt(D);
            y1 = (-B + temp) / 2;
            y2 = (-B - temp) / 2;
            return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        } else if (D == 0) {
            return [{ x: x1, y: (-B / 2) }];
        } else return [];
    }
}
intersection = function(shape1, shape2) {
    //shape { type: int, params: {svgAttrs} }
    //types:
    //rectange=0
    //circle=1
    //line = 2
    //polyline =3 
    //ellipse = 4
    //path = 5
    if (shape1.type == 1 && shape2.type == 1) {
        //circle-circle intersection
        //check if they intersect
        //(R0-R1)^2 <= (x0-x1)^2+(y0-y1)^2 <= (R0+R1)^2
        var x0 = shape1.params.cx;
        var x1 = shape2.params.cx;
        var y0 = shape1.params.cy;
        var y1 = shape2.params.cy;
        var r0 = shape1.params.r;
        var r1 = shape2.params.r;
        var D = (x0 - x1) ** 2 + (y0 - y1) ** 2;
        if (D <= (r0 + r1) ** 2 && D >= (r0 - r1) ** 2) {
            //yes, they intersect! thou can proceed
            D = Math.sqrt(D);
            var l = (r0 ** 2 - r1 ** 2 + D ** 2) / (2 * D);
            var h = Math.sqrt(r0 ** 2 - l ** 2);
            return [{ x: l * (x1 - x0) / D + h * (y1 - y0) / D + x0, y: l * (y1 - y0) / D - h * (x1 - x0) / D + y0 },
                { x: l * (x1 - x0) / D - h * (y1 - y0) / D + x0, y: l * (y1 - y0) / D + h * (x1 - x0) / D + y0 }
            ]
        }
        return [];
    }
    if ((shape1.type == 0 && shape2.type == 1) || (shape1.type == 1 && shape2.type == 0)) {
        //alt logic for the conditional: shap1.type + shape2.type ==1 ? ;-)
        //circle and rectangle
        if (shape1.type == 1) {
            var rect = shape2;
            var circle = shape1;
        } else {
            var rect = shape1;
            var circle = shape2;
        }
        var x0 = rect.params.x;
        var y0 = rect.params.y;
        var w = rect.params.w;
        var h = rect.params.h;
        var cx = circle.params.cx;
        var cy = circle.params.cy;
        var r = circle.params.r;
        console.log(x0, y0, w, h, cx, cy, r);
        var pts = [];
        pts.pushArray(circleLineIntersection(cx, cy, r, x0, y0, x0 + w, y0));
        pts.pushArray(circleLineIntersection(cx, cy, r, x0 + w, y0, x0 + w, y0 + h));
        pts.pushArray(circleLineIntersection(cx, cy, r, x0 + w, y0 + h, x0, y0 + h));
        pts.pushArray(circleLineIntersection(cx, cy, r, x0, y0 + h, x0, y0));
        return pts;
    }
    if (shape1.type == shape2.type == 2) {
        //for line-line intersection
        var a = linesIntersection(shape1.params.x1, shape1.params.y1, shape1.params.x2, shape1.params.y2, shape2.params.x1, shape2.params.y1, shape2.params.x2, shape2.params.y2);
        if (a.seg1 == a.seg2 == true) {
            return [{ x: a.x, y: a.y }];
        }
    }
    if (shape1.type == 1 && shape2.type == 2 || shape1.type == 2 && shape2.type == 1) {
        //line and circle
        if (shape1.type == 1) {
            var circle = shape1;
            var line = shape2;
        } else {
            var circle = shape2;
            var line = shape1;
        }
        return circleLineIntersection(circle.params.cx, circle.params.cy, circle.params.r, line.params.x1, line.params.y1, line.params.x2, line.params.y2);
    }
    if (shape1.type == 5 && shape2.type == 2 ) {
        //line and path, trimming line
            var line = shape2.params;
            var path = shape1.params;
        var pathComponents = splitPath(path.d);
        console.log("pathComponents",pathComponents);
        for (var i = 0; i < pathComponents.length; i++) {
            var pts=[]
            if (pathComponents[i].type == 6) {
                var arc=pathComponents[i].params;
                console.log('the arc is',arc);
                var motherCircle = convert(arc.x1,arc.y1,arc.x2,arc.y2,arc.large,arc.sweep,arc.rx,arc.ry,0);
                var pts_temp = circleLineIntersection(motherCircle.cx, motherCircle.cy, arc.rx, line.x1, line.y1, line.x2, line.y2);
                for (var i = 0; i < pts.length; i++) {
                    var t = getThetaPtCircle(motherCircle.cx, motherCircle.cy, pts[i].x, pts[i].y);
                    if (t < motherCircle.theta1 || t > motherCircle.theta1 + motherCircle.delta_theta) {
                        pts_temp.splice(i, 1);
                    }
                }
                pts.pushArray(pts_temp);
            }
            return pts;
        }
    }
    if (shape1.type == 2 && shape2.type == 5 ) {
        //line and path, trimming line
        var line = shape1.params;
        var path = shape2.params;
        var pathComponents = splitPath(path.d);
        console.log("pathComponents",pathComponents);
        for (var i = 0; i < pathComponents.length; i++) {
            var pts=[]
            if (pathComponents[i].type == 6) {
                var arc=pathComponents[i].params;
                console.log('the arc is',arc);
                var motherCircle = convert(arc.x1,arc.y1,arc.x2,arc.y2,arc.large,arc.sweep,arc.rx,arc.ry,0);
                var pts_temp = circleLineIntersection(motherCircle.cx, motherCircle.cy, arc.rx, line.x1, line.y1, line.x2, line.y2);
                console.log("Points of intersection of circle and line", pts_temp);
                for (var i = 0; i < pts_temp.length; i++) {
                    var t = getThetaPtCircle(motherCircle.cx, motherCircle.cy, pts_temp[i].x, pts_temp[i].y);
                    if(motherCircle.delta_theta<0){
                        if(t<=motherCircle.theta1 || t>=motherCircle.theta2){
                            pts.push(pts_temp[i]);
                        }
                    } else {
                        if(t<=motherCircle.theta2 && t>=motherCircle.theta1){
                            pts.push(pts_temp[i]);
                        }
                    }
                }
            }
            return pts;
        }
    }
    if (shape1.type == 5 && shape2.type == 1) {
        //circle and path, trimming circle
        var circle = shape2.params;
        var path = shape1.params;
        var pathComponents = splitPath(path.d);
        for (var i = 0; i < pathComponents.length; i++) {
            var pts=[]
            if (pathComponents[i].type == 6) {
                var arc=pathComponents[i].params;
                var motherCircle = convert(arc.x1,arc.y1,arc.x2,arc.y2,arc.large,arc.sweep,arc.rx,arc.ry,0);
                var x0 = motherCircle.cx;
                var x1 = circle.cx;
                var y0 = motherCircle.cy;
                var y1 = circle.cy;
                var r0 = arc.rx;
                var r1 = circle.r;
                var D = (x0 - x1) ** 2 + (y0 - y1) ** 2;
                if (D <= (r0 + r1) ** 2 && D >= (r0 - r1) ** 2) {
                    //yes, they intersect! thou can proceed
                    D = Math.sqrt(D);
                    var l = (r0 ** 2 - r1 ** 2 + D ** 2) / (2 * D);
                    var h = Math.sqrt(r0 ** 2 - l ** 2);
                    var pt1= { x: l * (x1 - x0) / D + h * (y1 - y0) / D + x0, y: l * (y1 - y0) / D - h * (x1 - x0) / D + y0 };
                    var pt2= { x: l * (x1 - x0) / D - h * (y1 - y0) / D + x0, y: l * (y1 - y0) / D + h * (x1 - x0) / D + y0 };
                    var t1=getThetaPtCircle(motherCircle.cx,motherCircle.cy,pt1.x,pt1.y);
                    var t2=getThetaPtCircle(motherCircle.cx,motherCircle.cy,pt2.x,pt2.y);
                    if(motherCircle.delta_theta<0){
                        if(t1<=motherCircle.theta1 || t1>=motherCircle.theta2){
                            pts.push(pt1);
                        }
                        if(t2<=motherCircle.theta1 || t2>=motherCircle.theta2){
                            pts.push(pt2);
                        }
                    } else {
                        if(t1<=motherCircle.theta2 && t1>=motherCircle.theta1){
                            pts.push(pt1);
                        }
                        if(t2<=motherCircle.theta2 && t2>=motherCircle.theta1){
                            pts.push(pt2);
                        }
                    }
                }
                
            }
            return pts;
        }

    }
    return [];
}

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
function convertSVGarc(x1, y1, x2, y2, fA, fS, rx, ry, phi) {
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
        theta1: theta1,
        delta_theta: delta_theta
    }
    return outputObj;
}
