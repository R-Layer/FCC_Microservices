const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname + "../../../tmp");
        let formValues;
        try {
            formValues = await parseForm(req, form);
        } catch(error) {
            next(error);
        }

        if(formValues.files.upload.name) {
            const {name, size, type, path} = formValues.files.upload;
            req.session.metadata = {name, type, size: `${(parseInt(size)/1000).toFixed(2)} kB`};
            return fs.unlink(path, 
                () => res.redirect('/metadata'));
        } else {
            req.session.metadata = {error: "Please select a file"};
            res.redirect('/metadata');
        };
    };

const parseForm = (req, form)  => {
    return new Promise( (resolve, reject) => {
        const parsedForm = new formidable.IncomingForm(form);
        parsedForm.parse(req, (err, fields, files) => {
            if(err) return reject(err);
            resolve({fields, files});
        });
    });
};