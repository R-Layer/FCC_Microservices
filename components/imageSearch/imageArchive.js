module.exports = (req, res) => {
        res.locals.images = 
        req.session.imageArchive ? 
        req.session.imageArchive.slice(-5).reverse() :
        [];
        res.render('main');
};