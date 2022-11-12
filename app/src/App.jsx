import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import { useUser, useNotes } from './hooks'
import { Notes, Login, Home, Users } from './pages'
import { NoteDetail, LoggedUserInfo } from './components'
import * as S from './App.styles'

const App = () => {
  const { user } = useUser()
  const { notes } = useNotes()

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading contents...</div>}>
        <header>
          <S.Link to='/' style={{ padding: '10px' }}>Home</S.Link>
          <S.Link to='/users' style={{ padding: '10px' }}>Users</S.Link>
          <S.Link to='/notes' style={{ padding: '10px' }}>Notes</S.Link>
          {user ? <LoggedUserInfo user={user} /> : <S.Link to='/login' style={{ padding: '10px' }}>Login</S.Link>}
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={<Login />}
            loader={() => {
              if (user) redirect('notes')
            }}
          />
          <Route path='users/' element={<Users />} />
          <Route path='notes' element={<Notes />}>
            <Route path=':id' element={<NoteDetail notes={notes} />} />
          </Route>
          <Route path='*' element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export { App }

/**
 * Creating a Router in a React application without using React Router
 *
 * Problem of this approach: Not declarative (Imperative)
 */

// import { useState } from 'react'

// const Notes = () => <h1>Notes</h1>
// const Home = () => <h1>Home</h1>
// const Users = () => <h1>Users</h1>

// const App = () => {
//   const [page, setPage] = useState(() => {
//     const { pathname } = window.location
//     return pathname.slice(1)
//   })

//   const getContent = () => {
//     if (page === 'home') {
//       return <Home />
//     } else if (page === 'users') {
//       return <Users />
//     } else {
//       return <Notes />
//     }
//   }

//   const toPage = page => event => {
//     event.preventDefault()

//     window.history.pushState(null, '', `/${page}`)
//     setPage(page)
//   }

//   return (
//     <div>
//       <header>
//         <a href='#' onClick={toPage('home')} style={{ padding: '10px' }}>Home</a>
//         <a href='#' onClick={toPage('users')} style={{ padding: '10px' }}>Users</a>
//         <a href='#' onClick={toPage('notes')} style={{ padding: '10px' }}>Notes</a>
//       </header>
//       {getContent()}
//     </div>
//   )
// }

// export { App }
