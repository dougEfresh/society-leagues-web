var moment = require('moment');

/**
 * Figure out the next challenge day (which is Sunday)
 */
function getNextChallengeDay() {
    for (var i = 0; i < 8 ; i++ ) {
        var day = moment().add(i,'days');
        if (day.weekday() == 0) {
            return day.format('YYYY-MM-DD')
        }
    }
    console.error('Could not find next challenge date');
}

function getData(url, callback) {
        console.log("Getting data from " +window.location.pathname  + '/' + url);
        $.ajax({
            url: window.location.pathname + url,
            dataType: 'json',
            statusCode: {
                401: function () {
                    console.log('I Need to Authenticate');
                    if (this.context.router.getCurrentPathname().indexOf('login') == -1) {
                        //this.redirect('login');
                    }
                }.bind(this)
            },
            success: function (d) {
                callback(d);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                console.log('Redirecting to error');
                //this.redirect('error');
            }.bind(this)
        });
    }

function sendData(data, url, callback) {
        console.log("Sending data: " + JSON.stringify(data));
        $.ajax({
            async: true,
            processData: false,
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            method: 'post',
            statusCode: {
                401: function () {
                    console.log('I Need to Authenticate');
                    //this.redirect('login');
                }
            },
            success: function (d) {
                console.log("Got " + JSON.stringify(d) + " back from server");
                callback(d);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                //this.redirect('error');
            }.bind(this)
        })
    }



module.exports = {nextChallengeDate: getNextChallengeDay, getData: getData, sendData: sendData};
