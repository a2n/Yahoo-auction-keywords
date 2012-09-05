var ss = SpreadsheetApp.getActiveSheet();

/*
   @function begin()
   @brief The entry point.
 */
function begin() {
    var rowToday = findTodayRow();
    for (var i = 0; i < 10; ++i) {
	saveKeywords(rowToday);
    }
}

/*
   @function today()
   @brief Get the today date object.
   @reurn A date object presents today.
 */
function today() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/*
   @function findTodayRow()
   @brief Find the row prefix is today, if not found then insert a new row with today date.
   @return The row of today.
 */
function findTodayRow() {
    var dates = ss.getRange(2, 1, ss.getLastRow() - 2 + 1).getValues();
    var todayObject = today();
    var todayTime = todayObject.getTime();
    var result = null;

    for (var i = 0; i < dates.length; ++i) {
	if (todayTime == (new Date(dates[i])).getTime()) {
	    result = i + 2;
	    break;
	}
    }

    if (!result) {
	result = ss.getLastRow() + 1;
	ss.getRange(result, 1).setValue(todayObject);
    }

    return result;
}

/*
   @function saveKeywords(row)
   @brief Merge exists keywords with new keywords.
   @param row The row to save keywords.
 */
function saveKeywords(row) {  
    ss.getRange(row, 1).setValue(today());

    var range = ss.getRange(row, 2);
    var oldKWs = range.getValue().split(",");
    var newKWs = grabKeywords();  
    var kws = _.uniq(newKWs.concat(oldKWs)).sort();

    ss.getRange(row, 2).setValue(kws.join(","));
}

/*
   @function grabKeywords()
   @brief Grab the yahoo auction html content then parsing keywords out.
   @return Keywords text array.
 */
function grabKeywords() {
    var URL = "http://tw.bid.yahoo.com/";

    var doc = Xml.parse(UrlFetchApp.fetch(URL).getContentText(), true);  
    var html = doc.html.body.getElement("div").getElement("div").getElement("div").getElements("div")[2].getElement("div").getElements("div")[1].getElement("div").getElement("div").getElement("div");
    var ems = em(html.getElements("em"));
    var as = a(html.getElements("a"));
    return ems.concat(as);
}
