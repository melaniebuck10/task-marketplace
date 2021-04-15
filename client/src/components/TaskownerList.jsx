import Task from './Task';

const TaskownerList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
          <Task task={task} />
      ))}
    </div>
  );
};

export default TaskownerList;
