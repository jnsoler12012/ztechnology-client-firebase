var fs = require('fs-extra');

var source = './dist/index.html';
var dest = './index.html';

fs.copy(source, dest, function (err) {

    if (err) {
        return console.error(err);
    }

    console.log('Copied to ' + dest);

});