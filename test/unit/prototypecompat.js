//FYI: shipped with Rails 2.2.2
load("test/vendor/prototype-1.6.0.3.js")

module("prototypecompat")

test("$ method", function(){
  expect(1);
  equals($("header"), document.getElementById("header"));
});

test("Element.hide method", function() {
  document.getElementById("header").style.display = "block";
  expect(1);
  try {Element.hide("header")}catch(e) {print(e);}
  ok(document.getElementById("header").style.display == "none", "expected Element.hide('header') to hide the element");
});

test("Element.methods extension", function() {
  document.getElementById("header").style.display = "block";
  expect(1);
  try {$("header").hide()}catch(e) {print(e);}
  ok(document.getElementById("header").style.display == "none", "expected $('header').hide() to hide the element");
});

test("$$ method", function(){
  expect(1);
  ok($$(".chain").length == 10, "$$ found correct number of elements")
});
