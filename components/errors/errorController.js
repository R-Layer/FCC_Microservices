exports.send404 = (req, res) => {
    console.log('not found', req.url);
    res.status(404).render('404');
};

exports.send500 = (error, req, res, next) => {
    console.error('custom error', error);
    res.status(500).render('error');
};