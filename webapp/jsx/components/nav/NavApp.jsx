var React = require('react/addons');
var Router = require('react-router')
    ,RouteHandler = Router.RouteHandler;

var SocietyNav = require('./SocietyNav.jsx');
var UserStore = require('../../stores/UserStore.jsx');
var DataFactory = require('../../UserContextMixin.jsx');
var LeagueNav = require('./LeagueNav.jsx');
var LoginApp = require('../LoginApp.jsx');

var NavApp = React.createClass({
    mixins: [DataFactory],
    render: function() {
        if (this.getUserId() == 0) {
            console.log("LoginApp");
            return (
                <div>
                    <LoginApp />
                </div>
            )
        }

        return (
            <div>
                <LeagueNav />
            </div>
        )
    }
});

module.exports = NavApp;