# Vehicle Serial Number Lookup -POC

Flask is a Python-based micro-framework.  
AngularJS integration with other python-based micro-framework flask

## Installation/Prerequisites
    Install the pre requisites `[Git](http://git-scm.com)`, `[node.js](http://nodejs.org)`, and `[Python 2.7](http://www.python.org/)`.  This applicaction also requires `[MySQL](http://www.mysql.org)`.

    Install the required tools: `grunt`, `bower`

    npm install -g grunt bower
    - Note: If you prefer not to install globally, this step can be ignored

    Install MySQL Database `[MySQL]http://dev.mysql.com/downloads/mysql/`


##  Quickstart
    #Install grunt:

    Clone the repository from `github`, and `cd` into it:

    git clone https://github.com/balajinswamy/angular-flask-mysql-seed.git && cd $_

    Run `npm install` to install required node module dependencies
        - npm install

    Run `bower install` to install the required pacakge dependencies
        - bower install

## Database
    mysql>create database truecar;
    $>mysql -u username -p password truecar < path-to-application/db.sql



## Usage
    ## Use Grunt tasks
    * `grunt server` to launch a browser sync server on your source files. A client-side AngularJS application will now be available at port 9000 [http://localhost:9000](http://localhost:9000).
    * `node_modules/.bin/grunt server `(if grunt is installed globally)` 
    * `grunt karma` to launch your unit tests with Karma
    * `grunt dist` to launch a web server on an optimized application
	
## Creating a Flask service
    To create a new virtual environment run the install.sh script
    ./install.sh
	A virutal environemt in a new 'flask' directory peer to the root should have been created by now 

## Run the flask service:
    flask/bin/python run.py

    service will run at the port no 5000 [http://localhost:5000](http://localhost:5000).

    
A client-side AngularJS application will now be available by running

	grunt server
	
The Grunt server will run at the port 9000 [http://localhost:9000](http://localhost:9000).  It will proxy REST requests to the Flask service running at [http://localhost:5000](http://localhost:5000).

At this point you should be able to navigate to the default home page to look up the details for the given VSN.  


## VIN (vehicle identification number)
    `Note: In this POC project we are not implementing the actual validation of VIN rather a made up term VSN.  However, pretty much most of them are still suitable for VIN, however weights validation will be ingored though it has been implemented.  Also the length of VSN is 10 as opposed 17 of actual VIN no.
    for more information `See [VIN Wikipedia](http://en.wikipedia.org/wiki/Vehicle_identification_number)`
    
    #validator and input directive. 

    For the sake of completeness, the vinValidatorService exports additional
    properties relating to VIN validation.  These are:
    + vsnLength - equal to 12 (Actual VIN Length - equal to 17)
    + checkDigitIndex - equal to 8 (9th position in the VIN)
    + invalidChars - 'OQI' (Ignored currently to handle our test data)
    + regEx - "[A-HJ-NPR-Z0-9]{17}"
    + replaceRegEx - "[^A-HJ-NPR-Z0-9]" (Currently accepting OQI)
    + characterMap - map of alphabet characters to numeric value
    + weights - weights based on index position (Currently commented out)
