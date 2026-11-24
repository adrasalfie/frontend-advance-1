import TextField from '../molecules/TextField.jsx'
import SelectField from '../molecules/SelectField.jsx'
import PhoneField from '../molecules/PhoneField.jsx'
import PasswordField from '../molecules/PasswordField.jsx'
import ForgotPasswordLink from '../molecules/ForgotPasswordLink.jsx'
import AuthActions from '../molecules/AuthActions.jsx'
import useForm from '../../hooks/useForm.js'
import { validateRegister } from '../../utils/validators.js'
import { GENDER_OPTIONS } from '../../data/countryCodes.js'

export default function RegisterForm({ onSubmit, onSso }) {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      fullName: '',
      email: '',
      gender: GENDER_OPTIONS[0].value,
      dialCode: '+62',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegister,
    onSubmit,
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        id="register-name"
        name="fullName"
        label="Nama Lengkap"
        required
        autoComplete="name"
        value={values.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />
      <TextField
        id="register-email"
        name="email"
        type="email"
        label="E-Mail"
        required
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        id="register-gender"
        name="gender"
        label="Jenis Kelamin"
        required
        options={GENDER_OPTIONS}
        value={values.gender}
        onChange={handleChange}
        error={errors.gender}
      />
      <PhoneField
        id="register-phone"
        name="phone"
        label="No. Hp"
        required
        autoComplete="tel-national"
        dialCode={values.dialCode}
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <PasswordField
        id="register-password"
        name="password"
        label="Kata Sandi"
        required
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="flex flex-col gap-3">
        <PasswordField
          id="register-confirm-password"
          name="confirmPassword"
          label="Konfirmasi Kata Sandi"
          required
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <ForgotPasswordLink />
      </div>

      <AuthActions
        primaryLabel="Daftar"
        secondaryLabel="Masuk"
        secondaryTo="/login"
        ssoLabel="Daftar dengan Google"
        onSso={onSso}
      />
    </form>
  )
}
