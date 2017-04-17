rectChamferStraight = function(pos, obj, val) {
    var x1 = moveCache.params.x / 1;
    var y1 = moveCache.params.y / 1;
    var w = moveCache.params.w / 1;
    var h = moveCache.params.h / 1;
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
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '0');;
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
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '1');;
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
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '2');;
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
            $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', '3');
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
                var points = moveCache.params.points;
                for (var i = 0; i < points.length; i++) {
                    if (points[i].x == x1 && points[i].y == y1) {
                        points.splice(i, 1, { x: x1, y: y1 + val }, { x: x1 + val, y: y1 });
                        break;
                    }
                }
                //console.log(points);
                var pts = '' + points[0].x + ',' + points[0].y;
                for (i = 1; i < points.length; i++) {
                    pts += ' ' + points[i].x + ',' + points[i].y;
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered', chamfered+',0');;
                polygonEnd();
                return '';
            }
            if (dist2(x1 + w, y1, pos.x, pos.y) < 1000 && chamfered.indexOf('1') == -1) {
                //top right
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var points = moveCache.params.points;
                for (var i = 0; i < points.length; i++) {
                    if (points[i].x == x1 + w && points[i].y == y1) {
                        points.splice(i, 1, { x: x1 + w - val, y: y1 }, { x: x1 + w, y: y1 + val });
                        break;
                    }
                }
                var pts = '' + points[0].x + ',' + points[0].y;
                for (i = 1; i < points.length; i++) {
                    pts += ' ' + points[i].x + ',' + points[i].y;
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered',chamfered+ ',1');;
                polygonEnd();
                return '';
            }
            if (dist2(x1 + w, y1 + h, pos.x, pos.y) < 1000 && chamfered.indexOf('2') == -1) {
                //bottom right
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var points = moveCache.params.points;
                for (var i = 0; i < points.length; i++) {
                    if (points[i].x == x1 + w && points[i].y == y1 + h) {
                        points.splice(i, 1, { x: x1 + w, y: y1 + h - val }, { x: x1 + w - val, y: y1 + h });
                        break;
                    }
                }
                var pts = '' + points[0].x + ' ' + points[0].y;
                for (i = 1; i < points.length; i++) {
                    pts += ' ' + points[i].x + ',' + points[i].y;
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered',chamfered+ ',2');;
                polygonEnd();
                return '';
            }
            if (dist2(x1, y1 + h, pos.x, pos.y) < 1000 && chamfered.indexOf('3') == -1) {
                //bottom left
                $('#' + obj).remove();
                $('#aura' + obj).remove();
                var points = moveCache.params.points;
                for (var i = 0; i < points.length; i++) {
                    if (points[i].x == x1 && points[i].y == y1 + h) {
                        points.splice(i, 1, { x: x1 + val, y: y1 + h }, { x: x1, y: y1 + h - val });
                        break;
                    }
                }
                var pts = '' + points[0].x + ' ' + points[0].y;
                for (i = 1; i < points.length; i++) {
                    pts += ' ' + points[i].x + ',' + points[i].y;
                }
                var polygon = createPolygon(pts, obj, strokeWidth);
                SVGRoot.appendChild(polygon);
                $('#' + obj).attr('rect', x1 + ' ' + y1 + ' ' + w + ' ' + h).attr('chamfered',chamfered+ ',3');
                polygonEnd();
                return '';
            }
        }
    }
}
