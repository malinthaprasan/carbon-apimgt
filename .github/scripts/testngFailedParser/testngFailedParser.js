var fs = require('fs'),
    xml2js = require('xml2js');
 
var parser = new xml2js.Parser();

console.log("1234")
console.log("::set-output name=failedTests::hello,123")

//fs.readFile('product-apim/modules/integration/tests-integration/tests-backend/target/surefire-reports/testng-failed.xml', function(err, data) {
//    parser.parseString(data, function (err, result) {
//        result.suite.test.forEach((test) => {
//            test.classes[0].class.forEach((cls) => {
//                console.log(cls['$'].name);
//            });
//        });
//    });
//});
