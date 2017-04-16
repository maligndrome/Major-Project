pathInter=function (){
	var _this=this;
	_this.line = function(path,line){
		var RectA = document.getElementById(path.id).getBoundingClientRect();
        RectB = document.getElementById(line.id).getBoundingClientRect();
        if (RectA.left < RectB.right && RectA.right > RectB.left && RectA.top < RectB.bottom && RectA.bottom > RectB.top) {
        	//they do intersect(perhaps!)
        	var pathComponents = splitPath(path.params.d);
        	var pts=[];
        	for (var i=0;i<pathComponents.lenght;i++){
        		pts.pushArray(intersection(pathComponents[i],line));
        	}
        	return pts;
        }
        return [];
	}
}
splitPath = function (d){
	//pliss to use absolute paths for now!
	var components=d.split(/(?=[MLHVCSQTAZ])/);
	var compArray=[]
	var currPt={x:0,y:0};
	for (var i=0;i<components.length;i++) {
		if(components[i][0]=='M'){
			var sub=components[i].split(' ');
			currPt.x=sub[1]/1;
			currPt.y=sub[2]/1;
			continue;
		}
		if(components[i][0]=='L'){
			var sub=components[i].split(' ');
			compArray.push({
				type:2,
				params:{
					x1: currPt.x,
					y1:currPt.y,
					x2:sub[1]/1,
					y2:sub[2]/1
				}
			});
			currPt.x=sub[1]/1;
			currPt.y=sub[2]/1;
			continue;
		}
		if(components[i][0]=='H'){
			var sub=components[i].split(' ');
			compArray.push({
				type:2,
				params:{
					x1:currPt.x,
					y1:currPt.y,
					x2:sub[1]/1,
					y2:currPt.y
				}
			});
			currPt.x=sub[1]/1;
			continue;
		}
		if(components[i][0]=='V'){
			var sub=components[i].split(' ');
			compArray.push({
				type:2,
				params:{
					x1:currPt.x,
					y1:currPt.y,
					x2:currPt.x,
					y2:sub[1]/1
				}
			});
			currPt.y=sub[1]/1;
			continue;
		}
		if(components[i][0]=='A'){
			//A rx ry x-rotation large-arc-flag sweep-flag x y
			var sub=components[i].split(' ');
			compArray.push({
				type:6,
				params:{
					x1:currPt.x,
					y1:currPt.y,
					rx:sub[1]/1,
					ry:sub[2]/1,
					xrt:sub[3]/1,
					large:sub[4]/1,
					sweep:sub[5]/1,
					x2:sub[6]/1,
					y2:sub[7]/1
				}
			});
			currPt.x=sub[6]/1;
			currPt.y=sub[7]/1;
			continue;
		}
	}
	return compArray;
}