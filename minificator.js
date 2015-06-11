var domain = require("domain").createDomain();
domain.on('error', function(err){
    console.log('Error has occured with some files: ' + err.name + ' ' + err.message)
})

module.exports = function(srcFld, destFld){
    domain.run(function(){
        var fs = require('fs');
        var filendir = require('filendir');
        var path = require('path');
        var minify = require('minify');
        var glob = require("glob");

        console.log('.......................');
        console.log('Running JS compilation:');
        console.log('Sources: ' + srcFld);
        console.log('Destination:' + destFld);
        console.log('.......................');
        console.log('Files were processed:');


        function minificator(fileName){
            minify(fileName, function(err, fileContent){
                if(err) return console.log(err);

                var newFilePath = path.join(destFld, path.relative(srcFld, fileName))

                filendir.writeFileAsync(newFilePath, fileContent, function(err){
                    if(err) return console.log(err);

                    console.log(newFilePath)
                })
            })
        }

        glob(srcFld + "**/*.js", function (er, files) {
            for(var i in files){
                minificator(files[i]);
            }
        });
    })
}
