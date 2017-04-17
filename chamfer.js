rectChamferStraight = function(pos, obj, val) {
    var x1 = moveCache.params.x / 1;
    var y1 = moveCache.params.y / 1;
    var w = moveCache.params.w / 1;
    var h = moveCache.params.h / 1;
    var tempVal=val/1;
    val /= 25.4;
    val *= 300;
    if (2 * val >= w) {
        return 'INVALID INPUT';
    } else if (2 * val >= h) {
        return 'INVALID INPUT';
    } else {
        //determine which corner it is nearest to
        if (dist2(x1, y1, pos.x, pos.y) < 1000) {
            //top left
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            var pts = '';
            pts += (x1 + w) + ',' + y1;
            pts += ' ' + (x1 + w) + ',' + (y1 + h);
            pts += ' ' + (x1) + ',' + (y1 + h);
            pts += ' ' + (x1) + ',' + (y1 + val);
            pts += ' ' + (x1 + val) + ',' + y1;
            var polygon = createPolygon(pts, obj, strokeWidth);
            SVGRoot.appendChild(polygon);
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '0').attr('chamfer-vals',val);
            polygonEnd();
            return '';
        }
        if (dist2(x1 + w, y1, pos.x, pos.y) < 1000) {
            //top right
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            var pts = '';
            pts += (x1 + w) + ',' + (y1 + h);
            pts += ' ' + (x1) + ',' + (y1 + h);
            pts += ' ' + (x1) + ',' + (y1);
            pts += ' ' + (x1 + w - val) + ',' + (y1);
            pts += ' ' + (x1 + w) + ',' + (y1 + val);
            var polygon = createPolygon(pts, obj, strokeWidth);
            SVGRoot.appendChild(polygon);
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '1').attr('chamfer-vals',val);
            polygonEnd();
            return '';
        }
        if (dist2(x1 + w, y1 + h, pos.x, pos.y) < 1000) {
            //bottom right
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            var pts = '';
            pts += (x1) + ',' + (y1 + h);
            pts += ' ' + (x1) + ',' + (y1);
            pts += ' ' + (x1 + w) + ',' + (y1);
            pts += ' ' + (x1 + w) + ',' + (y1 + h - val);
            pts += ' ' + (x1 + w - val) + ',' + (y1 + h);
            var polygon = createPolygon(pts, obj, strokeWidth);
            SVGRoot.appendChild(polygon);
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '2').attr('chamfer-vals',val);
            polygonEnd();
            return '';
        }
        if (dist2(x1, y1 + h, pos.x, pos.y) < 1000) {
            //bottom left
            $('#' + obj).remove();
            $('#aura' + obj).remove();
            var pts = '';
            pts += (x1) + ',' + (y1);
            pts += ' ' + (x1 + w) + ',' + (y1);
            pts += ' ' + (x1 + w) + ',' + (y1 + h);
            pts += ' ' + (x1 + val) + ',' + (y1 + h);
            pts += ' ' + (x1) + ',' + (y1 + h - val);
            var polygon = createPolygon(pts, obj, strokeWidth);
            SVGRoot.appendChild(polygon);
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '3').attr('chamfer-vals',val);
            polygonEnd();
            return '';
        }
        return 'SELECT A CORNER';
    }
};

