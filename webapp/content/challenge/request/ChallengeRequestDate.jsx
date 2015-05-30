var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var UserContextMixin  = require('../../../jsx/mixins/UserContextMixin.jsx');
var Util  = require('../../../jsx/util.jsx');
var Bootstrap = require('react-bootstrap')
    ,Input = Bootstrap.Input;
var moment = require('moment');

var Router = require('react-router')
    ,Link = Router.Link
    ,RouteHandler = Router.RouteHandler;

var ChallengeRequestDate = React.createClass({
    mixins: [UserContextMixin,Router.Navigation,Router.State],
    getOptions: function(){
        var nextChallengeDate = Util.nextChallengeDate();
        var dates = [];
        var q = this.getQuery();
        // Add the next 4 weeks as options
        [0,1,2,3,4].forEach(function(i) {
            dates.push(moment(nextChallengeDate).add(i,'weeks').format('YYYY-MM-DD'));
        });
        var found = false;
        dates.forEach(function (d) {
                if (d == this.props.date) {
                    found = true;
                }
            }.bind(this)
        );
        var dateOptions = [];
        dateOptions.push(<option key={-1} value={-1}>{'Choose date'}</option>);
        dates.forEach(function(d) {
            dateOptions.push(<option key={d} value={d}>{d}</option>);
        });

        return dateOptions;
    },

    componentDidMount: function() {
        //Init the date
        //RequestActions.changeDate(Util.nextChallengeDate());
    },
    onChange: function() {
        var q = this.getQuery();
        q.date = this.refs.date.getValue();
        q.selectedSlots = undefined;
        this.transitionTo('request',this.getParams(),q);
        //RequestActions.changeDate(this.refs.date.getValue());
    },
    render: function() {
        var q = this.getQuery();
        var dt = q.date;
        if (dt == undefined) {
            dt = -1;
        }
        if (this.props.challengeGroup)
            return (
                <Input type='select' ref='date' value={dt} label={'Choose Date'} onChange={this.onChange} >{this.getOptions()}</Input>
            );
        return null;
    }
});

module.exports = ChallengeRequestDate;
