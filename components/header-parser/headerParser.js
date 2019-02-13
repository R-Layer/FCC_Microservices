const uA = require('useragent');

module.exports = (req, res, next) => {
    if(!req.session.headerParser) {
        const userAgentSpecs = uA.parse(req.headers['user-agent']);
        const mainLanguage = req.headers['accept-language'].split(';');
        let agent = userAgentSpecs.toAgent().replace('0.0.0', '');
        let system = userAgentSpecs.os.toString().replace('0.0.0', '');
        let device = userAgentSpecs.device.toString().replace('0.0.0', '');
        req.session.headerParser = {
            ipaddress: req.headers['x-forwarded-for'] || (req.connection && req.connection.remoteAddress) || '', 
            agent, system, device,
            language: mainLanguage[0]
        }
    }
    next();
};