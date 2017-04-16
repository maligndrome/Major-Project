if (document.addEventListener) { // IE >= 9; other browsers
    document.addEventListener('contextmenu', function(e) {
        $('#rightClkMenu').show();
        e.preventDefault();
        populateRightMenu(e);
        
    }, false);
} else { // IE < 9
    document.attachEvent('oncontextmenu', function() {
        alert("You've tried to open context menu");
        window.event.returnValue = false;
    });
}
var populateRightMenu= function(e){
    $('#rightClkMenu').css({ position: 'absolute', top: e.clientY, left: e.clientX});
    var polyLinejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var rectjs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var circlejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var linejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var threePtCirclejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var diaCirclejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var threePtEllipsejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var fociEllipsejs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var polygonjs= [{text:'End',action:'endPolyline'},{text:'Undo',action:'undoPolyline'}];
    var toolJs = [rectjs, circlejs, linejs, threePtCirclejs, diaCirclejs, polyLinejs, threePtEllipsejs, fociEllipsejs, polygonjs];
    var rightMenu='';
    if(drawing==true){
        rightMenu=constructRMHTML(toolJs[tool]);
    }
    document.getElementById('mainRightMenu').innerHTML=rightMenu;
    return;
};

var constructRMHTML = function(array){
    htmlstring='';
    for(var i=0;i<array.length;i++){
        if(array[i].subMenu==undefined){
            htmlstring+='<li><a class="rightMenuLink" data-action="'+array[i].action+'"><span class="icon mif-cogs"></span>'+array[i].text+'</a></li>';
        }
        else {
            htmlstring+=constructRMHTML(array[i].subMenu);
        }
    }
    return htmlstring;
};