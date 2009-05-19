load("build/env.js");

var totalResults = {
    tests: 0,
    assertions: 0,
    failures: 0,
    errors: 0
};

var testInProgress = false;

var runTest = function($env) {
    var PROTOTYPE_TEST_LOCATION = "test/unit/tmp/";
    var currentTest;

      //let it load the script from the html
    $env.scriptTypes = {
        "text/javascript": true
    };

    var addResults = function(results) {
        totalResults.tests += results.tests;
        totalResults.assertions += results.assertions;
        totalResults.failures += results.failures;
        totalResults.errors += results.errors;
    };

    var printResults = function() {
        if (testInProgress) {
            setTimeout(printResults, 100);
        } else {
            for(var i=0; i < Test.Unit.runners.length; i++) {
                var runner = Test.Unit.runners[i];
                print(currentTest + " - " + runner.summary());
                addResults(runner.getResult());
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
        testInProgress = true;
        currentTest = test;

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

    var printTotalResultSummary = function() {
        if (testInProgress) {
            setTimeout(function() {printTotalResultSummary();}, 300);
        } else {
            print("TOTAL");
            print(totalResults.tests + " tests, " +
                  totalResults.assertions + " assertions, " +
                  totalResults.failures + " failures, " +
                  totalResults.errors + " errors");
            var successRate = (totalResults.tests - totalResults.errors - totalResults.failures) / totalResults.tests * 100;
            print("SUCCESS RATE = " + successRate.toFixed(2) + "%");
        }
    };

    printTotalResultSummary();
