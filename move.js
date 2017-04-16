pickObj = function(e){
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
            	moveStartPos.x=evt.x;
            	moveStartPos.y=evt.y;
            	moveCache = x[1];
                return b[i];
                break;
            }
        }
    }
    return '';
}

moveObjPos = function (e){
	var evt = getMousePos(SVGRoot, e);
	var dx=evt.x-moveStartPos.x;
	var dy=evt.y-moveStartPos.y;
	if (moveCache.type==1 ) {
		var cx=moveCache.params.cx;
		var cy=moveCache.params.cy;
		var r=moveCache.params.r;
		$('#'+moveObj).attr('cx',cx +dx);
		$('#'+moveObj).attr('cy',cy +dy);
		$('#aura'+moveObj).attr('cx',cx +dx);
		$('#aura'+moveObj).attr('cy',cy +dy);
		return;
	}
	if (moveCache.type ==2){
		var x1= moveCache.params.x1;
		var x2= moveCache.params.x2;
		var y1= moveCache.params.y1;
		var y2= moveCache.params.y2;
		$('#'+moveObj).attr('x1',x1+dx);
		$('#'+moveObj).attr('y1',y1+dy);
		$('#'+moveObj).attr('x2',x2+dx);
		$('#'+moveObj).attr('y2',y2+dy);
		$('#aura'+moveObj).attr('x1',x1+dx);
		$('#aura'+moveObj).attr('y1',y1+dy);
		$('#aura'+moveObj).attr('x2',x2+dx);
		$('#aura'+moveObj).attr('y2',y2+dy);
	}
	if (moveCache.type ==0){
		var x=moveCache.params.x;
		var y=moveCache.params.y;
		$('#'+moveObj).attr('x',x +dx);
		$('#'+moveObj).attr('y',y +dy);
		$('#aura'+moveObj).attr('x',x +dx);
		$('#aura'+moveObj).attr('y',y +dy);
		return;
	}
	if (moveCache.type == 7) {
		var pts=moveCache.params.points;
		var ptS='';
		for (var i=0;i<pts.length;i++){
			if (i>0)
				ptS+=' '+(pts[i].x+dx)+','+(pts[i].y+dy);
			else
				ptS+=(pts[i].x+dx)+','+(pts[i].y+dy)
		}
		$('#'+moveObj).attr('points', ptS);
		$('#aura'+moveObj).attr('points', ptS);
		return;
	}
	if (moveCache.type == 3) {
		var pts=moveCache.params.points;
		var ptS='';
		for (var i=0;i<pts.length;i++){
			if (i>0)
				ptS+=' '+(pts[i].x+dx)+','+(pts[i].y+dy);
			else
				ptS+=(pts[i].x+dx)+','+(pts[i].y+dy)
		}
		$('#'+moveObj).attr('points', ptS);
		$('#aura'+moveObj).attr('points', ptS);
		return;	
	}
	if (moveCache.type == 5 && moveCache.split[0].type== 6){
		var p=moveCache.split[0].params;
		var d='M '+(p.x1+dx)+' '+(p.y1+dy)+' A '+p.rx+' '+p.ry+' 0 '+p.large+' '+p.sweep+' '+(p.x2+dx)+' '+(p.y2+dy);
		$('#'+moveObj).attr('d',d);
		$('#aura'+moveObj).attr('d',d);
		return;
	}
}