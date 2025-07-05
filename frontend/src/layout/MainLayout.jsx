import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { logout } from '../redux/features/auth/authSlice'
import { Menu } from 'lucide-react'

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Topbar */}
        <header className="w-full px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
          {/* Sidebar toggle on small screens */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn btn-square btn-ghost md:hidden text-gray-600 hover:text-primary-green"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 max-w-full bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
