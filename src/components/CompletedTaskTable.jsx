import CompletedTask from './CompletedTask.jsx'

export default function CompletedTaskTable({ tasks, onToggleComplete }) {
    return (
        <div className="completed-task-table">
            <h2>Completed Tasks</h2>
            {tasks
                .filter(task => task.completed)
                .map(task => (
                    <CompletedTask
                        key={task.id}
                        name={task.name}
                        completed={task.completed}
                        completionDate={task.completionDate}
                        onToggle={() => onToggleComplete(task.id)}
                    />
                ))
            }
        </div>
    )
}
