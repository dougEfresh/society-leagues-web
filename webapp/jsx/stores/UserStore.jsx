var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants.jsx');
var assign = require('object-assign');
var UserActions = require('../actions/UserAction.jsx');
var CHANGE_EVENT = 'change';
var DataFactoryMixin = require('../DataFactoryMixin.jsx');

var _user = { id:0, name:""};
var _users = [];
var _viewUser = null;

var UserStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    getFromServer: function() {
        if (_user.id = 0) {
            DataFactoryMixin.getData('/api/user' + function (d) {
                _user = d;
                UserStore.emitChange();
            }.bind(this));
        } else {
            return _user;
        }
    },

    getAll: function(){
        return _users;
    },

    getAllFromServer: function() {
         DataFactoryMixin.getData('/api/users', function(d) {
            _users = d;
            UserStore.emitChange();
        }.bind(this));
    },
    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    setViewUser : function(user) {
        _viewUser = user;
    },

    getName: function(userId) {
        var user = {id: 0, name: 'unknown'};
        _users.forEach(function(u) {
            if (u.id == userId) {
                user = u;
            }
        });
        return user.name;
    },

    set: function(user) {
        console.log('Setting userId : ' + JSON.stringify(user));
        _user = user;
    },

    get: function() {
        return _viewUser != null ? _viewUser : _user;
    }
});

AppDispatcher.register(function(action) {
     switch(action.actionType) {
         case UserConstants.USER_SET:
             UserStore.set(action.user);
             UserStore.emitChange();
             break;

         case UserConstants.USER_VIEW_SET:
             UserStore.setViewUser(action.user);
             UserStore.emitChange();
             break;

         default:
             //console.log(JSON.stringify(action));
     }
});

module.exports = UserStore;