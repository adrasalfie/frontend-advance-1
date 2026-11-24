import TextField from '../molecules/TextField.jsx'
import PasswordField from '../molecules/PasswordField.jsx'
import ForgotPasswordLink from '../molecules/ForgotPasswordLink.jsx'
import AuthActions from '../molecules/AuthActions.jsx'
import useForm from '../../hooks/useForm.js'
import { validateLogin } from '../../utils/validators.js'

export default function LoginForm({ onSubmit, onSso }) {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validate: validateLogin,
    onSubmit,
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        id="login-email"
        name="email"
        type="email"
        label="E-Mail"
        required
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className="flex flex-col gap-3">
        <PasswordField
          id="login-password"
          name="password"
          label="Kata Sandi"
          required
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <ForgotPasswordLink />
      </div>

      <AuthActions
        primaryLabel="Masuk"
        secondaryLabel="Daftar"
        secondaryTo="/register"
        ssoLabel="Masuk dengan Google"
        onSso={onSso}
      />
    </form>
  )
}
