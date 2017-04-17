saveAsSVG = function(name) {
    //first, lets clean-up the fucking mess!
    //lets start with a clone, shall we?
    $('#SVGContainer').append($('#svgMain').clone().attr('id', 'clone'));
    $('#clone').hide();
    //now clear the auras first.
    $('#clone .aura').remove();
    //now remove ids of all the elements.
    $('#clone').find('rect, line, polyline, circle, path, ellipse, polygon').removeAttr('id').removeAttr('style');
    //remove the cursor
    $('#clone .cursor').remove();
    $('#clone polyline').removeAttr('first');
    //now do the magic!
    $('#clone').wrap('<div id="cloneToSave"></div>');
    $('#clone').removeAttr('id').removeAttr('style');
    $('body').append('<a id="save"></a>');
    $('#save').attr('href', "data:image/svg+xml;base64,\n" + btoa(unescape(encodeURIComponent($('#cloneToSave').html())))).attr('download', name+'.svg');
    document.getElementById('save').click();
    $('#save').remove();
    $('#cloneToSave').remove();
    return;
};

saveAsPNG = function(name, author, dname, date) {
    $('#SVGContainer').append($('#svgMain').clone().attr('id', 'clone'));
    $('#clone').hide();
    //now clear the auras first.
    $('#clone .aura').remove();
    //now remove ids of all the elements.
    $('#clone').find('rect, line, polyline, circle, path, ellipse, polygon').removeAttr('id').removeAttr('style');
    //remove the cursor
    $('#clone .cursor').remove();
    $('#clone polyline').removeAttr('first');
    //now do the magic!
    $('#clone').removeAttr('style');
    document.getElementById('clone').appendChild(createRect(2500,2000,890,362,'table',strokeWidth));
    document.getElementById('clone').appendChild(createText('Name:'+ dname, 2550,2100, '',50));
    document.getElementById('clone').appendChild(createText('Author:'+ author, 2550,2200, '',50));
    document.getElementById('clone').appendChild(createText('Date:'+ date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear(), 2550,2300, '',50));
    $('body').append('<canvas id="canvas"></canvas>');
    var canvas = document.getElementById('canvas');
    canvas.width=SVGRoot.width.baseVal.value;
    canvas.height=SVGRoot.height.baseVal.value;
    var ctx = canvas.getContext('2d');
    drawInlineSVG(document.getElementById('clone'), ctx, function() {
        $('body').append('<a href="'+canvas.toDataURL("image/png")+'" download="'+name+'.png" id="dload"></a>');
        document.getElementById('dload').click();
        $('#dload').remove();
        $('#canvas').remove();
        $('#clone').remove();
    });
};

saveAsWCF = function() {
	$('#SVGContainer').append($('#svgMain').clone().attr('id', 'clone'));
    $('#clone .cursor').remove();
    $('#clone').wrap('<div id="cloneToSave"></div>');
    $('body').append('<a id="save"></a>');
    $('#save').attr('href', "data:image/svg+xml;base64,\n" + btoa(unescape(encodeURIComponent($('#cloneToSave').html())))).attr('download', name+'.wcf');
    document.getElementById('save').click();
    $('#save').remove();
    $('#cloneToSave').remove();
    return;
};

function drawInlineSVG(svgElement, ctx, callback) {
    var svgURL = new XMLSerializer().serializeToString(svgElement);
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(this, 0, 0);
        callback();
    }
    img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
};

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
    $('#clone').attr('id','svgMain');
    var x=$('#svgMain').html();
    $('#svgMain').html('');
    initiate();
    $('#svgMain').append(x);
    var a=$('#svgMain').find('rect, line, polyline, circle, path, ellipse, polygon');
    for(var i=0;i<a.length;i++){
    	if(a[i].id.indexOf('aura')>-1){
    		aurafy(a[i].id);
    	}
    }
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('SVGContainer');
  element.innerHTML = contents;
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

