Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function toObject(arr) {
    var rv = [];
    for(var i=0;i<arr.length;i++){
        rv.push({"text" : arr[i]});
    }
    return rv;
}

function assign_2d(arr){
    var assign_arr =[[]];
    for(var i=0;i<arr.length;i++){
        for (var j=0;j<arr[0].length;j++){
            assign_arr = arr[i][j];
        }
    }
    return assign_arr;
}
//MDN implemented if browser has not trim function supported
if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}