const Task = ({ task }) => {
  return (
    <div>
      {(!!task.pictures.length && (
        <img src={task.pictures[0]} alt={task.name} />
      )) || <div className="task__standin-picture"></div>}
      <div className="task__item__details">
        <h5>{task.name}</h5>
        <small>
          {task.assignment === 'single_task' ? 'Single Task' : 'Project'} |{' '}
          {task.price} Eur |{' '}
        </small>
        {task.description && <p>{task.description}</p>}
      </div>
    </div>
  );
};

export default Task;
