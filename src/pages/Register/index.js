import * as React from 'react'
import { 
    Box,
    Button,
    Form,
    FormField,
    TextInput
} from 'grommet'
import { useForm } from 'react-hook-form'
import { rules } from './validation';
import { registerUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom'
import StoreLogo from '../../components/StoreLogo';

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Register() {
    let { register, setError, formState: { errors }, handleSubmit } = useForm();
    let [ status, setStatus ] = React.useState(statusList.idle)
    let navigate = useNavigate()
    const onSubmit = async FormData => {
        let { password, password_confirmation } = FormData
        if (password !== password_confirmation) {
            return setError('password_confirmation', {type: 'equality', message: 'Konfirmasi password tidak sesuai.'})
        }

        setStatus(statusList.process)

        let { data } = await registerUser(FormData)
        if (data.error) {
            let fields = Object.keys(data.fields)
            fields.forEach(field => {
                setError(field, {type: 'server', message: data.fields[field]?.properties.message})
            })
            setStatus(statusList.error)
            return 
        }
        setStatus(statusList.success)
        navigate("/register/berhasil", {replace: true})
        // alert(JSON.stringify(FormData))
    }
    return (
        <Box fill align='center' justify='center'>
            <Box width='medium'>
                {/* <Heading textAlign='center' color='brand' level={2}>Foodstore.</Heading> */}
                <StoreLogo />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormField name='full_name' label='Nama Lengkap' error={errors.full_name?.message}>
                        <TextInput 
                            name='full_name' 
                            placeholder='Nama Lengkap' 
                            {...register('full_name', rules.full_name)} 
                        />
                    </FormField>
                    <FormField name='email' label='Email' error={errors.email?.message}>
                        <TextInput 
                            name='email' 
                            placeholder='email' 
                            {...register('email', rules.email)}
                        />
                    </FormField>
                    <FormField name='password' label='Password' error={errors.password?.message}>
                        <TextInput 
                            name='password' 
                            placeholder='Password' 
                            type='password'
                            {...register('password', rules.password)}
                        />
                    </FormField>
                    <FormField name='password_confirmation' label='Konfirmasi Password' error={errors.password_confirmation?.message}>
                        <TextInput 
                            name='password_confirmation' 
                            type='password' 
                            placeholder='Konfirmasi Password'
                            {...register('password_confirmation', rules.password_confirmation)}
                        />
                    </FormField>
                    <Box direction='row'>
                        <Button 
                            type='submit'
                            disabled={status === statusList.process}
                            label={status === statusList.process ? 'Sedang memproses' : 'mendaftar'} 
                            primary 
                        />
                    </Box>
                </Form>
                <div className="text-center mt-2">
                    Sudah punya akun? <Link to="/login"> <b> Masuk Sekarang. </b> </Link>
                </div>

            </Box>
        </Box>
    )
}