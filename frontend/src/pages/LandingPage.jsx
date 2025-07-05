import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Kanban,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Kanban,
      title: "Visual Kanban Boards",
      description: "Drag and drop tasks between columns to visualize your workflow"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Assign tasks to team members and track progress together"
    },
    {
      icon: Target,
      title: "Priority Management",
      description: "Set priorities and due dates to focus on what matters most"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Never miss deadlines with intelligent due date tracking"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Get insights into your team's productivity and performance"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Tasks Completed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
            <Kanban className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary-green">Organiso</span>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary-green transition-colors duration-200 font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-primary-green text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-focus transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-primary-green rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              New: Advanced Analytics Dashboard
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Chaos into
              <span className="text-primary-green block">Clarity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Manage your projects, organize your tasks, and streamline your workflow — 
              all with a beautifully simple Kanban board that adapts to how you work best.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/register"
              className="bg-primary-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-focus transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-primary-green hover:text-primary-green transition-all duration-200 flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help teams work smarter, not harder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-green group"
              >
                <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-primary-green to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of teams already using TeamTasks to boost productivity
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
              <Kanban className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Organiso</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 Organiso. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
