var React = require('react/addons');
var RequestMixin = require('./RequestMixin.jsx');
var Bootstrap = require('react-bootstrap')
    ,Button = Bootstrap.Button
    ,Panel = Bootstrap.Panel
    ,ListGroup = Bootstrap.ListGroup
    ,ListGroupItem = Bootstrap.ListGroupItem
    ,Table =  Bootstrap.Table
    ,ButtonGroup = Bootstrap.ButtonGroup
    ,DropdownButton = Bootstrap.DropdownButton
    ,MenuItem = Bootstrap.MenuItem
    ,Input = Bootstrap.Input
    ,Label = Bootstrap.Label;

var RequestSlot = React.createClass({
    mixins: [RequestMixin],
    onSelectSlot: function() {

    },
    renderNoSelect: function() {
        var slots = [];
        this.props.request.slots.forEach(function (s) {
            slots.push(<Label key={s.id}>{s.time}</Label>);
            }.bind(this));
        return slots;
    },
    renderSelectOptions: function(){
        if (this.props.request.slots.length == 1) {
            return (<Label>{this.props.request.slots[0].time}</Label>);
        }
        var slots = [];
        slots.push(<option key={0} value={0}>{'choose'}</option>);
        this.props.request.slots.forEach(function (s) {
            slots.push(<option key={s.id} value={s.id}>{s.time}</option>);
        }.bind(this));
        return (<Input onChange={this.onSelectSlot} value={this.props.request.selectedSlot} type={'select'}> {slots}</Input>);
    },
    render: function() {
        if (this.props.noSelect)
            return (<div>{this.renderNoSelect()}</div>);

        return (<div>{this.renderSelectOptions()}</div>);
    }
});

module.exports = RequestSlot;