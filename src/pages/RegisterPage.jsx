import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/organisms/AuthCard.jsx'
import RegisterForm from '../components/organisms/RegisterForm.jsx'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <AuthCard title="Pendaftaran Akun" subtitle="Yuk, daftarkan akunmu sekarang juga!">
      <RegisterForm onSubmit={() => navigate('/login')} onSso={() => navigate('/')} />
    </AuthCard>
  )
}
