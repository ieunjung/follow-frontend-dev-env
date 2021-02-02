// IIFE방식
/*
var math = math || {};

(function() {
    function sum(a, b) {
        return a + b;
    }
    
    math.sum = sum;
})();
*/

// ES 2015 방식
export function sum(a, b) {
    return a + b;
}


