const moment = require('moment');
const path = require('path');

module.exports = (req, res) => {
    const parsedUrl = req.params.date_string.trim();
    
    let parsedDate = null;
     
    if(parsedUrl) {
        if(moment(parsedUrl, moment.ISO_8601, true).isValid() ) {
            // It is a valid string iso 8601 compliant
            parsedDate = new Date(parsedUrl);
        } else if (parseInt(parsedUrl, 10)) {
            // It is not a string but a valid int ( every int represent a valid ms timespam )
            parsedDate = new Date(parseInt(parsedUrl, 10));
        } else {
            // Invalid date ( not a valid int or a iso-8601 compliant string)
            //Catch-all else added for consistency
            parsedDate = null;
        }
    } else {
    //  If a date is not provided it returns now by default
        parsedDate = new Date();
    };

    const responseDate = parsedDate ? 
        {unix: parsedDate.getTime(), utc: parsedDate.toUTCString()} : 
        {error: "Invalid Date"};

    req.session.timestamp = responseDate;
    res.locals.timestamp = responseDate;
    res.render('main.pug');

};

