import { motion, AnimatePresence } from 'framer-motion'
import Task from './Task.jsx'
import NewTask from './NewTask.jsx'
import './task.css'

export default function TaskTable({ tasks, onAddTask, onToggleComplete, onUpdateTask, onDeleteTask }) {
    const getScore = (task) => {
        const now = new Date();
        const deadline = new Date(task.deadline);
        const urgency = (deadline - now) / (1000 * 3600); // number of remaining hours
        const urgencyWeight = 1;
        const importance = task.points;
        const importanceWeight = 2;

        // lower score means higher priority
        return urgency * urgencyWeight - importance * importanceWeight;
    }

    return (
        <div className="task-table">
            <div className="task-header">
                <h2>Active Tasks</h2>
                <NewTask onAddTask={onAddTask} />
            </div>
            <AnimatePresence> {/* used for smooth removal */}
                {tasks
                    .filter(task => !task.completed)
                    .sort((a, b) => getScore(a) - getScore(b)) // ascending order sorting
                    .map(task => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Task
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