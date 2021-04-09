import { Link } from 'react-router-dom';
import Task from './Task';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Link key={task._id} to={`/task/${task._id}`}>
          <Task task={task} />
        </Link>
      ))}
    </div>
  );
};

export default TaskList;
