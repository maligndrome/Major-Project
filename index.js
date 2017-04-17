ActionArray = function() {
    this.arr = [];
    this.length = this.arr.length;
    this.push = function(elem) {
        if (this.arr.length - 1 != currAction) {
            this.arr.splice(currAction + 1, 10);
        } else if (this.arr.length == 10) {
            this.arr.splice(0, 1);
        }
        this.arr.push(elem);
        this.length = this.arr.length;
        currAction = this.length - 1;
        return;
    }
}
actions = new ActionArray();
currAction = 0;
/*template dependent vars*/
/*defaults?*/
selectStrokeHue = '#333';
selectFillHue = '#666';
selectFillOpacity = '0.3';
leastCount = 2;
currWidth = 3508;
currHeight = 2480;
currRes = 300;
currMargin = 118;
strokeWidth = 5;
unit = 'mm';
//
SVGRoot = document.getElementById('svgMain');
svg = {
    left: SVGRoot.getBoundingClientRect().left,
    top: SVGRoot.getBoundingClientRect().top
};
Cursor = function() {
    this.midRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.vHair = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.hHair = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.midRect.setAttribute('width', 5);
    this.midRect.setAttribute('height', 5);
    this.c = 2.5 / scalingFactor;
    this.d = 20 / scalingFactor
    SVGRoot.appendChild(this.midRect);
    SVGRoot.appendChild(this.vHair);
    SVGRoot.appendChild(this.hHair);
    this.changeScaling = function() {
        console.log("hey");
        this.c = 2.5 / scalingFactor;
        this.d = 20 / scalingFactor;
        this.setAttribute('cx', this.getAttribute('cx'))
        this.setAttribute('cy', this.getAttribute('cy'));
        return;
    }
    this.setAttribute = function(a, b) {
        if (a == 'cx') {
            this.midRect.setAttribute('x', b - this.c);
            this.hHair.setAttribute('x1', b - this.d);
            this.hHair.setAttribute('x2', b + this.d);
            this.vHair.setAttribute('x1', b);
            this.vHair.setAttribute('x2', b);
            this.x = b / 1;
        } else if (a == 'cy') {
            this.midRect.setAttribute('y', b - this.c);
            this.y = b / 1;
            this.vHair.setAttribute('y1', b - this.d);
            this.vHair.setAttribute('y2', b + this.d);
            this.hHair.setAttribute('y1', b);
            this.hHair.setAttribute('y2', b);
        } else {
            this.midRect.setAttribute(a, b);
            this.vHair.setAttribute(a, b);
            this.hHair.setAttribute(a, b);
        }
        return;
    };
    this.position = function(pos) {
        this.setAttribute('cx', pos.x);
        this.setAttribute('cy', pos.y);
    };
    this.getAttribute = function(a) {
        if (a == 'cx') {
            return this.x;
        } else if (a == 'cy') {
            return this.y;
        } else {
            return this.midRect.getAttribute(a);
        }
    };

};
console.log('0=rect\n1=circle\n2=line\n3=threePtCircle\n4=diaCircle\n5=polyLine\n6=3ptellipse\n7=fociellipse\n8=polygon\n9=arc3pt');
canvas = document.getElementById('svgMain');
scalingFactor = 1;
zooming = false;
zoomMode = 'in';
drawing = false;
editing = true;
hatching = false;
mousePos = {
    x: 0,
    y: 0
};
activeObj = '';
objCount = 0;
osnapOn = false;
osnapUsage = false;
osnapParams = [];
osnapModes = 0;
activeOSNAPObj = '';
tolerance = 10;
autoSnapOn = true;
autoSnapActive = false;
autoSnapModes = ['tan', 'mid', 'end'];
persistSnaps = ['perp'];
snapped = false;
snapCache = {};
dimensioning = false;
setDimension = false;
dimCache = [];
dimObj = '';
dimObjShape = '';
dimMode = ['rad', 'dia', 'len', 'ang'];
dimActive = 0;
//SVGRoot.style.cursor = 'none';
cursor = new Cursor();
cursor.setAttribute("stroke", "black");
cursor.setAttribute("fill", "white");
cursor.setAttribute('cx', mousePos.x);
cursor.setAttribute('cy', mousePos.y);
cursor.setAttribute('r', 10);
cursor.setAttribute('class', 'cursor');
cursor.setAttribute('stroke-width', '1');
cursor.setAttribute('style', 'z-index:1000');
toolPersist = 0;
tool = 1;
hatchOn = false;
selectOn = true;
select1 = {
    x: 0,
    y: 0
};
select2 = {
    x: 0,
    y: 0
};
selecting = false;
selected = [];
moveObj = '';
moving = false;
moveStartPos = { x: 0, y: 0 };
moveCache = [];
trimming = false;
centerline = false;
centermark = false;
setTool = function(x) {
    centerline = false;
    centermark = false;
    editing = false;
    selectOn = false;
    tool = x;
    return;
}
endTool = function() {
    trimming = false;
    editing = true;
    selectOn = true;
    return;
}
lastPos = mousePos;
activeObjEdit = '', activeObjEditId = '';
chamfer = false;
chamferObj = '';
SVGRoot.addEventListener("mousedown", function(e) {
    if (e.button == 0) {
        $('#rightClkMenu').hide();
        if (chamfer) {
            chamferObj = pickObj(e);
            console.log('current',chamferObj);
            var chamferPos = {
                        x: cursor.getAttribute('cx') / 1,
                        y: cursor.getAttribute('cy') / 1
                    };
            if ($('#' + chamferObj).prop('tagName') == 'rect') {
                $('#input-label').html('Enter chamfer length: x');
                $('#input-text').off('change');
                $('#input-text').on('change', function() {
                    var value = $('#input-text').val().split(' ');
                    var a='';
                    if (value[0]=='S'){
                        a=rectChamferStraight(chamferPos,chamferObj,value[1]/1);
                    } else if (value[0] == 'R'){
                        a=rectChamferRound(chamferPos,chamferObj,value[1]/1);
                    } else {
                        $('#input-text').val('');
                        $('#input-text').attr('placeholder', 'INVALID INPUT');
                        $('#input-text').focus();
                        return;
                    }
                    $('#input-text').val(a);
                    $('#input-text').attr('placeholder', '');
                    $('#input-text').focus();
                    return;
                });
            }
            if ($('#' + chamferObj).prop('tagName') == 'polygon') {
                $('#input-label').html('Enter chamfer length: x');
                $('#input-text').off('change');
                $('#input-text').on('change', function() {
                    var value = $('#input-text').val().split(' ');
                    var a='';
                    if (value[0]=='S'){
                        a=polygonChamferStraight(chamferPos,chamferObj,value[1]/1);
                    } else if (value[0] == 'R'){
                        a=polygonChamferRound(chamferPos,chamferObj,value[1]/1);
                    } else {
                        $('#input-text').val('');
                        $('#input-text').attr('placeholder', 'INVALID INPUT');
                        $('#input-text').focus();
                        return;
                    }
                    $('#input-text').val(a);
                    $('#input-text').attr('placeholder', '');
                    $('#input-text').focus();
                    return;
                });
            }
        }
        if (zooming) {
            if (zoomMode == 'in') {
                actions.push({
                    type: 'zoom-in',
                    scrollPos: {
                        x: $('#SVGContainer').scrollLeft(),
                        y: $('#SVGContainer').scrollTop()
                    },
                    scrollPosTo: {
                        x: cursor.getAttribute('cx') / 1,
                        y: cursor.getAttribute('cy') / 1
                    }
                });
                scale(scalingFactor * 2, {
                    x: cursor.getAttribute('cx') / 1,
                    y: cursor.getAttribute('cy') / 1
                });
                $('#svgMain').css('cursor', 'zoom-in');
                return;
            }
            if (zoomMode == 'out') {
                if (scalingFactor == 0.25) {
                    $('#svgMain').css('cursor', 'not-allowed');
                    return;
                }
                actions.push({
                    type: 'zoom-out',
                    scrollPos: {
                        x: $('#SVGContainer').scrollLeft(),
                        y: $('#SVGContainer').scrollTop()
                    },
                    scrollPosTo: {
                        x: cursor.getAttribute('cx') / 1,
                        y: cursor.getAttribute('cy') / 1
                    }
                });
                scale(scalingFactor / 2, {
                    x: cursor.getAttribute('cx') / 1,
                    y: cursor.getAttribute('cy') / 1
                });
                $('#svgMain').css('cursor', 'zoom-out');
                return;
            }
            if (zoomMode == 'select') {
                select1.x = cursor.getAttribute('cx') / 1;
                select1.y = cursor.getAttribute('cy') / 1;
                var rect = createRect(select1.x, select1.y, 1, 1, 'select', 1, selectStrokeHue, selectFillHue, selectFillOpacity);
                rect.setAttribute('stroke-dasharray', '5,5');
                SVGRoot.appendChild(rect);
            }
        }
        if (editing === false) {
            drawing = true;
            lastPos = {
                x: cursor.getAttribute('cx') / 1,
                y: cursor.getAttribute('cy') / 1
            };
            toolInit[tool]();
        } else {
            if (dimensioning == true) {
                if (setDimension == false) {
                    lastPos = {
                        x: cursor.getAttribute('cx') / 1,
                        y: cursor.getAttribute('cy') / 1
                    };
                    dimension(e.target, dimMode[dimActive], lastPos);
                } else {
                    console.log("im supposed to be here");
                    dimEnd();
                    setDimension = false;
                    dimensioning = false;
                    editing = false;
                }
            } else if (hatchOn == true) {
                var hatchPos = {
                    x: Math.round(cursor.getAttribute('cx')),
                    y: Math.round(cursor.getAttribute('cy'))
                };
                $('#svgMain').css('cursor', 'wait');
                setTimeout(function() { hatchArbitrary(hatchPos, p1) }, 0);
            } else if (selectOn == true && e.shiftKey == false) {
                select1.x = cursor.getAttribute('cx') / 1;
                select1.y = cursor.getAttribute('cy') / 1;
                var rect = createRect(select1.x, select1.y, 1, 1, 'select', 1, selectStrokeHue, selectFillHue, selectFillOpacity);
                rect.setAttribute('stroke-dasharray', '5,5');
                SVGRoot.appendChild(rect);
                selecting = true;
            } else if (selectOn == true && e.shiftKey == true) {
                moveObj = pickObj(e);
                if (moveObj != '') {
                    moving = true;
                    $('#svgMain').css('cursor', 'move');
                }
            }
        }
    }
}, false);
document.body.addEventListener("keyup", function(e) {
    if (selectOn == true && selected.length > 0 && e.which == 46) {
        removeObjs();
        return;
    }
    if (e.which == 187 && e.shiftKey) {
        if (scalingFactor < 1)
            scale(scalingFactor + 0.1);
        else
            scale(scalingFactor + 0.5);
        return;
    }
    if (e.which == 189 && e.shiftKey) {
        if (scalingFactor > 1) {
            scale(scalingFactor - 0.5);
        }
        if (scalingFactor > 0.2)
            scale(scalingFactor - 0.1);
        return;
    }
    if (drawing == true) {
        if (e.keyCode === 13 && e.shiftKey) {
            ongoing = 0;
            toolPersist = 0;
            toolEnd[tool]();
            endTool();
            $('#temp').remove();
            $('#temp2').remove();
            return;
        }
    }
    if (e.keyCode === 13 && e.shiftKey) {
        endTool();
        return;
    }
    if ((e.which === 26 || e.which === 90) && e.ctrlKey) {
        console.log("undoing");
        var temp = actions.arr[currAction];
        if (temp) {
            undo(temp);
            currAction -= 1;
            return;
        }
    } else if ((e.which === 25 || e.which === 89) && e.ctrlKey) {
        var temp = actions.arr[currAction + 1];
        if (temp) {
            redo(temp);
            currAction += 1;
            return;
        }
    }
    if (e.keyCode == 27 && zooming == true) {
        zooming = false;
        $('#svgMain').css('cursor', 'default');
        $('.cursor').show();
    }
    return;
}, false);
SVGRoot.addEventListener("mouseup", function(e) {
    if (chamfer) {
        return;
    }
    if (zooming) {
        if (zoomMode == 'select') {
            select2.x = cursor.getAttribute('cx') / 1;
            select2.y = cursor.getAttribute('cy') / 1;
            scaleSelect(select1, select2);
            $('#select').remove();
        }
    }
    if (editing == false) {
        if (toolPersist == 0) {
            if (drawing == true) {
                drawing = false;
                toolEnd[tool]();
            };
        }
    } else {
        if (selectOn == true && e.shiftKey == true && moving == true) {
            $('#svgMain').css('cursor', 'default');
            moving = false;
            moveObj = '';
        }
        if (selectOn == true && e.shiftKey == false) {
            unselectObjs();
            select2.x = cursor.getAttribute('cx') / 1;
            select2.y = cursor.getAttribute('cy') / 1;
            selected = selectObjs();
            $('#select').remove();
        }
    }
    // if(register){
    //     registerCoords(activeRegister,getMousePos(canvas, e));
    // }
    // ctx2.clearRect(0, 0, canvas.width, canvas.height);
}, false);
SVGRoot.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(SVGRoot, e);
    if (autoSnapActive == true && autoSnapOn == true) {
        // if (osnapOn == true && osnapUsage == true) {
        //     pos = svgSnapPos(mousePos.x, mousePos.y, osnapMode);
        //     cursor.setAttribute('cx', pos.x);
        //     cursor.setAttribute('cy', pos.y);
        //     $('#coord-input').show();
        //     $('#coordX').html((cursor.x*0.03937/currRes).toFixed(leastCount));
        //     $('#coordY').html((cursor.y*0.03937/currRes).toFixed(leastCount));
        //     $('#coord-input').css({
        //         top: e.clientY - 5 - 20,
        //         left: e.clientX + 5
        //     });
        // } else {
        pos = showSnapPos(mousePos.x, mousePos.y);
        cursor.setAttribute('cx', pos.x);
        cursor.setAttribute('cy', pos.y);
        $('#coord-input').show();
        $('#coordX').html((cursor.x * 25.4 / currRes).toFixed(leastCount));
        $('#coordY').html((cursor.y * 25.4 / currRes).toFixed(leastCount));
        $('#coord-input').css({
            top: e.clientY - 5 - 20,
            left: e.clientX + 5
        });

        //}
    } else {
        cursor.setAttribute('cx', mousePos.x);
        cursor.setAttribute('cy', mousePos.y);
        $('#coord-input').show();
        $('#coordX').html((cursor.x * 25.4 / currRes).toFixed(leastCount));
        $('#coordY').html((cursor.y * 25.4 / currRes).toFixed(leastCount));
        $('#coord-input').css({
            top: e.clientY - 5 - 20,
            left: e.clientX + 5
        });
    }
    if (zooming && zoomMode == 'select') {
        delX = cursor.x - select1.x;
        if (delX > 0) {
            $('#select').attr('x', select1.x);
            $('#select').attr('width', cursor.x - select1.x);
        } else {
            $('#select').attr('x', cursor.x);
            $('#select').attr('width', -cursor.x + select1.x);
        }
        dely = cursor.y - select1.y;
        if (dely > 0) {
            $('#select').attr('y', select1.y);
            $('#select').attr('height', cursor.y - select1.y);
        } else {
            $('#select').attr('y', cursor.y);
            $('#select').attr('height', -cursor.y + select1.y);
        }
        return;
    }
    if (drawing === true) {
        toolActive[tool]();
    }
    if (editing) {
        if (dimensioning == true && setDimension == true) {
            dimMove[dimId]();
            return;
        } else if (selectOn == true && selecting == true && e.shiftKey == false) {
            delX = cursor.x - select1.x;
            if (delX > 0) {
                $('#select').attr('x', select1.x);
                $('#select').attr('width', cursor.x - select1.x);
            } else {
                $('#select').attr('x', cursor.x);
                $('#select').attr('width', -cursor.x + select1.x);
            }
            dely = cursor.y - select1.y;
            if (dely > 0) {
                $('#select').attr('y', select1.y);
                $('#select').attr('height', cursor.y - select1.y);
            } else {
                $('#select').attr('y', cursor.y);
                $('#select').attr('height', -cursor.y + select1.y);
            }
            return;
        } else if (selectOn == true && e.shiftKey == true && moving == true) {
            moveObjPos(e);
        } else {
            return;
            //editActive[tool]();
        }
    }
}, false);
// registerCoords = function(register, position){
//     register.push(position.x,position.y);
// }
// Get the position of the mouse relative to the canvas
getMousePos = function(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: ((mouseEvent.clientX - rect.left) / scalingFactor).toFixed(leastCount) / 1,
        y: ((mouseEvent.clientY - rect.top) / scalingFactor).toFixed(leastCount) / 1
    };
}

