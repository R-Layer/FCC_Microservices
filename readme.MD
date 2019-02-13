# FCC MICROSERVICES - 5 IN 1
Clone the project --> rename the `.env.sample` file to `.env` --> run `npm start`

#### Genesis:
This projects derive from a cleanup i made to my account: it package all the 5 microservices of *FCC backend legacy certification* into one single app.

This is possible because the legacy certification does not implement an automated test and this allows to 'loosely interpret' the user stories on what the users receives back from their requests; to be more specific  - *the api returns a JSON* - instruction is not satisfied: the data object (obtained and formatted as the instructions states) instead of being passed back to the client as a JSON object is stored into the session ( and sometimes formatted) to be displayed inside a pug template.

This should not violate the exercise purpose but if anyone disagree can contact me to my profile on FCC forum  (Layer)

#### Packages:
  - Framework and template engine:
    1. "express"
    2. "pug"

  - Packages needed because of the session management:
    1. "dotenv"
    2. "express-session"
    3. "memorystore"
    4. "uuid"

  - Lightweight package to manage file upload: 
    1. "formidable"

  - Package used to validate the ISO 8601 compliant dates:
    1. "moment"

  - Used for the image research:
    1. "qwant-api"
    2. "request"

   - Used to parse useragents:
    1. "useragent"

## USER STORIES

Below are the user stories for each microservice:

### REQUEST HEADER PARSER MICROSERVICE

*User Story*: I can get the IP address, preferred languages (from header Accept-Language)
and system infos (from header User-Agent) for my device. 

### TIMESTAMP MICROSERVICE

*User Story*: The API endpoint is GET [project_url]/api/timestamp/:date_string?

*User Story*: A date string is valid if can be successfully parsed by new Date(date_string).
    Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds.
    In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.
    
*User Story*: If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.

*User Story*: If the date string is valid the api returns a JSON having the structure
    {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}
    
*User Story*: If the date string is invalid the api returns a JSON having the structure
    {"error" : "Invalid Date" }.

### FILE METADATA MICROSERVICE

*User Story*: I can submit a form object that includes a file upload.

*User Story*: The from file input field has the "name" attribute set to "upfile". We rely on this in testing.

*User Story*: When I submit something, I will receive the file name, and size in bytes within the JSON response.

### URL SHORTENER MICROSERVICE:

*User Story*: I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
    Example : {"original_url":"www.google.com","short_url":1}
    
*User Story*: If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
    HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
    
*User Story*: When I visit the shortened URL, it will redirect me to my original link.

### IMAGE SEARCH ABSTRACTION LAYER

*User Story*: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

*User Story*: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

*User Story*: I can get a list of the most recently submitted search strings.
