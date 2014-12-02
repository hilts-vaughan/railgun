app.filter('scoreFilter', function() {
    return function(input) {

        var sign = ''
        if (input > 0) {
            sign = '+';
        }

        return sign + input;

    };
});


app.filter("toArray", function(){
    return function(obj) {
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
        });
        return result;
    };
});
