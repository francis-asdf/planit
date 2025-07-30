import CompletedTask from './CompletedTask.jsx'

export default function CompletedTaskTable({ tasks, onToggleComplete, onUpdateTask, onDeleteTask }) {
    return (
        <div className="completed-task-table">
            <h2>Completed Tasks</h2>
            {tasks
                .filter(task => task.completed)
                .sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
                .map(task => (
                    <CompletedTask
                        key={task.id}
                        task={task}
                        onToggle={() => onToggleComplete(task.id, false)}
                        onUpdateTask={(updatedTask) => onUpdateTask(updatedTask)}
                        onDeleteTask={(id) => onDeleteTask(id)}
                    />
                ))
            }
        </div>
    )
}
