var Reflux = require('reflux');

var taskAdded = Reflux.createAction();

var _tasksStore = Reflux.createStore({
    init: function() {
        this.listenTo(taskAdded, this.runTask);
    },
    runTask: function() {
        var i, args = Array.prototype.slice.call(arguments, 0);
        this.trigger('taskAdded',args.join(','));
    }
});


module.exports = {
	AddTask : taskAdded,
    taskStore : _tasksStore
}

