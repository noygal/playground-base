var Reflux = require('reflux');
var _taskBuilder = require('../tasks/taskBuilder.js');
var taskBuilder = new _taskBuilder();

//adding tasks
var _taskAdded = Reflux.createAction();

var _tasksStore = Reflux.createStore({
    init: function() {
        this.listenTo(_taskAdded, this.runTask);
    },
    runTask: function() {
        var i, args = Array.prototype.slice.call(arguments, 0);
        this.trigger('taskAdded',args.join(','));
    }
});


//Parsing a path
var _pathAdded = Reflux.createAction();

var _pathStore = Reflux.createStore({
    init: function(){
        this.listenTo(_pathAdded,this.parsePath);
    },
    parsePath : function(path){
        console.log(path);
        var result = TaskBuilder.processPath(path);
        this.trigger(result);
    }
});


module.exports = {
	runTask : _taskAdded,
    taskStore : _tasksStore,
    addPath : _pathAdded,
    pathStore : _pathStore
}
