// import { Link } from 'react-router-dom';
import Task from './Task';
// import SingleTask from '../views/SingleTask';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {/* {tasks.map((task) => (
        <Link key={task._id} to={`/task/${task._id}`}>
          <Task task={task} />
        </Link>
      ))} */}
      <Task />
    </div>
  );
};

export default TaskList;
