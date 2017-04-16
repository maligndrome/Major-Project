svgSnapPos = function (x,y,mode) {
	//modes=>
	//0-horiz
	//1-vertical
	if(mode==0) {
		var cx=osnapParams[0];
		var cy=osnapParams[1];
		if(angPts(cx,cy,cx+1,cy,x,y)<0.26){
			return {
				x: x,
				y:cy
			};
		}
	} else if(mode==1){
		var cx=osnapParams[0];
		var cy=osnapParams[1];
		if(angPts(cx,cy,cx,cy+1,x,y)<0.26){
			return {
				x: cx,
				y: y
			}
		}
	} 
	return { x:x, y:y};
}