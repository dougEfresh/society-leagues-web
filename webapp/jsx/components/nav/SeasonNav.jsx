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

var DataStore = require('../../stores/DataStore.jsx');
var UserContextMixin = require('../../UserContextMixin.jsx');

var SeasonNav = React.createClass({
    mixins: [UserContextMixin],
    getInitialState: function () {
        return {
            user: this.getUser()
        }
    },
    componentWillMount: function () {
        DataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        DataStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        this.setState({user: this.getUser()});
    },
    _onChange: function () {
        this.setState({
            user: this.state.user
        });
    },
    render: function() {
        if (this.state.user.id == 0) {
            return null;
        }
        var seasons = [];
        this.getCurrentSeasons().forEach(function(t) {
            seasons.push(
                <div key={t.id}>
                    <Link key={t.id} to="season" params={{userId: this.getUserId(),seasonId: t.id}} >
                        {t.division.type}
                    </Link>
            </div>);
        }.bind(this));

        return (
            <div className='seasonNavLink' >{seasons}</div>
        )
    }
});

module.exports = SeasonNav;