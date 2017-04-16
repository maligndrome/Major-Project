dimEnd = function () {
	actions.push({type:'dimension',objId: dimObj});
};

constructDimObj = function(id){
	var retObj= {
		id: id,
		shape: dimObjShape,
		type: dimMode[dimActive]
	}
	if(retObj.type=='rad'|| retObj.type == 'dia' || retObj.type =='len'){
		retObj.params = {
			x1:$('#'+id).attr('x1')/1,
			y1:$('#'+id).attr('y1')/1,
			x2:$('#'+id).attr('x2')/1,
			y2:$('#'+id).attr('y2')/1,
		};
		retObj.text= {
				x: $('#text-'+id).attr('x')/1,
				y:$('#text-'+id).attr('y')/1,
				content:$('#text-'+id).html()
			};
		if(retObj.type=='len'){
			retObj.params.x3=$('#pro1-'+id).attr('x1')/1;
			retObj.params.y3=$('#pro1-'+id).attr('y1')/1;
			retObj.params.x4=$('#pro2-'+id).attr('x1')/1;
			retObj.params.y4=$('#pro2-'+id).attr('y1')/1;
		}
		console.log(retObj);
		return retObj;
	}

};

removeDimension = function (id,shape,type){
	if(shape=='circle'){
		$('#'+id).remove();
		$('#text-'+id).remove();
		return;
	}
	if(shape=='rect'||shape=='polygon'){
		$('#'+id).remove();
		$('#text-'+id).remove();
		$('#pro1-'+id).remove();
		$('#pro2-'+id).remove();
	}
};

redimension = function(dimProps){
	var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("id", "text-" + dimProps.id);
        text.setAttribute("x", dimProps.text.x);
        text.setAttribute("y", dimProps.text.y);
        text.setAttribute("font-size", "10");
        text.innerHTML = dimProps.text.content;
        SVGRoot.appendChild(text);
    if(dimProps.type=='rad'){
    	var line = createLine(dimProps.params.x1,dimProps.params.y1,dimProps.params.x2,dimProps.params.y2, dimProps.id);
        line.setAttribute('marker-start', 'url(#head)');
        SVGRoot.appendChild(line);
        return;
    } 
    if(dimProps.type=='dia'){
    	var line = createLine(dimProps.params.x1,dimProps.params.y1,dimProps.params.x2,dimProps.params.y2, dimProps.id);
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        return;
    }
    if(dimProps.type=='len'){
    	var line = createLine(dimProps.params.x1,dimProps.params.y1,dimProps.params.x2,dimProps.params.y2, dimProps.id);
        line.setAttribute('marker-start', 'url(#head)');
        line.setAttribute('marker-end', 'url(#head)');
        SVGRoot.appendChild(line);
        line = createLine(dimProps.params.x1,dimProps.params.y1, dimProps.params.x3,dimProps.params.y3, 'pro1-' + dimProps.id);
        SVGRoot.appendChild(line);
        line = createLine(dimProps.params.x2,dimProps.params.y2, dimProps.params.x4,dimProps.params.y4, 'pro2-' + dimProps.id);
        SVGRoot.appendChild(line);
        return;
    }
};