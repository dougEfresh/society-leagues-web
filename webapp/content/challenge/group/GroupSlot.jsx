var React = require('react/addons');
var GroupMixin = require('./GroupListMixin.jsx');
var Bootstrap = require('react-bootstrap')
    ,Label = Bootstrap.Label
    ,Input = Bootstrap.Input;
var ChallengeActions = require('../../../jsx/actions/ChallengeActions.jsx');

var GroupSlot = React.createClass({
    mixins: [GroupMixin],
    onSelectSlot: function() {
        ChallengeActions.selectChallengeGroupSlot(
            this.props.challengeGroup,
            this.refs.slot.getValue()
        );
    },
    renderNoSelect: function() {
        var slots = [];
        if ( this.props.challengeGroup.selectedSlots != undefined) {
            this.props.challengeGroup.selectedSlots.forEach(function (s) {
                slots.push(<Label key={s.id}>{s.getTime()}</Label>);
            }.bind(this));
        } else {
            this.props.challengeGroup.slots.forEach(function (s) {
                slots.push(<Label key={s.id}>{s.getTime()}</Label>);
            }.bind(this));
        }

        return slots;
    },
    renderSelectOptions: function(){
        if (this.props.challengeGroup.slots.length == 1) {
            return (<Label>{this.props.challengeGroup.slots[0].getTime()}</Label>);
        }
        var slots = [];
        slots.push(<option key={0} value={0}>{'choose'}</option>);
        var sorted = this.props.challengeGroup.slots.sort(function(a,b){
           return a.getTime().localeCompare(b.getTime());
        });
        sorted.forEach(function (s) {
            slots.push(<option key={s.id} value={s.id}>{s.getTime()}</option>);
        }.bind(this));
        return (<Input ref='slot' onChange={this.onSelectSlot}
                       value={this.props.challengeGroup.selectedSlot}
                       type={'select'}> {slots}
		</Input>);
    },
    render: function() {
        if (this.props.noSelect)
            return (<div>{this.renderNoSelect()}</div>);

        return (<div>{this.renderSelectOptions()}</div>);
    }
});

module.exports = GroupSlot;