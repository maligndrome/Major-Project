addHatchPattern = function(pattern, patternId) {
    $('#svgMain').find('defs').eq(0).append('<pattern id=' + patternId + ' patternUnits="userSpaceOnUse width="' + w + '" height="' + h + '" > <path d="' + pattern + '" style="stroke:' + stroke + '; stroke-width:' + strokeWidth + '" /></pattern>');
    return;
};

createLineHatch = function(id, t, d, w, c) {
    //t=angle
    //d=tuning
    //w=width
    //c=color
    $('#svgMain').find('defs').eq(0).append('<pattern id="' + id + '" patternUnits="userSpaceOnUse" width="' + d + '" height="' + d + '"><path d="M0,' + d + ' l' + (1.4142 * d * Math.cos(t)) + ',' + (-1.4142 * d * Math.sin(t)) + '" style="stroke:' + c + '; stroke-width:' + w + '" /></pattern>');
    return;
};

fillHatch = function(id, hatchId) {
    if (id.indexOf('aura') > -1) { id = id.split('ra')[1] }
    $('#' + id).attr('fill', 'url(#' + hatchId + ')');
    $('#' + id).attr('fill-opacity', "1");
    editing = false;
    hatchOn = false;
    return;
}

hatchArbitrary = function(pos, pattern) {
	
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
    $('body').append('<canvas id="canvas"></canvas><canvas id="canvas2"></canvas>');
    var canvas = document.getElementById('canvas');
    var canvas2 = document.getElementById("canvas2");
    canvas.width = SVGRoot.width.baseVal.value;
    canvas.height = SVGRoot.height.baseVal.value;
    canvas2.width = SVGRoot.width.baseVal.value;
    canvas2.height = SVGRoot.height.baseVal.value;
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas2.getContext("2d");
    ctx2.fillStyle = ctx2.createPattern(pattern, 'repeat');
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    var retimgd=ctx2.getImageData(0, 0, canvas2.width, canvas2.height).data;
    drawInlineSVG(document.getElementById('clone'), ctx, function() {
        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var imgd2 =ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
        // var p = imgd.data;
        imgd2.data = FindBlobs(imgd, pos,imgd2);
        ctx2.putImageData(imgd2, 0, 0);
        $('#clone').remove();
        importCanvas(canvas2, document.getElementById('svgMain'));
        $('#canvas').remove();$('#canvas2').remove();
        $('#svgMain').css('cursor', 'default');
        //((row * (imageData.width * 4)) + (col * 4)) + 2
    });
}

function importCanvas(sourceCanvas, targetSVG) {
    // get base64 encoded png data url from Canvas
    var x=trimCanvas(sourceCanvas);
    sourceCanvas=x[0];
    var img_dataurl = sourceCanvas.toDataURL("image/png");

    var svg_img = document.createElementNS(
        "http://www.w3.org/2000/svg", "image");

    svg_img.setAttributeNS(
        "http://www.w3.org/1999/xlink", "xlink:href", img_dataurl);
    svg_img.setAttribute('width',sourceCanvas.width);
    svg_img.setAttribute('height',sourceCanvas.height);
    svg_img.setAttribute('x',x[1]);
    svg_img.setAttribute('y',x[2]);
    targetSVG.appendChild(svg_img);
}


