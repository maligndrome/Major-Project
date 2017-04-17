showAdvSnapPos = function(x, y) {
    for (var key in poI) {
        if (poI.hasOwnProperty(key)) {
            for (var i = 0; i < poI[key].length; i++) {
                if (dist2(x, y, poI[key][i].x, poI[key][i].y) < 900) {
                    $('#poI').remove();
                    poIcreated = false;

                    highlightpoI(poI[key][i], true);
                    return { x: poI[key][i].x, y: poI[key][i].y };
                }
            }
        }
    }
    var nearbypoIs = [];
    var nearbypoIDs = [];
    for (var key in poI) {
        if (poI.hasOwnProperty(key)) {
            for (var i = 0; i < poI[key].length; i++) {
                if (Math.abs(x - poI[key][i].x) < 30) {
                    nearbypoIs.push({ p: poI[key][i], x: true });
                    nearbypoIDs.push(dist2(x, y, poI[key][i].x, poI[key][i].y));
                }
                if (Math.abs(y - poI[key][i].y) < 30) {
                    nearbypoIs.push({ p: poI[key][i], x: false });
                    nearbypoIDs.push(dist2(x, y, poI[key][i].x, poI[key][i].y));

                }
            }
        }
    }
    if (nearbypoIDs.length > 0) {
        large = 0;
        for (var i = 1; i < nearbypoIDs.length; i++) {
            if (nearbypoIDs[i] > nearbypoIDs[large])
                large = i;
        }
        if (nearbypoIs[large].x) {
            $('#poI2').remove();
            poI2created = false;
            highlightpoI(nearbypoIs[large].p, false, true);
            return { x: nearbypoIs[large].p.x, y: y };
        } else {
            $('#poI2').remove();
            poI2created = false;
            highlightpoI(nearbypoIs[large].p, false, false);
            return { x: x, y: nearbypoIs[large].p.y };
        }
    }
    dehighlightpoI();
    return { x: x, y: y };
};
dehighlightpoI = function() {
    $('#poI').remove();
    $('#poI2').remove();
    poIcreated = false;
    poI2created = false;
    return;
}
highlightpoI = function(pos, full, x) {
    if (!full) {
        if (poIcreated == false) {
            var poI = createLine(0, 0, 1, 1, 'poI', strokeWidth, '#00ff00');
            poI.setAttribute('stroke-dasharray', '30');
            SVGRoot.appendChild(poI);
            poIcreated = true;
        }
        if (x) {
            $('#poI').attr('x1', pos.x).attr('x2', pos.x).attr('y1', 0).attr('y2', currHeight);
        } else {
            $('#poI').attr('y1', pos.y).attr('y2', pos.y).attr('x1', 0).attr('x2', currWidth);
        }
        return;
    } else {
        if (poI2created == false) {
            var poI = createRect(pos.x - 15, pos.y - 15, 30, 30, 'poI2', strokeWidth, '#00ff00');
            SVGRoot.appendChild(poI);
            poI2created = true;
            return;
        }
    }
}
