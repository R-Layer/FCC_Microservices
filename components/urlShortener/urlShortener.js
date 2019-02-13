dns = require('dns');

const generateRandomNum = () => {
    return Math.floor( (Math.random() * 9000) +1000) ; 
}

module.exports =  (req, res) => {    
        const urlToCheck = req.params.urlToCheck;
        dns.lookup(urlToCheck, (error, address, family) => {
            if(error) {
                req.session.shortener = {error: "Invalid URL"};
                req.session.shortener_addr = res.locals.shortener_addr = '';
            } else {
                res.locals.shortener = req.session.shortener = {
                    original_url: urlToCheck,
                    short_url: generateRandomNum()
                };
                
                req.session.shortener_addr = res.locals.shortener_addr = urlToCheck.match(/^http/)? urlToCheck : "http://" + urlToCheck;
                
            }

            res.json(req.session.shortener);
        });
};