import React from 'react'
import {
    Grid,
    GridItem,
    Heading
} from "@chakra-ui/react"
import CoverImagePreview from '../../components/CoverImagePreview'
import Rating from 'react-rating';


const BookPage = (props) => {
    return (
        <div className='center'>
            <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} mt={10}>
                <GridItem className='container' rowSpan={20} colSpan={2}>
                    <CoverImagePreview />
                </GridItem>
                <GridItem colSpan={3}>
                    <div>
                        <Heading as='h2' size='lg' style={{display: "inline-block"}}>DUNE</Heading>
                        <i>Rate this</i>
                        <Rating style={{float: "right"}} stop={10} />
                    </div>
                    <Heading as='h5' size='sm'>By Frank Herbert (1965)</Heading>
                </GridItem>
                <GridItem colSpan={3}>
                    <p>
                    Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...

When House Atreides is betrayed, the destruction of Paul's family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad'Dib, he will bring to fruition humankind's most ancient and unattainable dream.

A stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.
                    </p>
                </GridItem>
            </Grid>
        </div>
    )
}

export default BookPage