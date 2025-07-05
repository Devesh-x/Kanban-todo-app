import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatISO } from 'date-fns';
import { X, Users } from 'lucide-react';
import LoadingScreen from './LoadingScreen';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/features/tasks/taskThunks'; 

export default function TaskDetailModal({
  task,
  users,
  onClose,
  onUpdated,
  onDeleted
}) {
  const { user: currentUser } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
    assignees: []
  });

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showAssigneeEditor, setShowAssigneeEditor] = useState(false);

  const isReporter = task?.reporter?._id === currentUser?._id;

  useEffect(() => {
    if (!task) return;
    setForm({
      title: task.title || '',
      description: task.description || '',
      dueDate: formatISO(new Date(task.dueDate), { representation: 'date' }),
      priority: task.priority,
      status: task.status,
      assignees: task.assignees.map(u => u._id)
    });
    setDirty(false);
  }, [task]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setDirty(true);
  };

  const toggleAssignee = id => {
    setForm(prev => ({
      ...prev,
      assignees: prev.assignees.includes(id)
        ? prev.assignees.filter(a => a !== id)
        : [...prev.assignees, id]
    }));
    setDirty(true);
  };

 const dispatch = useDispatch();

  const save = async () => {
    if (!isReporter) {
      toast.error('Only the reporter can update this task.');
      return;
    }

    setSaving(true);
    try {
      const updatedTask = await dispatch(updateTask({ taskId: task._id, updates: form })).unwrap();
      onUpdated(updatedTask); // Pass updated task back to parent
      setDirty(false);
      setShowAssigneeEditor(false);
      toast.success('Task updated successfully');
    } catch (err) {
      console.error(err);
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setDeleting(true);
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      onDeleted(task._id); // Notify parent to remove task from view
      toast.success('Task deleted successfully'); // ✅ show only for delete
    } catch (err) {
      toast.error(err);
      setDeleting(false);
    }
  };


  if (!task || saving || deleting) {
    return <LoadingScreen message={deleting ? 'Deleting…' : 'Saving…'} />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-green">Task Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-primary-green">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-secondary-green mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
                disabled={!isReporter}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-secondary-green mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
                disabled={!isReporter}
              />
            </div>

            {/* Due Date / Priority / Status */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-secondary-green mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
                  disabled={!isReporter}
                />
              </div>
              <div className="w-1/2 sm:w-1/4">
                <label className="block text-sm font-medium text-secondary-green mb-2">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
                  disabled={!isReporter}
                >
                  {['Low', 'Medium', 'High'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="w-1/2 sm:w-1/4">
                <label className="block text-sm font-medium text-secondary-green mb-2">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-gray-700"
                >
                  {['Todo', 'In Progress', 'Done'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Reporter */}
            {task.reporter && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Reporter:</span>
                <img
                  src={task.reporter.profilePic || '/default-avatar.png'}
                  alt={task.reporter.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{task.reporter.name}</span>
              </div>
            )}

            {/* Assignees */}
            <div>
              <label className="block text-sm font-medium text-secondary-green mb-2">Assignees</label>
              <div className="flex items-center gap-2">
                {task.assignees.map(a => (
                  <img
                    key={a._id}
                    src={a.profilePic || '/default-avatar.png'}
                    alt={a.name}
                    title={a.name}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm -ml-2 first:ml-0"
                  />
                ))}
                {isReporter && (
                  <button
                    onClick={() => setShowAssigneeEditor(p => !p)}
                    className="ml-2 px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-primary-green hover:text-primary-green transition-all duration-200 text-sm"
                  >
                    <Users size={16} className="mr-1 inline" />
                    Edit
                  </button>
                )}
              </div>

              {showAssigneeEditor && isReporter && (
                <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2 max-h-40 overflow-y-auto">
                  {users.map(u => (
                    <label key={u._id} className="flex items-center gap-2 text-gray-700">
                      <input
                        type="checkbox"
                        value={u._id}
                        checked={form.assignees.includes(u._id)}
                        onChange={() => toggleAssignee(u._id)}
                        className="checkbox checkbox-sm checkbox-primary"
                      />
                      <img
                        src={u.profilePic || '/default-avatar.png'}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{u.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            {isReporter && (
              <button onClick={remove} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                Delete
              </button>
            )}
            {dirty && (
              <button onClick={save} className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-focus transition-colors duration-200 ml-auto">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
