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
          {task.assignment === 'single_task' ? 'Single Task' : 'Project'} <br />
          <strong>I can pay you this much:</strong> {task.price} Eur <br />{' '}
          <br />
          <strong>Short description of the task: </strong> <br />
          {task.description && <p>{task.description}</p>} <br />
          <p>
            Status:{' '}
            {(task.status === 'in_process' && 'In Process') ||
              'Open' ||
              'Closed'}
          </p>
          <p>Have a look at it and apply for it!</p>
        </small>
      </div>
    </div>
  );
};

export default Task;
