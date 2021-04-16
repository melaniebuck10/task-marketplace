import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import Task from './Task';
 import { loadTask, applyTask } from './../services/task';

 class TaskList extends Component {
   state = {
     task: null,
     application: null
   };

   /*async componentDidMount() {
     const { task, application } = await loadTask(this.props.match.params.id);
     this.setState({ task, application });
   }*/

   handleTaskApplication = async () => {
     console.log(this.props.taskid);
     const application = await applyTask(this.props.taskid);
     this.setState({ application });
   };

   render() {
     return (
       <main>
         <div>
           {this.props.tasks.map((task) => (
             <div key={task._id}>
               <Link to={`/task/${task._id}`}>
                 <Task task={task} />
               </Link>
               <button
                 className="button"
                 disabled={this.state.application}
                 taskid={task._id}
                 onClick={this.handleTaskApplication}
               >
                 {(this.state.application && 'Applied!') || 'Apply for Task'}
               </button>
             </div>
           ))}
         </div>
       </main>
     );
   }
 }

 export default TaskList;