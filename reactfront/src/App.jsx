import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ShowBlogs } from './components/ShowBlogs'
import { CreateBlog } from './components/CreateBlog'
import { EditBlog } from './components/EditBlog'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowBlogs />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/edit/:id' element={<EditBlog />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
