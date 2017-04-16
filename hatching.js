addHatchPattern = function(pattern, patternId){
	$('#svgMain').find('defs').eq(0).append('<pattern id='+patternId+' patternUnits="userSpaceOnUse width="'+w+'" height="'+h+'" > <path d="'+pattern+'" style="stroke:'+stroke+'; stroke-width:'+strokeWidth+'" /></pattern>');
	return;
};

createLineHatch = function(id,t,d,w,c){
	//t=angle
	//d=tuning
	//w=width
	//c=color
	$('#svgMain').find('defs').eq(0).append('<pattern id="'+id+'" patternUnits="userSpaceOnUse" width="'+d+'" height="'+d+'"><path d="M0,'+d+' l'+(1.4142*d*Math.cos(t))+','+(-1.4142*d*Math.sin(t))+'" style="stroke:'+c+'; stroke-width:'+w+'" /></pattern>');
	return;
};

fillHatch = function(id,hatchId){
	if(id.indexOf('aura')>-1){ id= id.split('ra')[1]}
	$('#'+id).attr('fill','url(#'+hatchId+')');
	$('#'+id).attr('fill-opacity',"1");
	editing=false; hatchOn=false;
	return;
}