import './Task.scss';

const Task = ({ task }) => {
  return (
    <div className="task__item">
      {(!!task.pictures.length && (
        <img src={task.pictures[0]} alt={task.name} />
      )) || <div className="task__standin-picture"></div>}
      <div className="task__item__details">
        <h5>{task.name}</h5>
        <small>
          <strong> What type of task is it?</strong>{' '}
          <p>{task.assignment === 'single_task' ? 'Single Task' : 'Project'}</p>
          <p>
            <strong>What you get:</strong> {task.price} EUR{' '}
          </p>
          <p>Have a look and apply for it!</p>
        </small>
      </div>
    </div>
  );
};

export default Task;
