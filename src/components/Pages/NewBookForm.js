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
import { BsFillPlusCircleFill } from "react-icons/bs";


class NewBook extends Component {

    state = {
        selectedFile: null
    }

    componentDidMount(){
        this.fileSelector = this.buildFileSelector();
    }

    onSubmit = formValues => {
        console.log(formValues);
        console.log("submited");
    };

    fileSelectedHandler = event => {

        console.log("it got here");

        var reader = new FileReader();
        var file = event.target.files[0];
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: [reader.result]
            })
        }.bind(this);
        console.log(url) // Would see a path?
        // TODO: concat files
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.click();
    }

    buildFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        fileSelector.setAttribute('onClick', this.fileSelectedHandler);
        return fileSelector;
    }

    renderInputImage = ( {input, label, meta} ) => {

        return (
            <>  
                <div onClick={this.handleFileSelect} className='containter'>
                    <BsFillPlusCircleFill className='child plus-sign' />
                    {/* <input onChange={this.fileSelectedHandler} type="file" name="file" id="file" className='inputfile child'/>
                    <label htmlFor="file">Choose a file</label> */}
                </div>
                {/* <input onChange={this.fileSelectedHandler} type="file" name="file" id="file" className='inputfile'/>
                <label htmlFor="file">Choose a file</label> */}
            </>
        );
    };

    renderInput = ( {input, label, meta} ) => {
        const className = `field ${input.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <Input onChange={input.onChange} placeholder={label} value={input.value} autoComplete="off" />
            </div>
        );
    };

    render() {
        return (
            <div className="center">
                <Heading as='h3' size='lg' mt={10}>Add Book</Heading>
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} mt={10}>
                        <GridItem className='container' rowSpan={20} colSpan={2}>
                            <Field name="coverImage" component={this.renderInputImage} label="coverImage" />
                            <div style={{width: "450px"}} >
                                <img style={{width: "inherit", borderRadius: "20px"}}  src={this.state.selectedFile} />
                            </div>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Field name="title" component={this.renderInput} label="Title" />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Field name="description" component={this.renderInput} label="Description" />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Field name="author" component={this.renderInput} label="Author" />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Field name="year" component={this.renderInput} label="Year" />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <button className="ui button primary">Submit</button>
                        </GridItem>
                    </Grid>

                </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    // if (!formValues.title) {
    //     console.log("err title");
    //     errors.title = 'You must enter a title';
    // }

    // if (!formValues.description) {
    //     console.log("err descrition");
    //     errors.description = 'You must enter a description';
    // }

    return errors;
};

export default reduxForm({
    form: 'NewBook',
    validate
})(NewBook);