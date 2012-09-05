/*
   @function em(ems)
   @brief Extract the anchor of <em> tag.
   @param ems em tag array.
   @return Text array.
 */
function em(ems) {
    var as = new Array(0);
    for (var key in ems) {
	as.push(ems[key].getElement("a"));
    }
    return a(as);
}


/*
   @functin a(as)
   @brief Extract the text of anchor
   @param as Anchor array.
   @return Text Array.
 */
function a(as) {
    var result = new Array(0);
    _.each(as, function(a) {
	    result.push(a.getText());
	    });
    return result;
}
