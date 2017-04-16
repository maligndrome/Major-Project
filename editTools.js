polyLineEdit = function(elemId) {
    //elem is the svg polyline element
    //lets extract the points first and place markers on them!
    var type = $('#' + elemId).attr('type');
    if (type == 'polyline') {
        var points = $('#' + elemId).attr('points').split(' ');
    } else if (type == 'bezier') {
        var points = $('#' + elemId).attr('control-pts').split(' ');
    } else if (type == 'interpolate') {
        var points = $('#' + elemId).attr('inter-pts').split(' ');
    }
    var pts = [];
    var temp;
    for (var i = 0; i < points.length; i++) {
        if (points[i] != '') {
            temp = points[i].split(',');
            pts.push({
                x: temp[0],
                y: temp[1]
            });
        }
    }
    for (i = 0; i < pts.length; i++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("stroke", "black");
        rect.setAttribute("fill", "red");
        rect.setAttribute('x', pts[i].x - 5);
        rect.setAttribute('y', pts[i].y - 5);
        rect.setAttribute('width', 10);
        rect.setAttribute('height', 10);
        rect.setAttribute('id', 'temp' + i);
        SVGRoot.appendChild(rect);
        document.getElementById('temp' + i).addEventListener("mousedown", function(e) {
            editing = true;
            drawing = false;
            lastPos = getMousePos(canvas, e);
            activeObjEdit = e.srcElement.id[4];
            activeObjEditId = elemId;
        }, false);
        document.getElementById('temp' + i).addEventListener("mouseup", function(e) {
            editing = false;
            if (type == 'bezier') {
                bezierfyPolyline(elemId);
            }
            if (type == 'interpolate') {
                curvifyPolyline(elemId);
            }
        }, false);
        document.getElementById('temp' + i).addEventListener("mousemove", function(e) {
            if (editing) {
                mousePos = getMousePos(canvas, e);
                polyLineMovePoint(e.srcElement.id[4], mousePos, elemId, type);
            }
        }, false);
    }
}
polyLineMovePoint = function(a, b, c, type) {
    $('#temp' + activeObjEdit).attr('x', mousePos.x - 5);
    $('#temp' + activeObjEdit).attr('y', mousePos.y - 5);
    points = $('#' + activeObjEditId).attr('points').split(' ');
    var pts = [];
    var temp;
    for (var i = 0; i < points.length; i++) {
        if (points[i] != '') {
            temp = points[i].split(',');
            pts.push({
                x: temp[0],
                y: temp[1]
            });
        }
    }
    pts[activeObjEdit].x = mousePos.x;
    pts[activeObjEdit].y = mousePos.y;
    points = '';
    for (i = 0; i < pts.length; i++) {
        points += pts[i].x + ',' + pts[i].y + ' ';
    }
    if (type == 'polyline') {
        $('#' + activeObjEditId).attr('points', points);
    }
    if (type == 'bezier') {
        $('#' + activeObjEditId).attr('control-pts', points);
    }
    if (type == 'interpolate') {
        console.log(points);
        $('#' + activeObjEditId).attr('inter-pts', points);
    }
    return;
}
rectEdit = function() {

};
circleEdit = function() {

};
lineEdit = function() {

};
threePtCircleEdit = function() {

};
diaCircleEdit = function() {

};
bezierfyPolyline = function(elemId) {
    var type = $('#' + elemId).attr('type');
    if (type == 'bezier') {
        var points = $('#' + elemId).attr('control-pts').split(' ');
    } else if (type == 'interpolate') {
        var points = $('#' + elemId).attr('inter-pts').split(' ');
        $('#' + elemId).attr('control-pts', $('#' + elemId).attr('inter-pts'));
    } else if (type == 'polyline') {
        $('#' + elemId).attr('control-pts', $('#' + elemId).attr('points'));
        var points = $('#' + elemId).attr('points').split(' ');
    }
    $('#' + elemId).attr('type', 'bezier');
    var pts = [];
    var temp;
    for (var i = 0; i < points.length; i++) {
        if (points[i] != '') {
            temp = points[i].split(',');
            pts.push(temp[0] / 1, temp[1] / 1);
        }
    }
    bzPts = bezierGenerator(pts);
    d = '';
    for (var i = 0; i < bzPts.length; i += 2) {
        d += bzPts[i + 1] + ',' + bzPts[i] + ' ';
    }
    $('#' + elemId).attr('points', d);
};

threePtEllipseEdit = function() {};
fociEllipseEdit = function() {};
polygonEdit = function() {};
//editActive = [rectEdit, circleEdit, lineEdit, threePtCircleEdit, diaCircleEdit, polyLineMovePoint, threePtEllipseEdit, fociEllipseEdit, polygonEdit];
