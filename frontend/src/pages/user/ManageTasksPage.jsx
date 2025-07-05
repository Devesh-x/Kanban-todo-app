// src/pages/user/ManageTasksPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import FloatingFilterBar from '../../components/FloatingFilterBar';
import LoadingScreen from '../../components/LoadingScreen';
import TaskCard from '../../components/TaskCard';
import TaskDetailModal from '../../components/TaskDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/features/tasks/taskThunks';
import { getAllUsers } from '../../redux/features/users/userThunks';

export default function ManageTasksPage() {
  const { tasks, loading: taskLoading } = useSelector((state) => state.tasks);
  const { users, loading: userLoading } = useSelector((state) => state.users);
  const loading = taskLoading || userLoading;
  const [selectedTask, setSelectedTask] = useState(null);
  const dispatch = useDispatch();
  
  // Filters
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [dueSoonOnly, setDueSoonOnly] = useState(false);
  const [myTasksFilter, setMyTasksFilter] = useState('all');

  const { user } = useSelector((state) => state.auth);

  const filtered = useMemo(() => {
    if (!Array.isArray(tasks)) {
      console.warn('Expected tasks to be an array but got:', tasks);
      return [];
    }
    return tasks.filter((task) => {
      // Search
      if (search) {
        const term = search.toLowerCase();
        if (
          !task.title.toLowerCase().includes(term) &&
          !task.description.toLowerCase().includes(term)
        )
          return false;
      }
      // Priority
      if (priorityFilter && task.priority !== priorityFilter) return false;
      // Status
      if (statusFilter && task.status !== statusFilter) return false;
      // Assignee
      if (assigneeFilter) {
        if (!task.assignees.some((a) => a._id === assigneeFilter)) return false;
      }
      // Due soon
      if (dueSoonOnly) {
        const days = differenceInCalendarDays(
          new Date(task.dueDate),
          new Date()
        );
        if (days > 3) return false;
      }
      // My tasks
      if (
        myTasksFilter === 'assigned' &&
        !task.assignees.some((a) => a._id === user._id)
      )
        return false;
      if (myTasksFilter === 'reported' && task.reporter._id !== user._id)
        return false;
      return true;
    });
  }, [
    tasks,
    search,
    priorityFilter,
    statusFilter,
    assigneeFilter,
    dueSoonOnly,
    myTasksFilter,
    user._id,
  ]);

  if (loading) return <LoadingScreen message="Loading tasks…" />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-secondary-green relative bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary-green">Manage Tasks</h1>

      <FloatingFilterBar>
        <input
          type="text"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700 flex-1 min-w-[150px]"
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
        >
          <option value="">All Priorities</option>
          {['Low', 'Medium', 'High'].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
        >
          <option value="">All Statuses</option>
          {['Todo', 'In Progress', 'Done'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
        >
          <option value="">All Assignees</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary"
            checked={dueSoonOnly}
            onChange={(e) => setDueSoonOnly(e.target.checked)}
          />
          <span className="text-sm">Due in 3 days</span>
        </label>
        <select
          value={myTasksFilter}
          onChange={(e) => setMyTasksFilter(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
        >
          <option value="all">All Tasks</option>
          <option value="assigned">Assigned to me</option>
          <option value="reported">Created by me</option>
        </select>
      </FloatingFilterBar>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No tasks match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((task) => (
            <div
              key={task._id}
              onClick={() => setSelectedTask(task)}
              className="cursor-pointer"
            >
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          users={users}
          onClose={() => setSelectedTask(null)}
          onUpdated={(updated) => {
            setSelectedTask(updated);
          }}
          onDeleted={(id) => {
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
