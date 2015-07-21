

var React = require('react');
var eventsDispatcher = require('../modules/events/eventsDispatcher.js');
export class taskList extends React.Component {
    constructor(){
        super();
        this.state = {
            tasks:["task1","task2","task3","task4"]
        }
        eventsDispatcher.pathStore.listen(function(tasks){
            this.state.tasks = tasks;
        })
    }
    handleClcik(){
        alert(item);
    }
    render() {
        return (
            <div className="commentBox">
            { this.state.tasks.map(function(item) {
                // var boundClick = this.handleClick.bind(this, item);
                // return <div onClick="boundClick">{item}</div>
                   return <div >{item}</div>
            })
                }
            </div>
        );
    }
}