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
    Card,
    CardBody,
    CardFooter,
    Image,
    Pagination,
    Spinner,
    TextInput
} from 'grommet'
import {
    Basket, 
    FormClose,
    Menu,
    Search
} from 'grommet-icons'
import AppBar from '../../components/AppBar'
import { useDispatch, useSelector } from 'react-redux'
import { config } from '../../config'
import { 
    fetchProducts,
    setPage,
    setKeyword,
    setCategory
} from '../../features/Products/actions'
import { addItem } from '../../features/Cart/actions'
import { Link } from 'react-router-dom'
import menus from './menus'
import Cart from '../../components/Cart'
import { useNavigate } from 'react-router-dom'

const SidebarButton = ({ icon, label, handleClick, ...rest }) => (
    <Button 
        hoverIndicator
        {...rest}
        plain
        onClick={handleClick}
    >
        <Box align='center' pad={{ horizontal: 'medium', vertical: 'small' }}>
            {icon} <Text>{label}</Text>
        </Box>
    </Button>
)

const MainNavigation = () => (
    <Nav gap='medium' responsive={false}>
        {menus.map((menu, id) => {
            return <SidebarButton 
                key={id} 
                icon={menu.icon} 
                label={menu.label}
            />
        })}
    </Nav>
)

export default function Home() {
    const [showSidebar, setShowSidebar] = React.useState(true)
    let auth = useSelector(state => state.auth)
    let dispatch = useDispatch()
    let products = useSelector(state => state.products)
    let carts = useSelector(state => state.cart)
    let navigate = useNavigate()
    let [ active, setActive ] = React.useState()

    const handleChange = ({page}) => {
        dispatch(setPage(page))
        // console.log(products);
    }

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, products.currentPage, products.keyword, products.category])

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
                                            {/* <MainNavigation /> */}
                                            <Nav gap='medium' responsive={false}>
                                                {menus.map((menu, id) => {
                                                    return <SidebarButton 
                                                        key={id} 
                                                        icon={menu.icon} 
                                                        label={menu.label}
                                                        handleClick={() => dispatch(setCategory(menu.id))}
                                                    />
                                                })}
                                            </Nav>
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
                                            <Nav gap='medium' responsive={false}>
                                                {menus.map((menu, id) => {
                                                    return <SidebarButton 
                                                        key={id} 
                                                        icon={menu.icon} 
                                                        label={menu.label}
                                                        handleClick={() => {dispatch(setCategory(menu.id)); setActive(menu.label)}}
                                                    />
                                                })}
                                            </Nav>
                                        </Sidebar>
                                    </Box>
                                </Layer>
                                )}
                            </Box>
                        )}
                    </ResponsiveContext.Consumer>
                </Box>
            )}

            {products.status === 'process' && !products.data.length ? 
                <Layer>
                    <Box
                        align="center"
                        justify="center"
                        gap="small"
                        direction="row"
                        alignSelf="center"
                        pad="large"
                    >
                        <Spinner />
                        <Text>Loading...</Text>
                    </Box>
                </Layer>
            : null}

            <Box gridArea='main'>
                <Grid columns={['1/1']}>
                    <Box fill align='left' justify='start' pad='small'>
                        <Box width='50%'>
                            <TextInput 
                                icon={<Search />} 
                                value={products.keyword}
                                placeholder="Cari menu favoritmu..."
                                onChange={event => dispatch(setKeyword(event.target.value))}
                            />
                        </Box>
                    </Box>
                </Grid>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Grid 
                            columns={['1/2', '1/2']}
                            fill
                        >
                            <Box background="light-2" pad='small'>
                                <Grid gap='small' columns={size !== 'small' ? 'small': '100%'}>
                                    {products.data.map((product, index) => {
                                        return <Card
                                            key={index}
                                            elevation='large' 
                                            width='medium'
                                            style={{background: 'light-2'}}
                                        >
                                            <CardBody height='small'>
                                                <Image 
                                                    fit='cover'
                                                    src={`${config.api_host}/upload/${product.image_url}`}
                                                    a11yTitle='fdfd'
                                                />
                                            </CardBody>
                                            <Box pad={{ horizontal: 'medium' }} responsive={false}>
                                                <Heading level={3} margin={{ vertical: 'small' }}>
                                                    {product.name}
                                                </Heading>
                                            </Box>
                                            <CardFooter pad='small'>
                                                <Box
                                                    direction='row'
                                                    align='center'
                                                    gap='small'
                                                >
                                                    <Button onClick={_ => dispatch(addItem(product))} icon={<Basket />} hoverIndicator />
                                                    <Heading level={4}>
                                                        Rp. {product.price},-
                                                    </Heading>
                                                </Box>
                                            </CardFooter>
                                        </Card>
                                    })}
                                </Grid>
                                <Box align='center' direction='row' margin={{top: 'medium'}}>
                                    <Pagination numberItems={products.totalItems} onChange={handleChange} page={products.currentPage} />
                                </Box>
                            </Box>
                            
                            <Box background="light-2" pad='small'>
                                <Grid gap='small' columns={size !== 'small' ? 'small': '100%'}>
                                    <Cart 
                                        items={carts}
                                        onCheckout={_ => navigate('/checkout')}
                                    />
                                </Grid>
                            </Box>
                        </Grid>  
                    )}
                </ResponsiveContext.Consumer>
            </Box>
        </Grid>
    )
}