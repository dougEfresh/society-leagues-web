var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ChallengeConstants = require('../constants/ChallengeConstants.jsx');
var ChallengeStatus = require('../constants/ChallengeStatus.jsx');
var assign = require('object-assign');
var Util = require('../util.jsx');
var UserStore = require('./UserStore.jsx');
var CHANGE_EVENT = 'change';
var ADD_EVENT = 'add';
var ChallengeActions = require('../actions/ChallengeActions.jsx');

/**
 * Returns the default game type, which is neither 9 or 8
 * @returns object
 */
function defaultGame() {
    return {
        nine:  {available: false, selected: false},
        eight: {available: false, selected: false}
    };
}

var _default = {
    date: undefined,
    opponent: {user: {id: 0, name: '-----'}},
    slots: [],
    game: defaultGame()
};

var _challenges = {};
_challenges[ChallengeStatus.PENDING] = [];
_challenges[ChallengeStatus.NEEDS_NOTIFY] = [];
_challenges[ChallengeStatus.CANCELLED] = [];
_challenges[ChallengeStatus.SENT] = [];
_challenges[ChallengeStatus.ACCEPTED] = [];

var _request = _default;

var ChallengeStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    emitAdd: function() {
        this.emit(ADD_EVENT);
    },

    /**
     * @param {function} callback
     */
    addRequestListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(ADD_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeRequestListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(ADD_EVENT, callback);
    },

    create: function(request) {
        _request = _default;
        //TODO Move this to lib
        $.ajax({
            async: true,
            processData: false,
            url: '/api/challenge/request',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
            method: 'post',
            statusCode: {
                401: function () {
                    console.log('I Need to Authenticate');
                    //this.redirect('login');
                }
            },
            success: function (d) {
                _challenges = d;
                ChallengeStore.emitAdd();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                //this.redirect('error');
            }.bind(this)
        });
    },

    changeDate : function(date) {
        _request.date = date;
        _request.slots = [];
        this.getSlots();
    },

    getSlots: function() {
        console.log("Getting data from " + window.location.origin + '/api/challenge/slot/');
        $.ajax({
            url: '/api/challenge/slots/' + _request.date,
            dataType: 'json',
            statusCode: {
                401: function () {
                    console.log('I Need to Authenticate');
                }.bind(this)
            },
            success: function (d) {
                d.forEach(function(s){
                    s.selected = false;
                });
                _request.slots = d;
                ChallengeStore.emitChange();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('slots', status, err.toString());
                console.log('Redirecting to error');
                //this.redirect('error');
            }.bind(this)
        });
    },

    addSlots : function(slots) {
        //TODO Optimize
        slots.forEach(function(newSlot) {
            var found = false;
            _request.slots.forEach(function(s) {
                if (s.id == newSlot.id) {
                    found = true;
                }
            });
            if (!found) {
                _request.slots.push(newSlot);
            }
        });
    },

    removeSlot : function(slot) {
        var newSlots = [];
        _request.slots.forEach(function(s){
            if (s.id != slot.id) {
                newSlots.push(s);
            }
        });
        _request.slots = newSlots;
    },

    setOpponent: function(opponent) {
        _request.opponent = opponent;
        var g = defaultGame();
        if (opponent.nineBallPlayer) {
            g.nine.available = true;
        }
        if (opponent.eightBallPlayer) {
            g.eight.available = true;
        }
        _request.game = g;
    },

    setGame: function(game) {
        _request.game.nine.selected  = game.nine.selected;
        _request.game.eight.selected = game.eight.selected;
    },

    get: function() {
        return _request;
    },

    getAllChallenges: function() {
        return _challenges;
    },

    setChallenges: function(userId) {
        console.log("Getting data from " + window.location.origin + '/api/challenge/' + userId);
         $.ajax({
            url: '/api/challenge/' + userId,
            dataType: 'json',
            statusCode: {
                401: function () {
                    console.log('I Need to Authenticate');
                }.bind(this)
            },
            success: function (d) {
                _challenges = d;
                ChallengeStore.emitAdd();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('slots', status, err.toString());
                console.log('Redirecting to error');
                //this.redirect('error');
            }.bind(this)
        });
    },

    changeStatus: function(status) {
        console.log('Sending ' + JSON.stringify(status));
        //TODO Move this to lib
        $.ajax({
            async: true,
            processData: false,
            url: '/api/challenge/status/' + status.userId + '/' +  status.status,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(status),
            method: 'post',
            statusCode: {
                401: function () {
                    console.log('I Need to Authenticate');
                    //this.redirect('login');
                }
            },
            success: function (d) {
                _challenges = d;
                ChallengeStore.emitChange();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                //this.redirect('error');
            }.bind(this)
        });
    },

    changeSlotStatus: function(slot) {
        _request.slots.forEach(function(s) {
            if (s.id == slot.id) {
                s.selected = slot.selected;
            }
        });
    }
});

AppDispatcher.register(function(action) {

     switch(action.actionType) {
         case ChallengeConstants.DATE_CHANGE:
             ChallengeStore.changeDate(action.date);
             ChallengeStore.emitChange();
             break;

         case ChallengeConstants.CHALLENGE_SLOTS_ADD:
             ChallengeStore.addSlots(action.slots);
             ChallengeStore.emitChange();
             break;

         case ChallengeConstants.CHALLENGE_SLOTS_REMOVE:
             ChallengeStore.removeSlot(action.slot);
             ChallengeStore.emitChange();
             break;

         case ChallengeConstants.OPPONENT_CHANGE:
             ChallengeStore.setOpponent(action.opponent);
             ChallengeStore.emitChange();
             break;

         case ChallengeConstants.CHALLENGE_GAME_CHANGE:
             ChallengeStore.setGame(action.game);
             ChallengeStore.emitChange();
             break;

         case ChallengeConstants.CREATE:
             ChallengeStore.create(action.request);
             break;

         case ChallengeConstants.CHANGE_STATUS:
             ChallengeStore.changeStatus(action.status);
             break;

         case ChallengeConstants.SLOT_CHANGE:
             ChallengeStore.changeSlotStatus(action.slot);
             ChallengeStore.emitChange();
             break;

         case ChallengeConstants.CHALLENGES:
             ChallengeStore.setChallenges(action.userId);
             break;

         default:
     }
});

module.exports = ChallengeStore;
