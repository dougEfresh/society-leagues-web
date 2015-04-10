var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var RequestConstants = require('../constants/ChallengeConstants.jsx');

var ChallengeActions = {

    /**
     * @param  {object} challenge
     */
        /*
    create: function(challenge) {
        AppDispatcher.dispatch({
            actionType: RequestConstants.CHALLENGE_CREATE,
            challenge: challenge
        });
    },
    */

    /**
     * @param  {date} string
     */
    changeDate: function(date) {
        AppDispatcher.dispatch({
            actionType: RequestConstants.CHALLENGE_DATE_CHANGE,
            date: date
        });
    },

    /**
     *  Dupilcate slots will be ignored
     * @param slots
     */
    addSlots: function(slots) {
        AppDispatcher.dispatch({
            actionType: RequestConstants.CHALLENGE_SLOTS_ADD,
            slots: slots
        });
    },

    /**
     * Remove a time slot
     * @param slot
     */
    removeSlot: function(slot) {
        AppDispatcher.dispatch({
            actionType: RequestConstants.CHALLENGE_SLOTS_REMOVE,
            slot: slot
        });
    },

    /**
     * Set the opponent from the list of potentials
     * @param opponent
     */
    setOpponent: function(opponent) {
         AppDispatcher.dispatch({
            actionType: RequestConstants.CHALLENGE_OPPONENT_CHANGE,
            opponent: opponent
         });
    },

    /**
     * Set the game type (8 or 9)
     * @param game
     */
    setGame: function(game) {
         AppDispatcher.dispatch({
            actionType: RequestConstants.CHALLENGE_GAME_CHANGE,
            game: game
         });
    }
};

module.exports = ChallengeActions;