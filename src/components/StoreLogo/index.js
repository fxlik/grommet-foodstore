import * as React from 'react'
import { Link } from 'react-router-dom'
import { Heading } from 'grommet'
import { config } from '../../config'

export default function StoreLogo() {
    return (
        <Link to='/'>
            <Heading textAlign='center' color='#fffff' level={2}>{config.site_title}</Heading>
        </Link>
    )
}