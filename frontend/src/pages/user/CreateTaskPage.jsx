import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/features/users/userThunks';
import { createTask } from '../../redux/features/tasks/taskThunks';
import { toast } from 'react-toastify';
import { Calendar } from 'lucide-react';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z
    .string()
    .min(1, 'Due date is required')
    .refine((date) => {
      const selected = new Date(date);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return selected >= now;
    }, {
      message: 'Due date cannot be in the past',
    }),
  priority: z.enum(['Low', 'Medium', 'High'], {
    required_error: 'Priority is required',
  }),
  assignees: z.array(z.string()).min(1, 'Select at least one assignee'),
});

const CreateTaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading: usersLoading, error } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      assignees: [],
    },
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const toggleAssignee = (userId) => {
    const current = getValues('assignees') || [];
    const updated = current.includes(userId)
      ? current.filter((id) => id !== userId)
      : [...current, userId];
    setValue('assignees', updated, { shouldValidate: true });
  };

    const onSubmit = async (data) => {
      try {
        setLoading(true);
        const result = await dispatch(createTask(data));
        if (createTask.fulfilled.match(result)) {
          toast.success('Task created successfully!');
          window.location.href = '/app/tasks'; // Full page reload to tasks page
          dispatch(getAllUsers()); // Refresh users in case of new assignee
        } else {
          toast.error('Failed to create task: ' + result.payload);
          console.error('Task creation failed:', result.payload);
        }
      } catch (err) {
        toast.error('An unexpected error occurred while creating the task.');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
  };


  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-primary-green">📝 Create New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-secondary-green mb-2">Task Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-secondary-green mb-2">Priority</label>
          <select
            {...register('priority', { required: 'Priority is required' })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-secondary-green mb-2">Due Date</label>
          <div className="relative">
            <input
              type="date"
              {...register('dueDate', { required: 'Due date is required' })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black pr-12"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" size={20} />
          </div>
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
        </div>

        {/* Assignees */}
        <div>
          <label className="block text-sm font-medium text-secondary-green mb-2">Assignees</label>
          <div className="dropdown w-full">
            <label tabIndex={0} className="btn btn-outline w-full bg-white border border-gray-300 text-left justify-start">
              {getValues('assignees').length > 0 
                ? `${getValues('assignees').length} assignee(s) selected`
                : 'Select assignees'
              }
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-md bg-white rounded-box w-full max-h-60 overflow-y-auto border border-gray-200">
              {users.map(user => (
                <li key={user._id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={user._id}
                      checked={getValues('assignees').includes(user._id)}
                      onChange={() => toggleAssignee(user._id)}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className="text-gray-700">{user.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {errors.assignees && <p className="text-red-500 text-sm mt-1">{errors.assignees.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-secondary-green mb-2">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
            placeholder="Enter task description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-green hover:bg-primary-focus text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
