var Reflux = require('reflux');
var _taskBuilder = require('../tasks/taskBuilder.js');
var taskBuilder = new _taskBuilder();

var _taskRunner = require('../runner/TaskRunner.js');

//adding tasks
var _taskAdded = Reflux.createAction();

var _tasksStore = Reflux.createStore({
    init: function() {
        this.listenTo(_taskAdded, this.runTask);
    },
    runTask: function(item) {
        var runner = new _taskRunner(item.cmd);
        runner.onUpdate((x) => {
            this.trigger("update",x);
        })
        runner.onError((x) => {
            this.trigger("error",x);
        })
        runner.onExit((x) => {
            this.trigger("exit",x);
        })
        this.trigger("started",item);
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
        var result = taskBuilder.processPath(path);
        this.trigger(result);
    }
});


module.exports = {
	runTask : _taskAdded,
    taskStore : _tasksStore,
    addPath : _pathAdded,
    pathStore : _pathStore
}
