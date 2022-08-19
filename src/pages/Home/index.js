import * as React from 'react'
import { 
    Box, 
    Button, 
    Heading, 
    Sidebar, 
    Collapsible, 
    Nav, 
    Stack, 
    Text, 
    ResponsiveContext, 
    Layer, 
    Grid,
    Card
} from 'grommet'
import { FormClose } from 'grommet-icons' 
import { 
    Menu,
    Analytics,
    Chat,
    Clock,
    Configure,
    Help,
    Projects,
    Split,
    StatusInfoSmall,
} from 'grommet-icons'
import AppBar from '../../components/AppBar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SidebarButton = ({ icon, label, ...rest }) => (
    <Button 
        hoverIndicator
        {...rest}
        plain
    >
        <Box align='center' pad={{ horizontal: 'medium', vertical: 'small' }}>
            {icon} <Text>{label}</Text>
        </Box>
    </Button>
    // <Box pad='small'>
    //     <Button 
    //         gap='medium'
    //         alignSelf='start'
    //         plain
    //         icon={icon}
    //         label={label}
    //         {...rest}
    //     />
    // </Box>
)

const MainNavigation = () => (
    <Nav gap='medium' responsive={false}>
        <SidebarButton icon={<StatusInfoSmall />} label='Semua' hoverIndicator />
        <SidebarButton icon={<Projects />} label="Utama" hoverIndicator />
        <SidebarButton icon={<Clock />} label="Minuman" hoverIndicator />
        <SidebarButton icon={<Split />} label="Snack" hoverIndicator />
        <SidebarButton icon={<Analytics />} label="Pastri" hoverIndicator />
    </Nav>
)

export default function Home() {
    const [showSidebar, setShowSidebar] = React.useState(true)
    let auth = useSelector(state => state.auth)
    return (
        <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
        >
            <Box
                gridArea='header'
                direction='row'
                align='center'
                justify='between'
                pad={{horizontal: 'medium', vertical: 'small'}}
                background='brand'
            >
                <Heading level='3' margin='none'>
                    <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
                    Foodstore
                </Heading>
                <Link to={auth?.user ? '/account' : '/login'} >
                    {auth?.user ? auth.user.full_name : 'Login'}
                </Link>
            </Box>
            {showSidebar && (
                <Box
                    gridArea='sidebar'
                    background='light-2'
                    width='small'
                    animation={[
                        { type: 'fadeIn', duration: 300 },
                        { type: 'slideRight', size: 'xlarge', duration: 150 }
                    ]}
                >
                    <ResponsiveContext.Consumer>
                        {size => (
                            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                                {(!showSidebar || size !== 'small') ? (
                                <Collapsible direction="horizontal" open={showSidebar}>
                                    <Box
                                    flex
                                    width='small'
                                    background='light-2'
                                    elevation='small'
                                    align='center'
                                    justify='center'
                                    >
                                        <Sidebar 
                                            background='light-2'
                                            pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
                                        >
                                            <MainNavigation />
                                        </Sidebar>
                                    </Box>
                                </Collapsible>
                                ): (
                                <Layer>
                                    <Box
                                        background='light-2'
                                        tag='header'
                                        justify='end'
                                        align='center'
                                        direction='row'
                                    >
                                        <Button
                                            icon={<FormClose />}
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </Box>
                                    <Box
                                        fill
                                        background='light-2'
                                        align='center'
                                        justify='center'
                                    >
                                        <Sidebar 
                                            background='light-2'
                                            pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
                                        >
                                            <MainNavigation />
                                        </Sidebar>
                                    </Box>
                                </Layer>
                                )}
                            </Box>
                        )}
                    </ResponsiveContext.Consumer>
                </Box>
            )}
            <Box gridArea='main'>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Grid 
                            columns={['1/2', '1/2']}
                            fill
                        >
                            <Box flex background="light-5">
                                {size}
                            </Box>

                            <Box background="light-2">
                                <Grid columns={size !== 'small' ? 'small': '100%'}>
                                    <Card pad='large'>
                                        hola
                                    </Card>
                                </Grid>
                            </Box>
                        </Grid>  
                    )}
                </ResponsiveContext.Consumer>
            </Box>
        </Grid>
        // <Box fill>
        //     <AppBar>
        //         <Heading level='3' margin='none'>
        //             <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
        //             Foodstore
        //         </Heading>
        //         <Link to={auth?.user ? '/account' : '/login'} >
        //             {auth?.user ? auth.user.full_name : 'Login'}
        //         </Link>
        //     </AppBar>
        //     <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        //         <ResponsiveContext.Consumer>
        //             {size => (
        //                 <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        //                     {(!showSidebar || size !== 'small') ? (
        //                     <Collapsible direction="horizontal" open={showSidebar}>
        //                         <Box
        //                         flex
        //                         width='small'
        //                         background='light-2'
        //                         elevation='small'
        //                         align='center'
        //                         justify='center'
        //                         >
        //                             <Sidebar 
        //                                 background='light-2'
        //                                 pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
        //                             >
        //                                 <MainNavigation />
        //                             </Sidebar>
        //                         </Box>
        //                     </Collapsible>
        //                     ): (
        //                     <Layer>
        //                         <Box
        //                             background='light-2'
        //                             tag='header'
        //                             justify='end'
        //                             align='center'
        //                             direction='row'
        //                         >
        //                             <Button
        //                                 icon={<FormClose />}
        //                                 onClick={() => setShowSidebar(false)}
        //                             />
        //                         </Box>
        //                         <Box
        //                             fill
        //                             background='light-2'
        //                             align='center'
        //                             justify='center'
        //                         >
        //                             <Sidebar 
        //                                 background='light-2'
        //                                 pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
        //                             >
        //                                 <MainNavigation />
        //                             </Sidebar>
        //                         </Box>
        //                     </Layer>
        //                     )}
        //                 </Box>
        //             )}
        //         </ResponsiveContext.Consumer>
        //         {/* <Collapsible direction="horizontal" open={showSidebar}>
        //             <Box 
        //                 flex
        //                 direction='row'
        //                 height={{min: '100%'}}
        //             >
        //                 <Sidebar 
        //                     background='light-2'
        //                     pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
        //                 >
        //                     <MainNavigation />
        //                 </Sidebar>
        //             </Box>
        //         </Collapsible>  */}
        //         <Grid
        //             columns={{
        //                 count: 2,
        //                 size: 'auto'
        //             }}
        //         >
        //             <Box flex align='center' justify='center'>
        //                 box 2
        //             </Box>
        //             <Box flex align='center' justify='center'>
        //                 <ResponsiveContext.Consumer>
        //                     {size => (
        //                         `Text size ${size}`
        //                     )}
        //                 </ResponsiveContext.Consumer>
        //             </Box>
        //         </Grid>
        //     </Box>
        // </Box>
    )
}