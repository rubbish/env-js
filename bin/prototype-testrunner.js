load("build/env.js");

var runTest = function($env) {
    var PROTOTYPE_TEST_LOCATION = "test/unit/tmp/";
    var testInProgress = false;

      //let it load the script from the html
    $env.scriptTypes = {
        "text/javascript": true
    };
    
    var printResults = function() {
        if (testInProgress) {
            setTimeout(printResults, 100);
        } else {
            for(var i=0; i < Test.Unit.runners.length; i++) {
                var runner = Test.Unit.runners[i];
                print(currentTest + " - " + runner.summary());
                PROTOTYPE_TEST_LOCATION = "";
            }
        }
    };

    return function(test) {
        if (testInProgress) {
            setTimeout(function() {
                runTest(test);
            }, 300);
            return;
        }
        currentTest = test;
        testInProgress = true;
        window.onload = function() {

            $env.warn('Defining Test.Unit.Runner.finish');
            Test.Unit.Runner.addMethods({
              finish: function() {
                    this.postResults();
                    this.logger.summary(this.summary());
                    printResults();
                    testInProgress = false;
              }
            });
        };
        var testLocation = PROTOTYPE_TEST_LOCATION + test + ".html";
        window.location = testLocation;
    };
}(__env__);

// runTest("ajax_test");
// runTest("array_test");
runTest("base_test");
runTest("base_test");
// runTest("class_test");
// runTest("date_test");
// runTest("dom_test");
// runTest("element_mixins_test");
// runTest("enumerable_test");
// runTest("event_test");
// runTest("form_test");
// runTest("function_test");
// runTest("hash_test");
// runTest("number_test");
// runTest("object_test");
// runTest("periodical_executer_test");
// runTest("position_test");
// runTest("prototype_test");
// runTest("range_test");
// runTest("regexp_test");
// runTest("selector_test");
// runTest("string_test");
// runTest("unittest_test");
