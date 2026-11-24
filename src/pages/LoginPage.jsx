import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/organisms/AuthCard.jsx'
import LoginForm from '../components/organisms/LoginForm.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const goHome = () => navigate('/')

  return (
    <AuthCard title="Masuk ke Akun" subtitle="Yuk, lanjutin belajarmu di videobelajar.">
      <LoginForm onSubmit={goHome} onSso={goHome} />
    </AuthCard>
  )
}
