import React, { Component } from 'react';
import {
    Input,
    Heading
  } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Field, reduxForm } from 'redux-form';
import './css/NewBookForm.css'
import FireInput from './FileInput'
import { insertBook } from '../actions';
import { connect } from 'react-redux';
import { storage } from '../../config/firebase-config'


class NewBook extends Component {

    state = {
        selectedFile: null,
        progress: 0
    }

    onSubmit = formValues => {
        this.uploadImage(formValues.coverImage, formValues)
    };

    uploadImage(image, formValues) {
        const uploadTask = storage.ref(`book_covers/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({progress: progress});
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("book_covers")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        formValues.coverImage = url;
                        this.props.insertBook(formValues);
                    }); 
            }
        )
    }

    renderError({ error, touched }) {
        if (touched && error) {
          return (
            <div className="ui error message">
              <div className="header">{error}</div>
            </div>
          );
        }
      }

    renderInput = ( {input, label, meta} ) => {
        const className = `field ${input.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <Input onChange={input.onChange} placeholder={label} value={input.value} autoComplete="off" />
                {this.renderError(meta)}
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
                    {/* <progress value={this.state.progress} max="100" /> */}
                    <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} mt={10}>
                        <GridItem className='container' rowSpan={20} colSpan={2}>
                            <Field name="coverImage" component={FireInput} label="Cover Image" />
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
                            <button className="cancel-bttn">Cancel</button>
                            <button className="submit-bttn">Submit</button>
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

    if (!formValues.author) {
        errors.description = 'You must enter a author';
    }

    if (!formValues.year) {
        errors.description = 'You must enter a year';
    }

    if (!formValues.coverImage) {
        errors.description = 'You must enter a Cover Image';
    }

    return errors;
};

const formWrapped = reduxForm({
    form: 'NewBook',
    validate
})(NewBook);

export default connect(
    null,
    { insertBook }
)(formWrapped);
