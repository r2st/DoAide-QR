import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import QRGenerator from './pages/QRGenerator'
import Scanner from './pages/Scanner'
import Bulk from './pages/Bulk'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Embed from './pages/Embed'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/qr/:type" element={<QRGenerator />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/bulk" element={<Bulk />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/embed" element={<Embed />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
