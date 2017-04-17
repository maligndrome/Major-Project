intersect= function(shape1id,shape2id){
	shape1=constructShapeObj(shape1id);
	shape2=constructShapeObj(shape2id);
	pts=intersection(shape1,shape2);
	console.log(pts);
	if (pts.length>0){
		var temp=0;
		for(i=0;i<pts.length;i++){
			temp=createCircle(pts[i].x,pts[i].y,5);
			temp.setAttribute('class', 'intersection-marker');
			SVGRoot.appendChild(temp);
		}
		if(shape1.type==shape2.type==1){
			var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
	        line.setAttribute("stroke", "green");
	        line.setAttribute("fill-opacity", "0");
	        line.setAttribute('d', 'M' + pts[0].x + ' ' + pts[0].y + ' A ' + shape1.params.r + ' ' + shape1.params.r +' 0 1 1 '+ pts[1].x + ' ' + pts[1].y +'M' + pts[1].x + ' ' + pts[1].y + ' A ' + shape2.params.r + ' ' + shape2.params.r +' 0 0 1 '+ pts[0].x + ' ' + pts[0].y);
	        line.setAttribute('id', 'temp');
	        line.setAttribute('stroke-width', '2');
	        SVGRoot.appendChild(line);
	    }
	}
};
var shapeTypes={'circle':1, 'rect':0, 'line':2, 'polyline':3, 'ellipse': 4, 'path': 5,'polygon':7};
constructShapeObj = function(id){
	var type=shapeTypes[$('#'+id).prop("tagName")];
	
	if(type==1){
		return {
			type: 1,
			params:{
				cx:$('#'+id).attr('cx')/1,
				cy:$('#'+id).attr('cy')/1,
				r: $('#'+id).attr('r')/1
			},
			id: id
		};
	}
	if(type==0){
		return {
			type: 0,
			params: {
				x:$('#'+id).attr('x')/1,
				y:$('#'+id).attr('y')/1,
				w: $('#'+id).attr('width')/1,
				h: $('#'+id).attr('height')/1
			},
			id: id
		}
	}
	if (type==2){
		return {
			type: 2,
			params: {
				x1: $('#'+id).attr('x1')/1,
				y1: $('#'+id).attr('y1')/1,
				x2: $('#'+id).attr('x2')/1,
				y2: $('#'+id).attr('y2')/1
			},
			id: id
		}
	}
	if (type == 3) {
		var pts=$('#'+id).attr('points').split(' ');
		var pts1=[];
		for (var i=0;i<pts.length;i++){
			let temp=pts[i].split(',');
			pts1.push({x:temp[0]/1,y:temp[1]/1});
		}
		return {
			type: 3,
			id:id,
			params: {
				points:pts1
			}
		}
	}
	if (type==5) {
		return {
			type:5,
			params: {
				d:$('#'+id).attr('d')
			},
			id:id
		}
	}
	if(type==7){
		var pts=$('#'+id).attr('points').split(' ');
		var pts1=[];
		for (var i=0;i<pts.length;i++){
			let temp=pts[i].split(',');
			pts1.push({x:temp[0]/1,y:temp[1]/1});
		}
		return {
			type:7,
			params:{
				points:pts1
			},
			id:id
		}
	}
}