initiate = function () {
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
        SVGRoot.appendChild(this.midRect);
        SVGRoot.appendChild(this.vHair);
        SVGRoot.appendChild(this.hHair);
        this.setAttribute = function(a, b) {
            if (a == 'cx') {
                this.midRect.setAttribute('x', b - 2.5);
                this.hHair.setAttribute('x1', b - 20);
                this.hHair.setAttribute('x2', b + 20);
                this.vHair.setAttribute('x1', b);
                this.vHair.setAttribute('x2', b);
                this.x = b;
            } else if (a == 'cy') {
                this.midRect.setAttribute('y', b - 2.5);
                this.y = b;
                this.vHair.setAttribute('y1', b - 20);
                this.vHair.setAttribute('y2', b + 20);
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
    console.log('0=rect\n1=circle\n2=line\n3=threePtCircle\n4=diaCircle\n5=polyLine\n6=3ptellipse\n7=fociellipse\n8=polygon ');
    canvas = document.getElementById('svgMain');
    drawing = false;
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
    dimObjShape='';
    dimMode = ['rad', 'dia', 'len', 'ang'];
    dimActive=0;
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
    selectOn = false;
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
    trimming = false;

    function setTool(x) {
        tool = x;
        console.log(x);
        return;
    }
    lastPos = mousePos;
    activeObjEdit = '', activeObjEditId = '';
    SVGRoot.addEventListener("mousedown", function(e) {
        if (e.button == 0) {
            $('#rightClkMenu').hide();
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
                    fillHatch(e.target.id, 'diag2');
                } else if (selectOn == true) {
                    select1.x = cursor.getAttribute('cx') / 1;
                    select1.y = cursor.getAttribute('cy') / 1;
                    var rect = createRect(select1.x, select1.y, 1, 1, 'select', selectStrokeHue, 1, selectFillHue, selectFillOpacity);
                    rect.setAttribute('stroke-dasharray', '5,5');
                    SVGRoot.appendChild(rect);
                    selecting = true;
                };
            }
        }
    }, false);
    document.body.addEventListener("keypress", function(e) {
        if (drawing == true) {
            if (e.keyCode === 13 && e.shiftKey) {
                ongoing = 0;
                toolPersist = 0;
                toolEnd[tool]();
                $('#temp').remove();
                return;
            }
        }
        if (e.which === 26 && e.ctrlKey) {
            var temp = actions.arr[currAction];
            if (temp) {
                undo(temp);
                currAction-=1;
            }
        } else if (e.which === 25 && e.ctrlKey) {
            
            var temp = actions.arr[currAction+1];
            if (temp) {
                redo(temp);
                currAction +=1;
            }
        }
    }, false);
    SVGRoot.addEventListener("mouseup", function(e) {
        if (editing == false) {
            if (toolPersist == 0) {
                if (drawing == true) {
                    drawing = false;
                    toolEnd[tool]();
                };
            }
        } else {
            if (selectOn == true) {
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
        if (autoSnapActive == false || autoSnapOn == false) {
            if (osnapOn == true && osnapUsage == true) {
                pos = svgSnapPos(mousePos.x, mousePos.y, osnapMode);
                cursor.setAttribute('cx', pos.x);
                cursor.setAttribute('cy', pos.y);
                $('#coord-input').show();
                $('#coordX').html(cursor.x);
                $('#coordY').html(cursor.y);
                $('#coord-input').css({
                    top: svg.top + cursor.y - 5 - 20,
                    left: svg.left + cursor.x + 5
                });
            } else {
                cursor.setAttribute('cx', mousePos.x);
                cursor.setAttribute('cy', mousePos.y);
                $('#coord-input').show();
                $('#coordX').html(cursor.x);
                $('#coordY').html(cursor.y);
                $('#coord-input').css({
                    top: svg.top + cursor.y - 5 - 20,
                    left: svg.left + cursor.x + 5
                });
            }
        } else {
            pos = showSnapPos(mousePos.x, mousePos.y);
            cursor.setAttribute('cx', pos.x);
            cursor.setAttribute('cy', pos.y);
            $('#coord-input').show();
            $('#coordX').html(cursor.x);
            $('#coordY').html(cursor.y);
            $('#coord-input').css({
                top: svg.top + cursor.y - 5 - 20,
                left: svg.left + cursor.x + 5
            });
        }
        if (drawing === true) {
            toolActive[tool]();
        }
        if (editing) {
            if (dimensioning == true && setDimension == true) {
                dimMove[dimId]();
            } else if (selectOn == true && selecting == true) {
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
            } else {
                editActive[tool]();
            }
        }
    }, false);
};

aurafy = function (id) {
	document.getElementById(id).addEventListener('mouseover', function(e) {
        autoSnapActive = true;
        activeOSNAPObj = e.srcElement.id;
    });
    document.getElementById(id).addEventListener('mousedown', function(e) {
        if (hatching == true) {
            fillHatch(e.srcElement.id);
            return;
        }
    });
    document.getElementById(id).addEventListener('mouseout', function(e) {
        autoSnapActive = false;
        activeOSNAPObj = e.srcElement.id;
        snapped = false;
    });
}