import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    ButtonGroup,
    Button
  } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Field, reduxForm } from 'redux-form';
import './css/NewBookForm.css'


class NewBook extends Component {

    onSubmit = formValues => {
        console.log("submited");
    };

    renderInput = () => {
        
    }

    render() {
        return (
            <div className="center">
                <Heading as='h3' size='lg' mt={10}>Add Book</Heading>
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} mt={10}>
                        <GridItem className='container' rowSpan={20} colSpan={2} style={{border: "1px solid white", borderRadius: "20px"}}>
                            <input className='child' id="file_input" type="file" alt="Submit" />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormLabel htmlFor='Title'>Title</FormLabel>
                            <Input id='title' placeholder='Title' />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormLabel htmlFor='description'>Description</FormLabel>
                            <Input id='description' placeholder='description' />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormLabel htmlFor='description'>Author</FormLabel>
                            <Input id='description' placeholder='description' />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormLabel htmlFor='description'>Year</FormLabel>
                            <Input id='description' placeholder='description' />
                        </GridItem>
                        <GridItem rowSpan={5} colSpan={3}>
                            <ButtonGroup variant='outline' spacing='6' style={{float: "right"}}>
                                <Button colorScheme='blue'>Save</Button>
                                <Button>Cancel</Button>
                            </ButtonGroup>
                        </GridItem>
                    </Grid>
                </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'newBookForm',
    validate
})(NewBook);