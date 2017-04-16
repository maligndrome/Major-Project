//wee! Never thought I'd make it here xD
undo = function(action) {
    if (action.type == 'create') {
        //get contents of the object
        if (action.objProps == undefined) {
            action.objProps = constructShapeObj(action.objId);
        }
        $('#' + action.objId).remove();
        $('#aura' + action.objId).remove();
        return;
    }
    if (action.type == 'dimension') {
        //get the dimension JSON
        if (action.dimProps == undefined) {
            action.dimProps = constructDimObj(action.objId);
        }
        removeDimension(action.objId, action.dimProps.shape, action.dimProps.type);
        return;
    }
    if(action.type == 'zoom-in'){
        //so zoom out!
        scale(scalingFactor/2);
        $('#SVGContainer').scrollLeft(action.scrollPos.x);
        $('#SVGContainer').scrollTop(action.scrollPos.y);
        if(zooming){
            if(zoomMode=='in'){
                $('#svgMain').css('cursor','zoom-in');
            } else {
                $('#svgMain').css('cursor','zoom-out');
            }
        }
        return;
    }
    if(action.type == 'zoom-out'){
        //so zoom in!
        scale(scalingFactor*2);
        $('#SVGContainer').scrollLeft(action.scrollPos.x);
        $('#SVGContainer').scrollTop(action.scrollPos.y);
        if(zooming){
            if(zoomMode=='in'){
                $('#svgMain').css('cursor','zoom-in');
            } else {
                $('#svgMain').css('cursor','zoom-out');
            }
        }
        return;
    }
};

redo = function(action) {
    if (action.type == 'create') {
        //re-create the bloody object!
        if (action.objProps.type == 1) {
            var cirProps = action.objProps.params;
            SVGRoot.appendChild(createCircle(cirProps.cx, cirProps.cy, cirProps.r, action.objId));
            activeObj=action.objId;
            circleEnd();
            return;
        }
        if (action.objProps.type == 0) {
            var rectProps = action.objProps.params;
            SVGRoot.appendChild(createRect(rectProps.x, rectProps.y, rectProps.w, rectProps.h, action.objId));
            activeObj=action.objId;
            rectEnd();
            return;
        }
        if (action.objProps.type == 2) {
            var lineProps = action.objProps.params;
            SVGRoot.appendChild(createLine(lineProps.x1, lineProps.y1, lineProps.x2, lineProps.y2, action.objId));
            activeObj=action.objId;
            lineEnd();
            return;
        }
        if (action.objProps.type == 5) {
            SVGRoot.appendChild(createPath(action.objProps.params.d, action.objId));
            activeObj=action.objId;
            pathEnd();
            return;
        }
        if (action.objProps.type == 6) {
            SVGRoot.appendChild(createPolygon(action.objProps.params.points, action.objId));
            activeObj=action.objId;
            polygonEnd();
            return;
        }
    }
    if (action.type == 'dimension') {
        redimension(action.dimProps);
        return;
    }
    if(action.type == 'zoom-in'){
        //so zoom in again!
        scale(scalingFactor*2,action.scrollPosTo);
        if(zooming){
            if(zoomMode=='in'){
                $('#svgMain').css('cursor','zoom-in');
            } else {
                $('#svgMain').css('cursor','zoom-out');
            }
        }
        return;
    }
    if(action.type == 'zoom-out'){
        //so zoom put again!
        scale(scalingFactor/2,action.scrollPosTo);
        if(zooming){
            if(zoomMode=='in'){
                $('#svgMain').css('cursor','zoom-in');
            } else {
                $('#svgMain').css('cursor','zoom-out');
            }
        }
        return;
    }
}
