import * as React from 'react'
import { Box, ResponsiveContext } from 'grommet'

// const AppBar = (props) => (
//     <Box
//         tag='header'
//         direction='row'
//         align='center'
//         justify='between'
//         background='brand'
//         pad={{ left: 'medium', right: 'small', vertical: 'small' }}
//         elevation='medium'
//         style={{ zIndex: '1' }}
//         {...props}
//     />
// );

// export { AppBar }

export default function AppBar(props) {
    return (
        <Box
            tag='header'
            direction='row'
            align='center'
            justify='between'
            background='brand'
            pad={{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation='medium'
            style={{ zIndex: '1' }}
            {...props}
        />
    )
}

