load("build/env.js");

var runTest = function() {
    var PROTOTYPE_JS = "dist/prototype.js";
    var PROTOTYPE_TEST_LOCATION = "test/unit/tmp/"

    var testInProgress = false;
    var currentTest;

    var printResults = function() {
        if (testInProgress) {
            setTimeout(printResults, 100);
        } else {
            for(var i=0; i < Test.Unit.runners.length; i++) {
                var runner = Test.Unit.runners[i];
                print(currentTest + " - " + runner.summary());
            }
        }
    }

    return function(test) {
        currentTest = test;
        window.onload = function() {
            load(PROTOTYPE_TEST_LOCATION + "assets/prototype.js");
            load(PROTOTYPE_TEST_LOCATION + "assets/unittest.js");
            load(PROTOTYPE_TEST_LOCATION + "tests/" + test + ".js");

            Test.Unit.Runner.addMethods({
                run: function() {
                    this.logger = new Test.Unit.Logger(this.options.testLog);
                    this.runTests.bind(this).delay(0.1);
                    testInProgress = true;
                },

                finish: function() {
                    this.postResults();
                    this.logger.summary(this.summary());
                    testInProgress = false;
                }
            });
            
            Test.Unit.AutoRunner.run();
            setTimeout(printResults, 100);
        }
        var testLocation = PROTOTYPE_TEST_LOCATION + test + ".html";
        window.location = testLocation;
    }
}();

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
