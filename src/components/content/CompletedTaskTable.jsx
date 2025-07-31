import { motion, AnimatePresence } from 'framer-motion'
import CompletedTask from './CompletedTask.jsx'

export default function CompletedTaskTable({ tasks, onToggleComplete, onUpdateTask, onDeleteTask }) {
    return (
        <div className="completed-task-table">
            <h2>Completed Tasks</h2>
            <AnimatePresence>
                {tasks
                    .filter(task => task.completed)
                    .sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
                    .map(task => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CompletedTask
                                key={task.id}
                                task={task}
                                onToggle={(updatedTask) => onToggleComplete(updatedTask)}
                                onUpdateTask={(updatedTask) => onUpdateTask(updatedTask)}
                                onDeleteTask={(id) => onDeleteTask(id)}
                            />
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>
    )
}
