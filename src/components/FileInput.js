import React, {Component} from 'react';
import CoverImagePreview from './CoverImagePreview';
import { BsFillPlusCircleFill } from "react-icons/bs";
import './NewBookForm.css';

export default class FieldFileInput  extends Component{
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }


    onChange(e) {
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])
        this.setState({fileSelected: e.target.files[0]})
    }

    triggerInputChange() {
        document.getElementById('fileInput').click()
    }

    render(){
        const { input: { value } } = this.props
        const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field

        return(
        <div>
            <div>
            <label>{label}</label>
                <input
                    id='fileInput'
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={this.onChange}
                    style={{display: "none"}}
                />
            </div>
            <div onClick={this.triggerInputChange} className="choose-image-outer" style={{display: this.state.fileSelected ? "none" : "block"}}>
                <BsFillPlusCircleFill className="plus-sign" />
            </div>
            <CoverImagePreview onClick={this.triggerInputChange} file={this.state.fileSelected} />
        </div>
        )
    }
}