$debug("Defining Attr");
/*
* Attr - DOM Level 2
*/
$w.__defineGetter__("Attr", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});


/**
 * @class  DOMAttr - The Attr interface represents an attribute in an Element object
 * @extends DOMNode
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  ownerDocument : DOMDocument - The Document object associated with this node.
 */
var DOMAttr = function(ownerDocument) {
    this.DOMNode = DOMNode;
    this.DOMNode(ownerDocument);
                   
    this.ownerElement = null;               // set when Attr is added to NamedNodeMap
};
DOMAttr.prototype = new DOMNode; 
__extend__(DOMAttr.prototype, {
    // the name of this attribute
    get name(){
        return this.nodeName;
    },
    set name(name){
        this.nodeName = name;
    },
    // the value of the attribute is returned as a string
    get value(){
        return this.nodeValue;
    },
    set value(value){
        // throw Exception if Attribute is readonly
        if (__ownerDocument__(this).implementation.errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        // delegate to node
        this.nodeValue = value;
    },
    get specified(){
        return (this.value.length > 0);
    },
    get nodeType(){
        return DOMNode.ATTRIBUTE_NODE;
    },
    get xml(){
        return this.nodeName + '="' + __escapeXML__(this.nodeValue) + '" ';
    },
    toString : function(){
        return "Attr #" + this._id + " " + this.name;
    }
});    

