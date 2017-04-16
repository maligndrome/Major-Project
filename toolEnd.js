rectEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
        var id = e.srcElement.id.split('aura')[1];
        if (dimensioning == true && setDimension == false) {
            var x1 = $('#' + id).attr('x') / 1;
            var y1 = $('#' + id).attr('y') / 1;
            var h = $('#' + id).attr('height') / 1;
            var w = $('#' + id).attr('width') / 1;
            var d1 = distToSegmentSq(lastPos.x, lastPos.y, x1, y1, x1 + w, y1);
            var d2 = distToSegmentSq(lastPos.x, lastPos.y, x1 + w, y1, x1 + w, y1 + h);
            var d3 = distToSegmentSq(lastPos.x, lastPos.y, x1 + w, y1 + h, x1, y1 + h);
            var d4 = distToSegmentSq(lastPos.x, lastPos.y, x1, y1 + h, x1, y1);
        }
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
        if (trimming == true) {
            console.log('Hmmmm');
            trim(e);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            console.log('Hmmmm');
            trim(e);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });

}
circleEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        } else if (centermark == true) {
            centerCircleMaster(e);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
}
lineEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        } else if (centerline == true) {
            centerLineMaster(e);
            return;
        }
    });

    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        if (findOne(autoSnapModes, persistSnaps) == false) {
            autoSnapActive = false;
            activeOSNAPObj = e.srcElement.id;
            snapped = false;
        }
    });

}
lineAngleEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        if (findOne(autoSnapModes, persistSnaps) == false) {
            autoSnapActive = false;
            activeOSNAPObj = e.srcElement.id;
            snapped = false;
        }
    });

}
threePtCircleEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        } else if (centermark == true) {
            centerCircleMaster(e);
            return;
        }
    });
}
diaCircleEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        } else if (centermark == true) {
            centerCircleMaster(e);
            return;
        }
    });
}
polyLineEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    if ($('#' + activeObj).attr('points').split(',').length == 2) {
        $('#' + activeObj).remove();
        return;
    }
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });

};

polygonEnd = function() {
    drawing = false;
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });

};
pathEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            console.log('Hmmmm');
            trimMaster(e);
            return;
        }
    });
}

arc3ptEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        }
    });
}

arcStartCenEndEnd = function() {
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(activeObj).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        }
    });
}

bezierEnd = function() {
    $('#'+ activeObj).attr('control-points',curveRegister.join(' '));
    if (curveRegister.length == 4) {
        $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' L ' + curveRegister[2] + ' ' + curveRegister[3]);
        return;
    } else if (curveRegister.length == 4) {
        //quad bezier
        $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' Q ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5]);
        return;
    } else if (curveRegister.length == 6) {
        //cubic bezier
        $('#' + activeObj).attr('d', 'M ' + curveRegister[0] + ' ' + curveRegister[1] + ' C ' + curveRegister[2] + ' ' + curveRegister[3] + ' ' + curveRegister[4] + ' ' + curveRegister[5] + ' ' + curveRegister[6] + ' ' + curveRegister[7]);
        return;
    } else {
        //fake bezier
        $('#' + activeObj).attr('d', bezierfy(curveRegister));
    }
    curveRegister.length = 0;
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        }
    });
    return;
}
interpolateEnd= function() {
    $('#'+activeObj).attr('d',curvify(curveRegister));
    $('#'+activeObj).attr('points',curveRegister.join(' '));
    curveRegister.length = 0;
    actions.push({ type: 'create', objId: activeObj });
    var sw = $('#' + activeObj).attr('stroke-width') / 1;
    $('#svgMain').append($('#' + activeObj).clone().attr('class', 'aura').attr('id', 'aura' + activeObj).attr('stroke-width', sw + tolerance).attr('stroke-opacity', '0').attr('fill-opacity', '0'));
    document.getElementById('aura' + activeObj).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById('aura' + activeObj).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
    document.getElementById('aura' + activeObj).addEventListener('mousedown', function(e) {
        if (trimming == true) {
            trimMaster(e);
            return;
        }
    });
    return;
}
var toolEnd = [rectEnd, circleEnd, lineEnd, threePtCircleEnd, diaCircleEnd, polyLineEnd, polyLineEnd, polyLineEnd, polygonEnd, arc3ptEnd, arcStartCenEndEnd, lineAngleEnd, bezierEnd, interpolateEnd];
//var toolEnd = [rectEnd, circleEnd, lineEnd, lineAngleEnd, threePtCircleEnd, diaCircleEnd, polyLineEnd];
