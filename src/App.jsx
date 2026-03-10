import { useSelector } from 'react-redux'
import Signup from './pages/Signup'
import Feed from './components/Feed'

function App() {
  const { username } = useSelector((state) => state.user)
  
  if (!username) {
    return <Signup />
  }

  return (
    <div className="app-container">
      <header style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '27px 37px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        <h1 style={{ fontSize: '22px' }}>CodeLeap Network</h1>
      </header>
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'var(--secondary-color)',
        minHeight: 'calc(100vh - 80px)',
        padding: '24px'
      }}>
        <Feed />
      </main>
    </div>
  )
}

export default App
