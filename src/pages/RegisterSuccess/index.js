import * as React from 'react'
import { Box, Heading, Text, Button } from 'grommet'
import { Link } from 'react-router-dom'

export default function RegisterSuccess() {
    return (
        <Box fill align='center' justify='center'>
            <Box width='medium'>
                <Heading color='brand' level={3}>Pendaftaran berhasil.</Heading>
                <Text size='medium'>Silakan masuk ke aplikasi.</Text>
                <Link to='/login'>
                    <Button label='masuk' primary />
                </Link>
            </Box>
        </Box>
    )
}