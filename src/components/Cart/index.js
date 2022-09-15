import * as React from 'react'
import { config } from '../../config'
import { arrayOf, string, shape, oneOfType, number, func } from 'prop-types'
import { Card, CardBody, CardFooter, Image, Heading, Box, Button, Grid } from 'grommet'
import { Add, Subtract, LinkNext } from 'grommet-icons'

import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../../features/Cart/actions'

export default function Cart({items, onCheckout}) {
    let dispatch = useDispatch()
    let carts = useSelector(state => state.cart)
    return (
        <>
            <Grid columns={['1/1']}>
                <Box fill align='left' justify='start' pad='small'>
                    <Box>
                        <Button 
                            icon={<LinkNext />} 
                            label='Checkout' 
                            disabled={!items.length}
                            onClick={onCheckout}
                        />
                    </Box>
                </Box>
            </Grid>
            {!items.length ? <div className='text-center text-sm text-red-900'>Belum ada item di keranjang.</div> : null}
            
            {items.map((item, index) => {
            return (
                <Card
                    key={index}
                    elevation='large'
                    width='medium'
                    style={{ background: 'light-2' }}
                >
                    <CardBody height='small'>
                        <Image fit='cover' src={`${config.api_host}/upload/${item.image_url}`} a11yTitle='gambar product' />
                    </CardBody>
                    <Box pad={{ horizontal: 'medium' }} responsive={false}>
                        <Heading level={3} margin={{ vertical: 'small' }}>
                            {item.name}
                        </Heading>
                    </Box>
                    <CardFooter pad='small'>
                        <Box 
                            direction='row'
                            align='center'
                            gap='small'
                        >
                            <Button onClick={_ => dispatch(removeItem(item))} icon={<Subtract />} hoverIndicator />
                            <Heading level={4}>{item.qty}</Heading>
                            <Button onClick={_ => dispatch(addItem(item))} icon={<Add />} hoverIndicator />

                        </Box>
                    </CardFooter>
                </Card>
            )
            })}
        </>
    )
}

Cart.propTypes = {
    items: arrayOf(shape({
        _id: string.isRequired,
        name: string.isRequired,
        qty: oneOfType([string, number]).isRequired
    })),
    onCheckout: func
}
