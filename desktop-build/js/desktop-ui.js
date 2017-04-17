$(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    $('#SVGContainer').css('height', height - svg.top);
    $('#SVGContainer').css('width', width);
    scale(0.2);
    //'0=rect, 1=circle, 2=line, 3=threePtCircle, 4=diaCircle, 5=polyLine'
    $('#2ptline').click(function() { setTool(2) });
    $('#centradcirc').click(function() {
        setTool(1);
        $('#input-label').html('Circle tool<br/>Enter x,y( r) and press [ENTER].');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            if (value.length > 2) {
                $('#input-text').val('');
                $('#input-text').attr('placeholder', 'Invaid Input');
                $('#input-text').focus();
                return;
            }
            if (value.length == 1) {
                var temp = value[0].split(',');
                if (isNaN(temp[0]) || isNaN(temp[1])) {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
                lastPos = { x: ((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), y: ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount) };
                cursor.position(lastPos);
                $('#coordX').html(cursor.x);
                $('#coordY').html(cursor.y);
                $('#coord-input').css({ top: svg.top + cursor.y - 5 - 20, left: svg.left + cursor.x + 5 });
                drawing = true;
                circleInit();
                return;
            } else {
                var temp = value[0].split(',');
                if (isNaN(temp[0]) || isNaN(temp[1]) || isNaN(value[1])) {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
                objCount += 1;
                activeObj = objCount;
                var circle = createCircle(((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount), value[1] / 1, objCount);
                SVGRoot.appendChild(circle);
                $('#input-text').val('');
                $('#input-text').attr('placeholder', '');
                $('#input-text').focus();
                return;
            }
        });
    });
    $('#3ptcirc').click(function() {
        setTool(3);
        $('#input-label').html('3 point circle <br/>Enter x,y( x2,y2 x3,y3) and press [ENTER].');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            if (value.length > 3) {
                $('#input-text').val('');
                $('#input-text').attr('placeholder', 'Invaid Input');
                $('#input-text').focus();
                return;
            }
            var sendPts = [];
            for (var i = 0; i < value.length; i++) {
                let temp = value[i].split(',');
                if (!isNaN(temp[0]) && !isNaN(temp[1])) {
                    sendPts.push({ x: ((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), y: ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount) });
                } else {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
            }
            console.log(sendPts);
            threePtCircleInit(sendPts);
            $('#input-text').val('');
            $('#input-text').attr('placeholder', '');
            $('#input-text').focus();
            return;
        });
        return;
    });
    $('#2ptcirc').click(function() {
        setTool(4);
        $('#input-label').html('2 point circle (diametric)<br/>Enter x,y( x2,y2) and press [ENTER].');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            if (value.length > 2) {
                $('#input-text').val('');
                $('#input-text').attr('placeholder', 'Invaid Input');
                $('#input-text').focus();
                return;
            }
            var sendPts = [];
            for (var i = 0; i < value.length; i++) {
                let temp = value[i].split(',');
                if (!isNaN(temp[0]) && !isNaN(temp[1])) {
                    sendPts.push({ x: ((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), y: ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount) });
                } else {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
            }
            diaCircleInit(sendPts);
            $('#input-text').val('');
            $('#input-text').attr('placeholder', '');
            $('#input-text').focus();
            return;
        });
    });
    $('#bezier').click(function() {
        setTool(12);
        $('#input-label').html('Arc with start, end and radius<br/>Enter x,y( x2,y2 r) and press [ENTER].');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            var sendPts = [];
            for (var i = 0; i < value.length; i++) {
                let temp = value[i].split(',');
                if (!isNaN(temp[0]) && !isNaN(temp[1])) {
                    sendPts.push(((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount));
                } else {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
            }
            bezierInit(sendPts);
            $('#input-text').val('');
            $('#input-text').attr('placeholder', '');
            $('#input-text').focus();
            return;
        });
    });
    $('#interpolate').click(function() {
        setTool(13);
    });
    $('#arc-2pt-rad').click(function() {
        setTool(10);
        $('#input-label').html('Arc with start, end and radius<br/>Enter x,y( x2,y2 r) and press [ENTER].');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            if (value.length > 2) {
                $('#input-text').val('');
                $('#input-text').attr('placeholder', 'Invaid Input');
                $('#input-text').focus();
                return;
            }
            var sendPts = [];
            for (var i = 0; i < value.length; i++) {
                let temp = value[i].split(',');
                if (!isNaN(temp[0]) && !isNaN(temp[1])) {
                    sendPts.push({ x: ((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), y: ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount) });
                } else {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
            }
            diaCircleInit(sendPts);
            $('#input-text').val('');
            $('#input-text').attr('placeholder', '');
            $('#input-text').focus();
            return;
        });
    });
    $('#arc-3pt').click(function() {
        setTool(9);
        $('#input-label').html('Arc with start, end and radius<br/>Enter x,y( x2,y2 r) and press [ENTER].');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            if (value.length > 2) {
                $('#input-text').val('');
                $('#input-text').attr('placeholder', 'Invaid Input');
                $('#input-text').focus();
                return;
            }
            var sendPts = [];
            for (var i = 0; i < value.length; i++) {
                let temp = value[i].split(',');
                if (!isNaN(temp[0]) && !isNaN(temp[1])) {
                    sendPts.push({ x: ((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), y: ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount) });
                } else {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
            }
            diaCircleInit(sendPts);
            $('#input-text').val('');
            $('#input-text').attr('placeholder', '');
            $('#input-text').focus();
            return;
        });
    });
    $('#ellipse').click(function() { setTool(7) });
    $('#polygon').click(function() { setTool(8) });
    $('#rectangle').click(function() { setTool(0) });
    $('#polyline').click(function() {
        setTool(5);
        $('#input-label').html('Polyline tool<br/>Enter x,y( x2,y2 ..) and press [ENTER]. To end polyline, press [SHIFT]+[ENTER]');
        $('#input-text').off('change');
        $('#input-text').on('change', function() {
            var value = $('#input-text').val().split(' ');
            var sendPts = [];
            for (var i = 0; i < value.length; i++) {
                let temp = value[i].split(',');
                if (!isNaN(temp[0]) && !isNaN(temp[1])) {
                    sendPts.push({ x: ((temp[0] / 1) * currRes / 25.4).toFixed(leastCount), y: ((temp[1] / 1) * currRes / 25.4).toFixed(leastCount) });
                } else {
                    $('#input-text').val('');
                    $('#input-text').attr('placeholder', 'Invaid Input');
                    $('#input-text').focus();
                    return;
                }
            }
            polyLineInit(sendPts);
            $('#input-text').val('');
            $('#input-text').attr('placeholder', '');
            $('#input-text').focus();
            return;
        });
    });
    $('#autosnap').click(function() { autoSnapOn = !autoSnapOn; });
    $('#horiz').click(function() {
        osnapOn = true;
        osnapMode = 0;
    });
    $('#vert').click(function() {
        osnapOn = true;
        osnapMode = 1;
    });
    $('#radius').click(function() {
        dimensioning = true;
        editing = true;
        dimActive = 0;
        return;
    });
    $('#diameter').click(function() {
        dimensioning = true;
        editing = true;
        dimActive = 1;
        return;
    });
    $('#length').click(function() {
        dimensioning = true;
        editing = true;
        dimActive = 2;
        return;
    });
    $('#trim').click(function() {
        editing = true;
        trimming = true;
        selectOn = false;
        selecting = false;
        select1.x=0;
        select1.y=0;
        select2.x=0;
        select2.y=0;
    });
    $('#chamfer').click(function() {
        editing = true;
        chamfer = true;
        selectOn = false;
        selecting = false;
        select1.x=0;
        select1.y=0;
        select2.x=0;
        select2.y=0;
    });
    $('#centerline').click(function() {
        editing = true;
        centerline = true;
        selectOn = false;
        selecting = false;
        select1.x=0;
        select1.y=0;
        select2.x=0;
        select2.y=0;
    });
    $('#centermark').click(function() {
        editing = true;
        centermark = true;
        selectOn = false;
        selecting = false;
        select1.x=0;
        select1.y=0;
        select2.x=0;
        select2.y=0;
    });
    $('#angle').click(function() {
        dimensioning = true;
        editing = true;
        dimActive = 3;
        return;
    });
    $('#hatch').click(function() {
        editing = true;
        hatchOn = true;
        return;
    });
    $('#zoom-in').click(function() {
        if (zooming == false) {
            zooming = true;
            zoomMode = 'in';
            $('#svgMain').css('cursor', 'zoom-in');
            $('.cursor').hide();
            $('#input-label').html('Zoom-in tool.Click on a region to zoom in. [ESC] to leave.');
            return;
        } else {
            zooming = false;
            zoomMode = 'in';
            $('#svgMain').css('cursor', 'default');
            $('.cursor').show();
            return;
        }
    });
    $('#zoom-out').click(function() {
        if (zooming == false) {
            zooming = true;
            zoomMode = 'out';
            $('#svgMain').css('cursor', 'zoom-out');
            $('.cursor').hide();
            $('#input-label').html('Zoom-out tool.Click on a region to zoom out. [ESC] to leave.');
            return;
        } else {
            zooming = false;
            zoomMode = 'out';
            $('#svgMain').css('cursor', 'default');
            $('.cursor').show();
            return;
        }
    });
    $('#zoom-select').click(function() {
        if (zooming == false) {
            zooming = true;
            zoomMode = 'select';
            $('#svgMain').css('cursor', 'zoom-in');
            $('.cursor').hide();
            $('#input-label').html('Zoom-select tool. Select region to zoom in to. [ESC] to leave.');
            return;
        } else {
            zooming = false;
            $('#svgMain').css('cursor', 'default');
            $('.cursor').show();
            return;
        }
    });

    $('#save-png').click(function() {
        $('#save-input').html('<label>Name of file:</label><input type="text" id="save-name" /><br/><label>Author:</label><input type="text" id="save-author" /><br/><label>Name of Drawing:</label><input type="text" id="save-drawing" /><br/><button id="save-it" class="button">Save</button>')
        window.showMetroDialog('#save-dialog');
        $('#save-it').click(function() {
            var name = $('#save-name').val();
            var author = $('#save-author').val();
            var dname = $('#save-drawing').val();
            var date = new Date();
            if (name != '') {
                saveAsPNG(name, author, dname, date);
                window.hideMetroDialog('#save-dialog');
            }
        });
    });
    $('#page-setup').click(function() {
        window.showMetroDialog('#setup-dialog');
    });
    $('#A4').click(function() {
        var a = resizeTo(3508 * currRes / 300, 2480 * currRes / 300);
        currWidth = a[0];
        currHeight = a[1];
        return;
    });
    $('#A3').click(function() {
        var a = resizeTo(4960 * currRes / 300, 3508 * currRes / 300);
        currWidth = a[0];
        currHeight = a[1];
        return;
    });
    $('#A2').click(function() {
        var a = resizeTo(7016 * currRes / 300, 4960 * currRes / 300);
        currWidth = a[0];
        currHeight = a[1];
        return;
    });
    $('#page-res').change(function() {
        var prevRes = currRes;
        currRes = $(this).val();
        var a = resizeTo(currWidth * currRes / prevRes, currHeight * currRes / prevRes);
        currWidth = a[0];
        currHeight = a[1];
        currMargin = currMargin * currRes / prevRes;
        $('#margin').attr('x', currMargin);
        $('#margin').attr('y', currMargin);
        $('#margin').attr('width', currWidth - 2 * currMargin);
        $('#margin').attr('height', currHeight - 2 * currMargin);
        strokeWidth = sw(currRes);
        resetStroke();
        return;
    });
    $('#page-margin').change(function() {
        if ($('#margin-unit').val() == 'inch')
            currMargin = $(this).val() * currRes;
        else
            currMargin = Math.round($(this).val() * currRes / 2.54);
        $('#margin').attr('x', currMargin);
        $('#margin').attr('y', currMargin);
        $('#margin').attr('width', currWidth - 2 * currMargin);
        $('#margin').attr('height', currHeight - 2 * currMargin);
        return;
    });
    $('#margin-unit').change(function() {
        if ($(this).val() == 'inch')
            currMargin = $('#page-margin').val() * currRes;
        else
            currMargin = Math.round($('#page-margin').val() * currRes / 2.54);
        $('#margin').attr('x', currMargin);
        $('#margin').attr('y', currMargin);
        $('#margin').attr('width', currWidth - 2 * currMargin);
        $('#margin').attr('height', currHeight - 2 * currMargin);
        return;
    });
});

resizeTo = function(w, h) {
    w = Math.round(w);
    h = Math.round(h);
    $('#svgMain').attr('width', w);
    $('#svgMain').attr('height', h);
    $('#bg').attr('width', w);
    $('#bg').attr('height', h);
    $('#margin').attr('width', w - 2 * currMargin);
    $('#margin').attr('height', h - 2 * currMargin);
    return [w, h];
}
sw = function(res) {
    //300 corr to 5
    //60 corr to 1
    if (res < 150) {
        return 2.5;
    }
    if (res < 250) {
        return 4;
    }
    if (res < 400) {
        return 5;
    }

}
resetStroke = function() {
    var temp = cursor.getAttribute('stroke-width');
    $('path').attr('stroke-width', strokeWidth);
    $('line').attr('stroke-width', strokeWidth);
    $('circle').attr('stroke-width', strokeWidth);
    $('rect').attr('stroke-width', strokeWidth);
    $('polygon').attr('stroke-width', strokeWidth);
    $('ellipse').attr('stroke-width', strokeWidth);
    $('polyline').attr('stroke-width', strokeWidth);
    cursor.setAttribute('stroke-width', temp);
}
