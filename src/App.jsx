import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
// TODO: re-enable About page — temporarily disabled
// import About from './pages/About'
// TODO: re-enable Resources page — temporarily disabled
// import CbnAmlBaseline from './pages/CbnAmlBaseline'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TODO: re-enable About page — temporarily disabled */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* TODO: re-enable Resources page — temporarily disabled */}
          {/* <Route path="/resources/cbn-aml-baseline-standards" element={<CbnAmlBaseline />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
