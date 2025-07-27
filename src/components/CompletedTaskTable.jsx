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
                        task={task}
                        onToggle={() => onToggleComplete(task.id, false)}
                    />
                ))
            }
        </div>
    )
}
