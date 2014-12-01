app.filter('scoreFilter', function() {
    return function(input) {

        var sign = ''
        if (input > 0) {
            sign = '+';
        }

        return sign + input;

    };
});