function FindBlobs(src, location, retimgd) {
    var xSize = src.width,
        ySize = src.height,
        srcPixels = src.data,
        x, y, pos;
    location.x/=1;
    location.y/=1;
    console.log(location);
    // This will hold the indecies of the regions we find
    var blobMap = [];
    var label = 1;

    // The labelTable remembers when blobs of different labels merge
    // so labelTabel[1] = 2; means that label 1 and 2 are the same blob
    var labelTable = [0];

    // Start by labeling every pixel as blob 0
    for (y = 0; y < ySize; y++) {
        blobMap.push([]);
        for (x = 0; x < xSize; x++) {
            blobMap[y].push(0);
        }
    }

    // Temporary variables for neighboring pixels and other stuff
    var nn, nw, ne, ww, ee, sw, ss, se, minIndex;
    var luma = 0;
    var isVisible = 0;

    // We're going to run this algorithm twice
    // The first time identifies all of the blobs candidates the second pass
    // merges any blobs that the first pass failed to merge
    var nIter = 2;
    while (nIter--) {

        // We leave a 1 pixel border which is ignored so we do not get array
        // out of bounds errors
        for (y = 1; y < ySize - 1; y++) {
            for (x = 1; x < xSize - 1; x++) {

                pos = (y * xSize + x) * 4;

                // We're only looking at the alpha channel in this case but you can
                // use more complicated heuristics
                isVisible = (srcPixels[pos] == 255 && srcPixels[pos + 1] == 255 && srcPixels[pos + 2] == 255);

                if (isVisible) {

                    // Find the lowest blob index nearest this pixel
                    nw = blobMap[y - 1][x - 1] || 0;
                    nn = blobMap[y - 1][x - 0] || 0;
                    ne = blobMap[y - 1][x + 1] || 0;
                    ww = blobMap[y - 0][x - 1] || 0;
                    ee = blobMap[y - 0][x + 1] || 0;
                    sw = blobMap[y + 1][x - 1] || 0;
                    ss = blobMap[y + 1][x - 0] || 0;
                    se = blobMap[y + 1][x + 1] || 0;
                    minIndex = ww;
                    if (0 < ww && ww < minIndex) { minIndex = ww; }
                    if (0 < ee && ee < minIndex) { minIndex = ee; }
                    if (0 < nn && nn < minIndex) { minIndex = nn; }
                    if (0 < ne && ne < minIndex) { minIndex = ne; }
                    if (0 < nw && nw < minIndex) { minIndex = nw; }
                    if (0 < ss && ss < minIndex) { minIndex = ss; }
                    if (0 < se && se < minIndex) { minIndex = se; }
                    if (0 < sw && sw < minIndex) { minIndex = sw; }

                    // This point starts a new blob -- increase the label count and
                    // and an entry for it in the label table
                    if (minIndex === 0) {
                        blobMap[y][x] = label;
                        labelTable.push(label);
                        label += 1;

                        // This point is part of an old blob -- update the labels of the
                        // neighboring pixels in the label table so that we know a merge
                        // should occur and mark this pixel with the label.
                    } else {
                        if (minIndex < labelTable[nw]) { labelTable[nw] = minIndex; }
                        if (minIndex < labelTable[nn]) { labelTable[nn] = minIndex; }
                        if (minIndex < labelTable[ne]) { labelTable[ne] = minIndex; }
                        if (minIndex < labelTable[ww]) { labelTable[ww] = minIndex; }
                        if (minIndex < labelTable[ee]) { labelTable[ee] = minIndex; }
                        if (minIndex < labelTable[sw]) { labelTable[sw] = minIndex; }
                        if (minIndex < labelTable[ss]) { labelTable[ss] = minIndex; }
                        if (minIndex < labelTable[se]) { labelTable[se] = minIndex; }

                        blobMap[y][x] = minIndex;
                    }

                    // This pixel isn't visible so we won't mark it as special
                } else {
                    blobMap[y][x] = 0;
                }

            }
        }

        // Compress the table of labels so that every location refers to only 1
        // matching location
        var i = labelTable.length;
        while (i--) {
            label = labelTable[i];
            while (label !== labelTable[label]) {
                label = labelTable[label];
            }
            labelTable[i] = label;
        }

        // Merge the blobs with multiple labels
        for (y = 0; y < ySize; y++) {
            for (x = 0; x < xSize; x++) {
                label = blobMap[y][x];
                if (label === 0) {
                    continue;
                }
                while (label !== labelTable[label]) {
                    label = labelTable[label];
                }
                blobMap[y][x] = label;
            }
        }
    }

    var locLable = blobMap[location.y][location.x];
    var locationPixel = (location.y * xSize + location.x) * 4;
    for (y = 0; y < ySize; y++) {
        for (x = 0; x < xSize; x++) {
            pos = (y * xSize + x) * 4;
            if (blobMap[y][x] != locLable) {
                retimgd.data[pos + 3] = 0;
            }
        }
    }

    // Return the blob data:
    return retimgd.data;

};

function trimCanvas(c) {
  	var ctx = c.getContext('2d'),
    copy = document.createElement('canvas').getContext('2d'),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null
    },
    x, y;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i+3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~((i / 4) / c.width);
  
      if (bound.top === null) {
        bound.top = y;
      }
      
      if (bound.left === null) {
        bound.left = x; 
      } else if (x < bound.left) {
        bound.left = x;
      }
      
      if (bound.right === null) {
        bound.right = x; 
      } else if (bound.right < x) {
        bound.right = x;
      }
      
      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }
    
  var trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
  
  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);
  
  // open new window with trimmed image:
  return [copy.canvas,bound.left,bound.top];
}