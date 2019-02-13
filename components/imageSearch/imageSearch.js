const qwant = require('qwant-api');

module.exports = (req, res) => {
    const queryTerm = req.params.name;
    const offset = req.query.offset;

    qwant.search("images", {
        query: queryTerm,
        count: "5",
        offset: offset,
        language: "english"
    }, function(err, data) {
        if(err) return console.log(err);
        let imageData = data.data.result.items.reduce((imgData, image ) =>  
        [...imgData, {
            name: image.title,
            page_url: image.url,
            image_url: image.media,
            alt: image.desc
        }],
        []);
        const toArchive = {
            name: queryTerm,
            when: new Date().toUTCString()
        }
        req.session.imageArchive ?
            req.session.imageArchive.push(toArchive) :
            req.session.imageArchive = [toArchive];
        req.session.images = imageData;
        res.locals.images = imageData;
        res.render('main');
    });
};