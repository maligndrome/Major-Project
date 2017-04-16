dimCircleDia = function() {
    var temp = dimObj.split('m')[1];
    var cx = $('#' + temp).attr('cx') / 1;
    var cy = $('#' + temp).attr('cy') / 1;
    var r = $('#' + temp).attr('r') / 1;
    var end = circleInfyLineIntersection(cx, cy, r, mousePos.x, mousePos.y, cx, cy);
    $('#' + dimObj).attr('x1', end[0].x).attr('x2', end[1].x).attr('y1', end[0].y).attr('y2', end[1].y);
    $('#text-' + dimObj).attr('x', mousePos.x).attr('y', mousePos.y);
    return;
}
dimCircleRad = function() {
    var temp = dimObj.split('m')[1];
    var cx = $('#' + temp).attr('cx') / 1;
    var cy = $('#' + temp).attr('cy') / 1;
    var r = $('#' + temp).attr('r') / 1;
    var end = circleInfyLineIntersection(cx, cy, r, mousePos.x, mousePos.y, cx, cy);
    if (dist2(end[0].x, end[0].y, mousePos.x, mousePos.y) < dist2(end[1].x, end[1].y, mousePos.x, mousePos.y)) {
        end = end[0];
    } else {
        end = end[1];
    }
    $('#' + dimObj).attr('x1', end.x).attr('x2', cx).attr('y1', end.y).attr('y2', cy);
    $('#text-' + dimObj).attr('x', mousePos.x).attr('y', mousePos.y);
    return;
};

dimRect = function() {
    if (dimObj.indexOf('v') > -1) {
        $('#' + dimObj).attr('x1', mousePos.x);
        $('#' + dimObj).attr('x2', mousePos.x);
        $('#pro1-' + dimObj).attr('x2', mousePos.x);
        $('#pro2-' + dimObj).attr('x2', mousePos.x);
        $('#text-' + dimObj).attr('x', mousePos.x).attr('y', mousePos.y);


    } else {
        $('#' + dimObj).attr('y1', mousePos.y);
        $('#' + dimObj).attr('y2', mousePos.y);
        $('#pro1-' + dimObj).attr('y2', mousePos.y);
        $('#pro2-' + dimObj).attr('y2', mousePos.y);
        $('#text-' + dimObj).attr('x', mousePos.x).attr('y', mousePos.y);
    }

};

dimEllipse = function() {
    if (dimObj.indexOf('v') > -1) {
        $('#' + dimObj).attr('x1', mousePos.x);
        $('#' + dimObj).attr('x2', mousePos.x);
        $('#pro1-' + dimObj).attr('x2', mousePos.x);
        $('#pro2-' + dimObj).attr('x2', mousePos.x);
    } else {
        $('#' + dimObj).attr('y1', mousePos.y);
        $('#' + dimObj).attr('y2', mousePos.y);
        $('#pro1-' + dimObj).attr('y2', mousePos.y);
        $('#pro2-' + dimObj).attr('y2', mousePos.y);
    }
}

dimPolygon = function() {
    var p = dimCache[0];
    var q = dimCache[1];
    var a = dimCache[2];
    var c = dimCache[3];
    var mP = mousePos;
    var d = distToSegmentSq(mP.x, mP.y, p.x, p.y, q.x, q.y);
    var d1 = Math.sqrt(d * (a * a + 1));
    if (!isPtOnLine(mP.x, mP.y, a, -1, c + d1)) {
        d1 = -d1;
    }
    var p1 = linesIntersection2(-1 / a, p.x, p.y, a, -1, c + d1);
    var p2 = linesIntersection2(-1 / a, q.x, q.y, a, -1, c + d1);
    var theta=180*angPts(p1.x, p1.y, p2.x, p2.y,p1.x+10, p1.y)/Math.PI;
    $('#' + dimObj).attr('x1', p1.x).attr('x2', p2.x).attr('y1', p1.y).attr('y2', p2.y);
    $('#pro1-' + dimObj).attr('x2', p1.x).attr('y2', p1.y);
    $('#pro2-' + dimObj).attr('x2', p2.x).attr('y2', p2.y);
    $('#text-' + dimObj).attr('x', (mP.x-10)).attr('y', (mP.y-10)).attr("transform", "rotate("+$('#text-'+dimObj).attr('data-theta')+" "+(mP.x-10)+" "+(mP.y-10)+")");
    return;
}

dimArcRad = function(){
    var temp = dimObj.split('m')[1];
    var cx = $('#' + temp).attr('cx') / 1;
    var cy = $('#' + temp).attr('cy') / 1;
    var r = $('#' + temp).attr('r') / 1;
    var end = circleInfyLineIntersection(cx, cy, r, mousePos.x, mousePos.y, cx, cy);
    if (dist2(end[0].x, end[0].y, mousePos.x, mousePos.y) < dist2(end[1].x, end[1].y, mousePos.x, mousePos.y)) {
        end = end[0];
    } else {
        end = end[1];
    }
    $('#' + dimObj).attr('x1', end.x).attr('x2', cx).attr('y1', end.y).attr('y2', cy);
    $('#text-' + dimObj).attr('x', mousePos.x).attr('y', mousePos.y);
    return;
}
dimMove = [dimCircleDia, dimCircleRad, dimRect, dimEllipse, dimPolygon, dimArcRad];
