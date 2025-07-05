import React, { use } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUsers } from '../redux/features/users/userThunks'
import { getTasks } from '../redux/features/tasks/taskThunks'
import {
  LayoutDashboard,
  ClipboardList,
  KanbanSquare,
  PlusSquare,
  Users,
  LogOut,
  UserCircle,
  X,
  ChevronRight
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
  { name: 'Manage Tasks', icon: ClipboardList, path: '/app/tasks' },
  { name: 'Kanban', icon: KanbanSquare, path: '/app/kanban' },
  { name: 'Create Task', icon: PlusSquare, path: '/app/create' },
  { name: 'Team', icon: Users, path: '/app/team' },
]

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTasks());
  }, [dispatch])

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 h-full bg-white border-r border-gray-100 z-40
        transition-all duration-300 ease-in-out shadow-lg md:shadow-none
        w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}
    >
      {/* Close button only for mobile */}
      <div className="md:hidden flex justify-end p-4 border-b border-gray-100">
        <button 
          onClick={onClose} 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-primary-green"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-primary-green">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <KanbanSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Organiso</h2>
            <p className="text-green-100 text-sm">Task Management</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          {user?.profilePic ? (
            <div className="relative">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-xl object-cover border-2 border-primary-green shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          ) : (
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary-green flex items-center justify-center">
                <UserCircle className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                  isActive 
                    ? 'bg-primary-green text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-green'
                }`
              }
              onClick={onClose}
            >
              <div className={({ isActive }) => 
                `flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-white bg-opacity-20' 
                    : 'bg-gray-100 group-hover:bg-primary-green group-hover:text-white'
                }`
              }>
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{name}</span>
              <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                'group-hover:translate-x-1'
              }`} />
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
