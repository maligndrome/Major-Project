lineLineInitSnap = function(activeOSNAPObj, x, y) {
    if (autoSnapModes.indexOf('mid') > -1) {
        x1 = $('#' + activeOSNAPObj).attr('x1') / 1;
        y1 = $('#' + activeOSNAPObj).attr('y1') / 1;
        x2 = $('#' + activeOSNAPObj).attr('x2') / 1;
        y2 = $('#' + activeOSNAPObj).attr('y2') / 1;
        var len = dist(x1, y1, x2, y2) / 4;
        if (dist((x1 + x2) / 2, (y1 + y2) / 2, x, y) < len) {
            return {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2
            };
        }
    }
    if (autoSnapModes.indexOf('end') > -1) {
        x1 = $('#' + activeOSNAPObj).attr('x1') / 1;
        y1 = $('#' + activeOSNAPObj).attr('y1') / 1;
        x2 = $('#' + activeOSNAPObj).attr('x2') / 1;
        y2 = $('#' + activeOSNAPObj).attr('y2') / 1;
        var len = dist(x1, y1, x2, y2) / 4;
        if (dist(x1, y1, x, y) < len) {
            return {
                x: x1,
                y: y1
            };
        }
        if (dist(x2, y2, x, y) < len) {
            return {
                x: x2,
                y: y2
            };
        }
    }
    return {
        x: x,
        y: y
    };
}
circleLineInitSnap = function(activeOSNAPObj,x,y){
    return lineLineInitSnap(activeOSNAPObj,x,y);
}
lineCircleInitSnap = function(activeOSNAPObj, x, y) {
    var cx = $('#'+activeOSNAPObj).attr('cx')/1;
    var cy = $('#'+activeOSNAPObj).attr('cy')/1;
    if(dist2(x,y,cx,cy)<1000) {
        return {x: cx, y:cy};
    }
    return { x: x, y: y };
}
circleCircleInitSnap = function(activeOSNAPObj,x,y){
    return lineCircleInitSnap(activeOSNAPObj,x,y);
}
lineLineEndSnap = function(activeOSNAPObj, x, y, xe, ye) {
    if (autoSnapModes.indexOf('perp') > -1) {
    	console.log('be perpendicular');
        x1 = $('#' + activeOSNAPObj).attr('x1') / 1;
        y1 = $('#' + activeOSNAPObj).attr('y1') / 1;
        x2 = $('#' + activeOSNAPObj).attr('x2') / 1;
        y2 = $('#' + activeOSNAPObj).attr('y2') / 1;
        t = (Math.PI / 2) - angLines(x, y, xe, ye, x1, y1, x2, y2);
        console.log(t);
        xe -= x;
        ye -= y;
        return {
            x: x + xe * Math.cos(t) - ye * Math.sin(t),
            y: y + xe * Math.sin(t) + ye * Math.cos(t)
        };
    } else if (autoSnapModes.indexOf('par') > -1) {
        x1 = $('#' + activeOSNAPObj).attr('x1') / 1;
        y1 = $('#' + activeOSNAPObj).attr('y1') / 1;
        x2 = $('#' + activeOSNAPObj).attr('x2') / 1;
        y2 = $('#' + activeOSNAPObj).attr('y2') / 1;
        t = angLines(x, y, xe, ye, x1, y1, x2, y2);
        xe -= x;
        ye -= y;
        return {
            x: x + xe * Math.cos(t) - ye * Math.sin(t),
            y: y + xe * Math.sin(t) + ye * Math.cos(t)
        };
    }
    return {
        x: x,
        y: y
    };
}
lineCircleEndSnap = function(activeOSNAPObj, xe, ye) {
    var x = $('#' + activeObj).attr('x1');
    var y = $('#' + activeObj).attr('y1');
    if (autoSnapModes.indexOf('tan') > -1) {
        snapped = true;
        cx = $('#' + activeOSNAPObj).attr('cx') / 1;
        cy = $('#' + activeOSNAPObj).attr('cy') / 1;
        r = $('#' + activeOSNAPObj).attr('r') / 1;
        if(dist2(x,y,cx,cy)<=r*r){
            return {x: xe, y:ye};
        }
        dx = cx - x;
        dy = cy - y;
        dd = Math.sqrt(dx * dx + dy * dy);
        a = Math.asin(r / dd);
        b = Math.atan2(dy, dx);
        t = b - a
        ta = {
            x: cx + r * Math.sin(t),
            y: cy + r * -Math.cos(t)
        };
        t = b + a;
        tb = {
            x: cx + r * -Math.sin(t),
            y: cy + r * Math.cos(t)
        };
        if (dist(ta.x, ta.y, xe, ye) > dist(tb.x, tb.y, xe, ye)) {
            snapCache = tb;
            cursor.setAttribute('cx', tb.x);
            cursor.setAttribute('cy', tb.y);
            return tb;
        } else {
            snapCache = ta;
            cursor.setAttribute('cx', ta.x);
            cursor.setAttribute('cy', ta.y);
            return ta;
        }
    }
}
