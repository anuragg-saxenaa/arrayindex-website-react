import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Tools from './pages/Tools'
import Contact from './pages/Contact'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import InvoiceGenerator from './pages/InvoiceGenerator'
import Navbar from './components/Navbar'
import { AdminAuthProvider } from './context/AdminAuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/invoice" 
              element={
                <ProtectedRoute>
                  <InvoiceGenerator />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </AdminAuthProvider>
  )
}

export default App 