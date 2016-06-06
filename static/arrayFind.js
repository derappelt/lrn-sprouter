if(!Array.prototype.find){
  console.log('Array Find Fix');
  Array.prototype.find = function (predicate, thisValue) {
    var arr = Object(this);
    if (typeof predicate !== 'function') {
      throw new TypeError();
    }
    for (var i = 0; i < arr.length; i++) {
      if (i in arr) {  // skip holes
        var elem = arr[i];
        if (predicate.call(thisValue, elem, i, arr)) {
          return elem;  // (1)
        }
      }
    }
    return undefined;  // (2)
  }
} else {
  console.log('No Fix Required');
}
