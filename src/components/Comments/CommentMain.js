import React, {useState, useEffect } from 'react'
import NotesInput from '../../old/NotesInput';
import {
    Heading,
    Button,
    Textarea
} from "@chakra-ui/react"
import Comment from './Comment';

const CommentMain = ( {bookEditionKey, comments, getComments} ) => {
    return (
        <div>
            {comments.map((com, i) => {
                console.log("MAPPED: " + i)
                return (
                    <Comment key={i} uid={com.data().uid} bookEditionKey={bookEditionKey} docRef={com.ref} getComments={getComments} value={com.data().notes} />
                )
            })}
        </div>
    )
}


export default CommentMain