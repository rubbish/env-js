$debug("Defining HTMLBaseElement");
/* 
* HTMLBaseElement - DOM Level 2
*/
$w.__defineGetter__("HTMLBaseElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLBaseElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLBaseElement.prototype = new HTMLElement;
__extend__(HTMLBaseElement.prototype, {
    get href(){
        return this.getAttribute('href');
    },
    set href(value){
        this.setAttribute('href',value);
    },
    get target(){
        return this.getAttribute('target');
    },
    set target(value){
        this.setAttribute('target',value);
    }
});

			