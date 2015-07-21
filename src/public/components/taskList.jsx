var React = require('react');
var eventsDispatcher = require('../modules/events/eventsDispatcher.js');
export class taskList extends React.Component {
    constructor(){
        super();
        this.state = {
            tasks:[]
        }
        eventsDispatcher.pathStore.listen((tasks) => {
            this.setState({
              tasks : tasks.npm
            });
        })
    }
    handleClick(item){
        eventsDispatcher.runTask(item);
    }
    render() {
        return (
            <div className="commentBox">
            {               
              this.state.tasks.map((item) => {
                   var boundClick = this.handleClick.bind(this, item);
                  var classname = "section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp task-status-" + item.status;
                   return <section className={classname} >
                       <header className="section__play-btn mdl-cell mdl-button mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
                           <i onClick={boundClick} className="material-icons">add</i>
                       </header>
                       <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                           <div className="mdl-card__supporting-text">
                               <h4>{item.name}</h4>
                           </div>
                       </div>
                   </section>
            })
                }
            </div>
        );
    }
}