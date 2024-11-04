import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import UserDirectory from './components/UserDirectory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-800">User Management</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    <Users className="h-5 w-5 mr-1" />
                    Directory
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    <UserPlus className="h-5 w-5 mr-1" />
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<UserDirectory />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;