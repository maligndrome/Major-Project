p1 = document.createElement("canvas")
p1.width = 32;
p1.height = 16;
var pctx1 = p1.getContext('2d');
var x0 = 36;
var x1 = -4;
var y0 = -2;
var y1 = 18;
var offset = 32;
pctx1.strokeStyle = "#000000";
pctx1.lineWidth = 2;
pctx1.beginPath();
pctx1.moveTo(x0, y0);
pctx1.lineTo(x1, y1);
pctx1.moveTo(x0 - offset, y0);
pctx1.lineTo(x1 - offset, y1);
pctx1.moveTo(x0 + offset, y0);
pctx1.lineTo(x1 + offset, y1);
pctx1.stroke();