// src/pages/user/KanbanPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from '../../components/TaskCard';
import LoadingScreen from '../../components/LoadingScreen';
import FloatingFilterBar from '../../components/FloatingFilterBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTasks, updateTask } from '../../redux/features/tasks/taskThunks';
import { getAllUsers } from '../../redux/features/users/userThunks';

const STATUS_KEYS = ['Todo', 'In Progress', 'Done'];

const STATUS_COLORS = {
  Todo: '#38bdf8',
  'In Progress': '#a78bfa',
  Done: '#22c55e'
};

export default function KanbanPage() {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const { tasks, loading: tasksLoading } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  const groupedColumns = React.useMemo(() => {
    const grouped = { Todo: [], 'In Progress': [], Done: [] };
    tasks.forEach(task => grouped[task.status]?.push(task));
    return grouped;
  }, [tasks]);

  const sortTasks = arr => {
    if (!sortByPriority) return arr;
    return [...arr].sort(
      (a, b) =>
        ['High', 'Medium', 'Low'].indexOf(a.priority) -
        ['High', 'Medium', 'Low'].indexOf(b.priority)
    );
  };

  const onDragEnd = async result => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const movedTask = groupedColumns[source.droppableId][source.index];
    const isAuthorized =
      movedTask.assignees.some(a => a._id === user._id) ||
      movedTask.reporter._id === user._id;

    if (!isAuthorized) {
      toast.error('Only assignees or the reporter can change the task status.');
      return;
    }

    setUpdating(true);

    try {
      await dispatch(updateTask({ taskId: draggableId, updates: { status: destination.droppableId } }));
      dispatch(getTasks());
    } catch {
      toast.error('Failed to update task.');
    } finally {
      setUpdating(false);
    }
  };

  if (tasksLoading) return <LoadingScreen message="Loading board…" />;

  const filteredTasks = tasks.filter(task => showCompleted || task.status !== 'Done');

  return (
    <div className="px-4 py-8 relative text-secondary-green min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-primary-green">Kanban Board</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Drag and drop tasks to update their status
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm text-gray-700">Show completed tasks</span>
        </div>
      </div>

      <FloatingFilterBar>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={sortByPriority}
            onChange={e => setSortByPriority(e.target.checked)}
          />
          <span>Sort by priority</span>
        </label>
      </FloatingFilterBar>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUS_KEYS.map(status => (
            <Droppable droppableId={status} key={status}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-w-[280px] rounded-lg shadow p-3"
                  style={{
                    backgroundColor: `${STATUS_COLORS[status]}22`,
                    border: `2px solid ${STATUS_COLORS[status]}`
                  }}
                >
                  <h2 className="text-xl font-semibold mb-3 text-primary-green">{status}</h2>
                  {sortTasks(groupedColumns[status]).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {prov => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className="mb-3"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {updating && (
        <div className="absolute inset-0 z-50">
          <LoadingScreen message="Updating task…" />
        </div>
      )}
    </div>
  );
}
