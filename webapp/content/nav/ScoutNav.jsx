var React = require('react/addons');
var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route
    , NotFoundRoute = Router.NotFoundRoute
    , Link = Router.Link
    , DefaultRoute = Router.DefaultRoute;
var Bootstrap = require('react-bootstrap')
    ,Button = Bootstrap.Button
    ,ButtonGroup = Bootstrap.ButtonGroup
    ,PanelGroup = Bootstrap.PanelGroup
    ,Badge = Bootstrap.Badge
    ,Table = Bootstrap.Table
    ,Nav = Bootstrap.Nav
    ,Grid = Bootstrap.Grid
    ,Row = Bootstrap.Row
    ,Col = Bootstrap.Col
    ,MenuItem = Bootstrap.MenuItem
    ,Accordion = Bootstrap.Accordion
    ,Glyphicon = Bootstrap.Glyphicon
    ,Panel = Bootstrap.Panel;
var ReactRouterBootstrap = require('react-router-bootstrap')
    ,NavItemLink = ReactRouterBootstrap.NavItemLink
    ,MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var DataStore = require('../../jsx/stores/DataStore.jsx');
var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var SeasonMixin = require('../../jsx/mixins/SeasonMixin.jsx');
var DivisionConstants = require('../../jsx/constants/DivisionConstants.jsx');
var BallIcon = require('../../jsx/components/BallIcon.jsx');
var Season = require('../../lib/Season.js');
var Division = require('../../lib/Division.js');
var Team = require('../../lib/Team.js');
var User = require('../../lib/User.js');
var DivisionType = require('../../lib/DivisionType');
var Status = require('../../lib/Status');
var TeamMatch = require('../../lib/TeamMatch');
var Result = require('../../lib/Result');

var SeasonNav = React.createClass({
    mixins: [UserContextMixin,Router.State,Router.Navigation],
    render: function() {
        return (
            <li id="stat-nav" role="presentation">
                <Link className='scoutNav' to='stats' params={{statsId: this.getUserId()}}>
                    <i className="fa fa-bar-chart"><span className="main-item">{ ' Stats'}</span></i>
                </Link>
            </li>
        );
    }
});

module.exports = SeasonNav;