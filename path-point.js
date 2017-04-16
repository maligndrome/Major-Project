//checks if point is on an svg path
//{'circle':1, 'rect':0, 'line':2, 'polyline':3, 'ellipse': 4, 'path': 5};
checkPtOnPath = function(id, pt, obj = false) {
    //pt={x,y}
    if (obj == false)
        var a = constructShapeObj(id);
    else
        var a = id;
    if(a.type == 0){
        //rect
        if(distToSegmentSq(pt.x,pt.y,a.params.x,a.params.y,a.params.x+a.params.w,a.params.y)<100){
            return [true,a];
        } else if (distToSegmentSq(pt.x,pt.y,a.params.x,a.params.y,a.params.x,a.params.y+a.params.h)<100){
            return [true,a];
        } else if(distToSegmentSq(pt.x,pt.y,a.params.x+a.params.w,a.params.y,a.params.x+a.params.w,a.params.y+a.params.h)<100){
            return [true,a];
        } else if (distToSegmentSq(pt.x,pt.y,a.params.x,a.params.y+a.params.h,a.params.x+a.params.w,a.params.y+a.params.h)<100){
            return [true,a];
        }
        return [false];
    }
    if (a.type == 1) {
        //circle
        var r = a.params.r;
        var d = dist2(pt.x, pt.y, a.params.cx, a.params.cy) - r ** 2;
        if (d < 100 + 2 * r && d > 100 - 20 * r) {
            return [true, a];
        }
    }
    if (a.type == 2) {
        //line
        if (distToSegmentSq(pt.x, pt.y, a.params.x1, a.params.y1, a.params.x2, a.params.y2) < 100) {
            return [true, a];
        }
    }
    if (a.type == 3) {
        //polyline
        var pts=a.params.points;
        for (var i=0; i<pts.length-1;i++){
            if(distToSegmentSq(pt.x,pt.y,pts[i].x,pts[i].y,pts[i+1].x,pts[i+1].y)<100){
                return [true, a];
            }
        }
        return [false];
    }
    if (a.type == 5) {
        //path
        var x = splitPath(a.params.d);
        for (var i = 0; i < x.length; i++) {
            if (checkPtOnPath(x[i], pt, true)[0] == true) {
                a.split = x;
                return [true, a];
            }
        }
    }
    if (a.type == 6) {
        //arc
        var arc = a.params;
        var motherCircle = convert(arc.x1, arc.y1, arc.x2, arc.y2, arc.large, arc.sweep, arc.rx, arc.ry, 0);
        var t = getThetaPtCircle(motherCircle.cx, motherCircle.cy, pt.x, pt.y);
        var corrPt = { x: motherCircle.cx + arc.rx * Math.cos(t), y: motherCircle.cy + arc.rx * Math.sin(t) };
        if (dist2(corrPt.x, corrPt.y, pt.x, pt.y) < 100) {
            if (motherCircle.delta_theta < 0) {
                if (t <= motherCircle.theta1 || t >= motherCircle.theta2) {
                    return [true,a];
                }
            } else {
                if (t <= motherCircle.theta2 && t >= motherCircle.theta1) {
                    return [true,a];
                }
            }
        }
    }
    if (a.type == 7){
        var pts=a.params.points;
        pts.push(pts[0]);
        for (var i=0; i<pts.length-1;i++){
            if(distToSegmentSq(pt.x,pt.y,pts[i].x,pts[i].y,pts[i+1].x,pts[i+1].y)<100){
                return [true, a];
            }
        }
        return [false];
    }
    return [false];
}