// Get a regular interval for drawing to the screen
// window.requestAnimFrame = (function(callback) {
//     return window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimaitonFrame ||
//         function(callback) {
//             window.setTimeout(callback, 1000 / 60);
//         };
// })();

showSnapPos = function(x, y) {
    //x,y are current mouse coords
    a = $('#' + activeOSNAPObj).prop('tagName');
    if (tool == 2) {
        //line snaps
        if (drawing == false) {
            if (a == 'line') {
                return lineLineInitSnap(activeOSNAPObj, x, y);
            } else if (a == 'circle') {
                return lineCircleInitSnap(activeOSNAPObj, x, y);
            } else {
                return { x: x, y: y };
            }
        } else {
            xe = cursor.getAttribute('cx');
            ye = cursor.getAttribute('cy');
            if (a == 'line') {
                return lineLineEndSnap(activeOSNAPObj, x, y, xe, ye);
            } else if (a == 'circle') {
                return lineCircleEndSnap(activeOSNAPObj, x, y);
            } else {
                return { x: x, y: y };
            }
        }
    } else if (tool == 1) {
        //circle snaps
        if (drawing == false) {
            if (a == 'line') {
                return circleLineInitSnap(activeOSNAPObj, x, y);
            } else if (a == 'circle') {
                return circleCircleInitSnap(activeOSNAPObj, x, y);
            } else {
                return { x: x, y: y };
            }
        } else {
            return { x: x, y: y };
        }
    } else {
        return {
            x: x,
            y: y
        };
    }
};
