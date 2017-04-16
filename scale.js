//scaling module
scale = function(scaleAmt,scalePos){
	document.getElementById('svgMain').style="transform: scale("+scaleAmt+")";
	scalingFactor=scaleAmt;
	cursor.midRect.setAttribute('width', 5/scalingFactor);
    cursor.midRect.setAttribute('height', 5/scalingFactor);
    cursor.setAttribute('stroke-width',1/scalingFactor);
    cursor.changeScaling();
    if(scalePos){
    	cursor.position(scalePos);
    	$('#SVGContainer').css('overflow','hidden');
    	document.getElementById('SVGContainer').scrollTop =scalePos.y*scalingFactor-scalePos.y;
    	document.getElementById('SVGContainer').scrollLeft =scalePos.x*scalingFactor-scalePos.x;
    	$('#SVGContainer').css('overflow','scroll');
    }
    return;
};

scaleSelect = function(p,q){
	//bring p,q to viewport
	var a=800/Math.max(Math.abs(q.x-p.x),Math.abs(q.y-p.y));
	var scaleAmt=a;
	document.getElementById('svgMain').style="transform: scale("+scaleAmt+")";
	scalingFactor=scaleAmt;
	cursor.midRect.setAttribute('width', 5/scalingFactor);
    cursor.midRect.setAttribute('height', 5/scalingFactor);
    cursor.setAttribute('stroke-width',1/scalingFactor);
    var scalePos=q;
    if(p.x<q.x){
    	scalePos=p;
    }
    	cursor.position(scalePos);
    	$('#SVGContainer').css('overflow','hidden');
    	document.getElementById('SVGContainer').scrollTop =scalePos.y*scalingFactor;
    	document.getElementById('SVGContainer').scrollLeft =scalePos.x*scalingFactor;
    	$('#SVGContainer').css('overflow','scroll');
    return;
}