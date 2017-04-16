centerLineCache='';
centerLineMaster = function(e){
    var id= e.currentTarget.id || e.srcElement.id;
    id= id.split('ra')[1];
    if(centerLineCache.length!=''){
        //ready to centerline the shit outta this!
        centerLineLines(centerLineCache,id);
        centerline=false;
        editing=false;
        return;
    } else {
        centerLineCache=id;
    }
    return;
};

centerCircleMaster = function(e) {
    var id= e.currentTarget.id || e.srcElement.id;
    id= id.split('ra')[1];
    var r= $('#'+id).attr('r')/1;
    var cx= $('#'+id).attr('cx')/1;
    var cy= $('#'+id).attr('cy')/1;
    var cm=createPath('M '+cx+' '+cy+' L '+(cx+r+100)+' '+ cy+' M '+cx+' '+cy+' L '+(cx-r-100)+' '+ cy+' M '+cx+' '+cy+' L '+(cx)+' '+ (cy-r-100)+' M '+cx+' '+cy+' L '+(cx)+' '+ (cy+r+100),'cm-'+id, strokeWidth*0.5);
    cm.setAttribute('stroke-dasharray', '50,30,50,30');
    SVGRoot.appendChild(cm);
    centermark=false;
    return;
}
centerLineLines = function(line1, line2) {
    var x1 = $('#' + line1).attr('x1') / 1;
    var x2 = $('#' + line1).attr('x2') / 1;
    var x3 = $('#' + line2).attr('x1') / 1;
    var x4 = $('#' + line2).attr('x2') / 1;
    var y1 = $('#' + line1).attr('y1') / 1;
    var y2 = $('#' + line1).attr('y2') / 1;
    var y3 = $('#' + line2).attr('y1') / 1;
    var y4 = $('#' + line2).attr('y2') / 1;
    var cx1 = 1,
        cy1 = 1,
        cx2 = 1,
        cy2 = 1;
    if (dist2(x1, y1, x3, y3) < dist2(x1, y1, x4, y4)) {
        cx1 = (x1 + x3) / 2;
        cx2 = (x2 + x4) / 2;
        cy1 = (y1 + y3) / 2;
        cy2 = (y2 + y4) / 2;
    } else {
        cx1 = (x1 + x4) / 2;
        cx2 = (x2 + x3) / 2;
        cy1 = (y1 + y4) / 2;
        cy2 = (y2 + y3) / 2;
    }
    var line = createLine(cx1, cy1, cx2, cy2, 'cl-' + line1 + '-' + line2, strokeWidth*0.5);
    line.setAttribute('stroke-dasharray', '50,30,50,30');
    SVGRoot.appendChild(line);
    return;
};
