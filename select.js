selectObjs = function() {
    //returns objects that partially of entirely lie in the rectangle defined by p1 and p2
    var elems = [];
    var RectA = document.getElementById('select').getBoundingClientRect();
    for (var i = 1; i <= objCount; i++) {
        RectB = document.getElementById(i).getBoundingClientRect();
        if (RectA.left < RectB.right && RectA.right > RectB.left && RectA.top < RectB.bottom && RectA.bottom > RectB.top) {
            elems.push(i);
            $('#' + i).attr('stroke', 'blue');
        }
    }
    return elems;
};

unselectObjs = function() {
    for (var i=0;i<selected.length;i++){
        $('#' + selected[i]).attr('stroke', 'black');
    }
}

removeObjs = function () {
    for (var i=0;i<selected.length;i++){
        $('#' + selected[i]).remove();
        $('#aura' + selected[i]).remove();
    }
}
