import * as React from 'react'
import { 
    Box,
    Form,
    Button,
    FormField,
    TextInput
} from 'grommet'
import { useForm } from 'react-hook-form'
import StoreLogo from '../../components/StoreLogo'
import { useDispatch } from 'react-redux/es/exports'
import { useNavigate, Link } from 'react-router-dom'
import { userLogin } from '../../features/Auth/actions'
import { rules } from './validation'
import { login } from '../../api/auth'

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Login() {
    let { register, setError, formState: { errors }, handleSubmit } = useForm()
    let [ status, setStatus ] = React.useState(statusList.idle)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async ({email, password}) => {
        setStatus(statusList.process)
        let { data } = await login(email, password)
        if (data.error) {
            setError('password', { type: 'invalidCredential', message: data.message })
            setStatus(statusList.error)
        } else {
            let { user, token } = data
            dispatch(userLogin(user, token))
            navigate('/', { replace: true })
        }
        setStatus(statusList.success)
    }

    return (
        <Box fill align='center' justify='center'>
            <Box width='medium'>
                <StoreLogo />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormField name='email' label='Email' error={errors.email?.message}>
                        <TextInput
                            name='email'
                            placeholder='Email'
                            { ...register('email', rules.email) }
                        />
                    </FormField>
                    <FormField name='password' label='Password' error={errors.password?.message}>
                        <TextInput
                            name='password'
                            type='password'
                            placeholder='masukkan password'
                            {...register('password', rules.password)}
                        />
                    </FormField>
                    <Box direction='row'>
                        <Button
                            type='submit'
                            label='Masuk'
                            disabled={ status === statusList.process }
                            primary
                        />
                    </Box>
                </Form>
                <div className="text-center mt-2">
                    Belum punya akun? <Link to="/register"> <b> Daftar Sekarang. </b> </Link>
                </div>
            </Box>
        </Box>
    )
}