polygonChamferStraight = function(pos, obj, val) {
    if ($('#' + obj).attr('rect')) {
        var p = $('#' + obj).attr('rect').split(' ');
        var chamfered = $('#' + obj).attr('chamfered').split(',');
        var chamferVals = $('#' + obj).attr('chamfer-vals').split(',');
        val /= 25.4;
    	val *= 300;
        if (chamfered.length < 4) {
            var x1 = p[0] / 1;
            var y1 = p[1] / 1;
            var w = p[2] / 1;
            var h = p[3] / 1;
            if (dist2(x1, y1, pos.x, pos.y) < 1000 && chamfered.indexOf('0') == -1) {
                //console.log("chamfering top-left");
                //top left
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var temp=0;
                var tempVal;
                var pts='';
                pts+=(x1)+','+(y1+val)+' '+(x1+val)+','+(y1);
                if((temp=chamfered.indexOf('1'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+w-tempVal)+','+(y1)+' '+(x1+w)+','+(y1+tempVal);
                } else {
                    pts+=' '+(x1+w)+','+(y1);
                }
                if((temp=chamfered.indexOf('2'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+w)+','+(y1+h-tempVal)+' '+(x1+w-tempVal)+','+(y1+h);
                } else {
                    pts+=' '+(x1+w)+','+(y1+h);
                }
                if((temp=chamfered.indexOf('3'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+tempVal)+','+(y1+h)+' '+(x1)+','+(y1+h-tempVal);
                } else {
                    pts+=' '+(x1)+','+(y1+h);
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', chamfered.join(',')+',0').attr('chamfer-vals',chamferVals.join(',')+','+val);
                polygonEnd();
                return '';
            }
            if (dist2(x1 + w, y1, pos.x, pos.y) < 1000 && chamfered.indexOf('1') == -1) {
                //top right
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var temp=0;
                var tempVal;
                var pts='';
                if((temp=chamfered.indexOf('0'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=(x1)+','+(y1+tempVal)+' '+(x1+tempVal)+','+(y1);
                } else {
                    pts+=(x1)+','+(y1);
                }
                pts+=' '+(x1+w-val)+','+(y1)+' '+(x1+w)+','+(y1+val);
                if((temp=chamfered.indexOf('2'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+w)+','+(y1+h-tempVal)+' '+(x1+w-tempVal)+','+(y1+h);
                } else {
                    pts+=' '+(x1+w)+','+(y1+h);
                }
                if((temp=chamfered.indexOf('3'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+tempVal)+','+(y1+h)+' '+(x1)+','+(y1+h-tempVal);
                } else {
                    pts+=' '+(x1)+','+(y1+h);
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered',chamfered.join(',')+ ',1').attr('chamfer-vals',chamferVals.join(',')+','+val);
                polygonEnd();
                return '';
            }
            if (dist2(x1 + w, y1 + h, pos.x, pos.y) < 1000 && chamfered.indexOf('2') == -1) {
                //bottom right
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var temp=0;
                var tempVal;
                var pts='';
                if((temp=chamfered.indexOf('0'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=(x1)+','+(y1+tempVal)+' '+(x1+tempVal)+','+(y1);
                } else {
                    pts+=(x1)+','+(y1);
                }
                if((temp=chamfered.indexOf('1'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+w-tempVal)+','+(y1)+' '+(x1+w)+','+(y1+tempVal);
                } else {
                    pts+=' '+(x1+w)+','+(y1);
                }
                pts+=' '+(x1+w)+','+(y1+h-val)+' '+(x1+w-val)+','+(y1+h);
                if((temp=chamfered.indexOf('3'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+tempVal)+','+(y1+h)+' '+(x1)+','+(y1+h-tempVal);
                } else {
                    pts+=' '+(x1)+','+(y1+h);
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered',chamfered.join(',')+ ',2').attr('chamfer-vals',chamferVals.join(',')+','+val);
                polygonEnd();
                return '';
            }
            if (dist2(x1, y1 + h, pos.x, pos.y) < 1000 && chamfered.indexOf('3') == -1) {
                //bottom left
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var temp=0;
                var tempVal;
                var pts='';
                if((temp=chamfered.indexOf('0'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=(x1)+','+(y1+tempVal)+' '+(x1+tempVal)+','+(y1);
                } else {
                    pts+=(x1)+','+(y1);
                }
                if((temp=chamfered.indexOf('1'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+w-tempVal)+','+(y1)+' '+(x1+w)+','+(y1+tempVal);
                } else {
                    pts+=' '+(x1+w)+','+(y1);
                }
                if((temp=chamfered.indexOf('2'))>-1){
                    tempVal=chamferVals[temp]/1;
                    pts+=' '+(x1+w)+','+(y1+h-tempVal)+' '+(x1+w-tempVal)+','+(y1+h);
                } else {
                    pts+=' '+(x1+w)+','+(y1+h);
                }
                pts+=' '+(x1+val)+','+(y1+h)+' '+(x1)+','+(y1+h-val);
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered',chamfered.join(',')+ ',3').attr('chamfer-vals',chamferVals.join(',')+','+val);
                polygonEnd();
                return '';
            }
        }
    }
};
