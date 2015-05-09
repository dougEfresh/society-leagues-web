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
    ,Modal = Bootstrap.Modal
    ,ModalTrigger = Bootstrap.ModalTrigger
    ,Panel = Bootstrap.Panel;

var ReactRouterBootstrap = require('react-router-bootstrap')
    ,NavItemLink = ReactRouterBootstrap.NavItemLink
    ,MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var DataStore= require('../../stores/DataStore.jsx');
var UserContextMixin = require('../../UserContextMixin.jsx');
var SeasonMixin = require('../../SeasonMixin.jsx');
var TeamMixin = require('../../TeamMixin.jsx');
var ResultMixin = require('../../ResultMixin.jsx');
var TeamLink = require('../TeamLink.jsx');
var TeamResult = require('../TeamResult.jsx');

var MatchResultsOnDay = React.createClass({
    mixins: [ResultMixin,SeasonMixin,TeamMixin,UserContextMixin,Router.State,Router.Navigation,Bootstrap.OverlayMixin],
    getInitialState: function() {
        return {
            isModalOpen: false,
            teamMatchId: 0,
            teamId:0
        };
    },
     getDefaultProps: function() {
        return {
            matches: null,
            day: null
        }
    },
    handleToggle: function(e,id) {
        if (e == undefined || e == null) {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
                teamMatchId: 0,
                teamId: 0
            });
            return;
        }
        e.preventDefault();
        //Ids is teamMatchId,teamId (csv string)
        var ids = e.target.id;
        if (ids == undefined || ids == "")  {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
                teamMatchId: 0,
                teamId: 0
            });
        } else {
             this.setState({
                isModalOpen: !this.state.isModalOpen,
                teamMatchId: ids.split(",")[0],
                teamId: ids.split(",")[1]
            });
        }
    },
    renderOverlay: function () {
        if (!this.state.isModalOpen) {
            return <span/>;
        }
        return (
             <Modal className="resultsModal" bsStyle={'success'} title={'Results'} onRequestHide={this.handleToggle}>
                 <div className='modal-body'>
                     <TeamResult teamId={this.state.teamId} seasonId={this.getParams().seasonId} teamMatchId={this.state.teamMatchId} />
                 </div>
                 <div className='modal-footer'>
                     <Button bsStyle={'success'} onClick={this.handleToggle}>Close</Button>
                 </div>
            </Modal>
        );
    },
    render: function() {
        if (this.props.matches == null) {
            return null;
        }
        var rows = [];

        this.props.matches.forEach(function(m){
            var teamWinnerLink = (<a id={m.teamMatchId + ',' + m.winner} href="#" onClick={this.handleToggle}>{this.getTeam(m.winner).name}</a>);
            var teamLoserLink = (<a id={m.teamMatchId + ',' + m.loser} href="#" onClick={this.handleToggle}>{this.getTeam(m.loser).name}</a>);
            rows.push(
                <tr className="teamMatchResultRow" key={m.teamMatchId}>
                    <td>{teamWinnerLink}</td>
                    <td>{m.winnerRacks}</td>
                    <td>{teamLoserLink}</td>
                    <td>{m.loserRacks}</td>
                </tr>
            )
        }.bind(this));
        return (
            <div className="teamMatchResult" >
                <Panel header={this.props.day.substr(0,10)}>
                <Table striped >
                    <thead>
                    <th>W</th>
                    <th>racks</th>
                    <th>L</th>
                    <th>racks</th>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                </Panel>
            </div>
        )
    }
});

module.exports = MatchResultsOnDay;