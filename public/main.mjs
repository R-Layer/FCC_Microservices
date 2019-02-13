// File metadata microservice
const uploadFile = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fetchOptions = {
        method: 'post',
        body: formData
     };

    try {
        await fetch('/upload', fetchOptions);
        window.location.assign('/metadata');

        // Empty input file
        event.target.upload.value = null;
    } catch(error) {
        console.error(error);
    };
};

const shortenURL = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fetchOptions = {
        method: 'post',
        body: formData
     };
    try {
        event.target["short-val"].value ? 
            await fetch(`/api/shorturl/new/${event.target["short-val"].value}`, fetchOptions) :
            await fetch('/api/shorturl/new/invalidUrl', fetchOptions)
        window.location.assign('/shorten');

        // Empty input file
    } catch(error) {
        console.error(error);
    };
};

const displayName = (event) => {
    const uploadNameDisplay = document.getElementById('upload-name');
   uploadNameDisplay.value = event.target.files[0].name;
};

const upload = document.getElementById('upload');
const uploadForm = document.getElementById('form-upload');
const shortenerForm = document.getElementById('form-shortener');

upload.addEventListener('change', displayName);
uploadForm.addEventListener('submit', uploadFile);
shortenerForm.addEventListener('submit', shortenURL);