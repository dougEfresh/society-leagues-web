#!/bin/bash
./node_modules/.bin/browserify --full-paths -t reactify -o webapp/js/bundle.js  webapp/app.jsx 

