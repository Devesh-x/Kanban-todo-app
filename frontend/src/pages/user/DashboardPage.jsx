import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip
} from 'recharts';
import LoadingScreen from '../../components/LoadingScreen';
import FloatingFilterBar from '../../components/FloatingFilterBar';
import { getTasks } from '@/redux/features/tasks/taskThunks';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  TrendingUp 
} from 'lucide-react';

const STATUS_COLORS = {
  Todo: '#10b981',
  'In Progress': '#f59e0b',
  Done: '#22c55e'
};

const PRIORITY_COLORS = {
  Low: '#10b981',
  Medium: '#f59e0b',
  High: '#ef4444'
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  const [viewFilter, setViewFilter] = useState('assigned');
  const [showGraphs, setShowGraphs] = useState(false);

  const assignedCount = useMemo(() =>
    tasks.filter(t => t.assignees.some(a => a._id === user._id)).length,
    [tasks, user._id]
  );

  const reportedCount = useMemo(() =>
    tasks.filter(t => t.reporter._id === user._id).length,
    [tasks, user._id]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const isAssignee = task.assignees.some(a => a._id === user._id);
      const isReporter = task.reporter._id === user._id;

      if (viewFilter === 'assigned') return isAssignee;
      if (viewFilter === 'reported') return isReporter;
      return isAssignee || isReporter;
    });
  }, [tasks, user._id, viewFilter]);

  const total = filteredTasks.length;
  const todo = filteredTasks.filter(t => t.status === 'Todo').length;
  const inProgress = filteredTasks.filter(t => t.status === 'In Progress').length;
  const done = filteredTasks.filter(t => t.status === 'Done').length;

  const pieData = useMemo(() => [
    { name: 'Todo', value: todo, percentage: total > 0 ? Math.round((todo / total) * 100) : 0 },
    { name: 'In Progress', value: inProgress, percentage: total > 0 ? Math.round((inProgress / total) * 100) : 0 },
    { name: 'Done', value: done, percentage: total > 0 ? Math.round((done / total) * 100) : 0 },
  ], [todo, inProgress, done, total]);

  const priorityCounts = useMemo(() => {
    const map = { Low: 0, Medium: 0, High: 0 };
    filteredTasks.forEach(t => map[t.priority]++);
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredTasks]);

  const statsData = [
    { label: 'Total Tasks', value: total, icon: ClipboardList },
    { label: 'Todo', value: todo, icon: Clock },
    { label: 'In Progress', value: inProgress, icon: TrendingUp },
    { label: 'Done', value: done, icon: CheckCircle },
  ];

  if (loading) return <LoadingScreen message="Loading dashboard…" />;

  return (
    <div className="p-4 sm:p-6 space-y-8 text-secondary-green bg-white min-h-screen overflow-x-hidden">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-green">Good Morning, {user.name}!</h1>
        <p className="text-gray-600 text-sm sm:text-base">{format(new Date(), "EEEE do MMM yyyy")}</p>
      </div>

      <FloatingFilterBar>
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewFilter === 'assigned' 
                ? 'bg-primary-green text-white shadow-md' 
                : 'text-gray-600 hover:text-primary-green hover:bg-gray-50'
            }`} 
            onClick={() => setViewFilter('assigned')}
          >
            Assigned to Me ({assignedCount})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewFilter === 'reported' 
                ? 'bg-primary-green text-white shadow-md' 
                : 'text-gray-600 hover:text-primary-green hover:bg-gray-50'
            }`} 
            onClick={() => setViewFilter('reported')}
          >
            Reported by Me ({reportedCount})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewFilter === 'both' 
                ? 'bg-primary-green text-white shadow-md' 
                : 'text-gray-600 hover:text-primary-green hover:bg-gray-50'
            }`} 
            onClick={() => setViewFilter('both')}
          >
            Both ({total})
          </button>
        </div>
      </FloatingFilterBar>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center min-w-0 hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0 mr-3">
              <Icon className="w-6 h-6 text-primary-green" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-600 text-xs sm:text-sm truncate">{label}</p>
              <p className="text-lg sm:text-xl font-bold text-primary-green truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="block sm:hidden">
        <button 
          onClick={() => setShowGraphs(!showGraphs)} 
          className="w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:border-primary-green hover:text-primary-green transition-all duration-200"
        >
          {showGraphs ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>

      {(showGraphs || window.innerWidth >= 640) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary-green">Task Distribution</h2>
            <div className="space-y-3">
              {pieData.map(({ name, value, percentage }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: STATUS_COLORS[name] }}
                    ></div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary-green">{value}</span>
                    <span className="text-xs text-gray-500">({percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary-green">Task Priority Levels</h2>
            <div className="space-y-3">
              {priorityCounts.map(({ name, value }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: PRIORITY_COLORS[name] }}
                    ></div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                  <span className="text-sm font-medium text-primary-green">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary-green">Recent Tasks</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-sm sm:text-base text-gray-600 font-medium py-2">Title</th>
                <th className="text-left text-sm sm:text-base text-gray-600 font-medium py-2">Status</th>
                <th className="text-left text-sm sm:text-base text-gray-600 font-medium py-2">Priority</th>
                <th className="text-left text-sm sm:text-base text-gray-600 font-medium py-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="text-sm sm:text-base whitespace-nowrap py-3 text-gray-700">{task.title}</td>
                    <td className="text-sm sm:text-base whitespace-nowrap py-3">
                      <span
                        className={`text-white text-xs sm:text-sm px-2 py-1 rounded-full font-medium ${
                          task.status === 'Done' ? 'bg-green-500' :
                          task.status === 'In Progress' ? 'bg-yellow-500' :
                          'bg-primary-green'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="text-sm sm:text-base whitespace-nowrap py-3">
                      <span
                        className={`text-xs sm:text-sm px-2 py-1 rounded-full border font-medium ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="text-sm sm:text-base whitespace-nowrap py-3 text-gray-700">{format(new Date(task.dueDate), 'dd MMM yyyy')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-8">No tasks to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
