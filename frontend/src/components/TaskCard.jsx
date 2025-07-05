import React from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';

const STATUS_COLORS = {
  Todo: { bg: 'bg-[#e0f2fe]', border: 'border-[#38bdf8]', text: 'text-[#0ea5e9]' },
  'In Progress': { bg: 'bg-[#ede9fe]', border: 'border-[#a78bfa]', text: 'text-[#7c3aed]' },
  Done: { bg: 'bg-[#dcfce7]', border: 'border-[#22c55e]', text: 'text-[#15803d]' }
};

const PRIORITY_COLORS = {
  High: { bg: 'bg-[#fee2e2]', border: 'border-[#ef4444]', text: 'text-[#b91c1c]' },
  Medium: { bg: 'bg-[#fef3c7]', border: 'border-[#f59e0b]', text: 'text-[#b45309]' },
  Low: { bg: 'bg-[#fefce8]', border: 'border-[#eab308]', text: 'text-[#92400e]' }
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const {
    title,
    description,
    priority,
    status,
    dueDate,
    assignees = []
  } = task;

  const daysLeft = differenceInCalendarDays(new Date(dueDate), new Date());
  const isDueSoon = daysLeft <= 3;
  const isOverdue = daysLeft < 0;

  const visibleAssignees = assignees.slice(0, 5);
  const extraAssignees = assignees.length - 5;

  const priorityStyle = PRIORITY_COLORS[priority] || {};
  const statusStyle = STATUS_COLORS[status] || {};

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{title}</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-primary-green transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{description}</p>

      <div className="space-y-2">
        {/* Priority */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Priority:</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priority === 'High' ? 'bg-red-100 text-red-800' :
              priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}
          >
            {priority}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Status:</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text} text-xs sm:text-sm font-medium`}
          >
            {status}
          </span>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Due:</span>
          <span className={`text-xs ${
            isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'
          }`}>
            {format(new Date(dueDate), 'MMM dd')}
          </span>
        </div>

        {/* Assignees */}
        {assignees && assignees.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Assigned:</span>
            <div className="flex -space-x-1">
              {visibleAssignees.slice(0, 3).map((assignee, index) => (
                <div
                  key={assignee._id}
                  className="w-6 h-6 rounded-full border-2 border-white bg-primary-green flex items-center justify-center text-white text-xs font-medium"
                  title={assignee.name}
                >
                  {assignee.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {assignees.length > 3 && (
                <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium">
                  +{assignees.length - 3}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
