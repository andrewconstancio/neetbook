import React, { useState } from 'react'
import {
    Button,
} from "@chakra-ui/react"

const ReadButton = () => {
    const [hasRead, setHasRead] = useState(false);

    return (
        <>
            <Button onClick={() => setHasRead(hasRead ? false : true)} colorScheme={hasRead ? "teal" : "grey"} size='md' w={{ base: '100%', sm: '100%' }} variant={hasRead ? "solid" : "outline"}>
                <i className="fa-solid fa-book-open"></i>
                &nbsp;&nbsp;Read
            </Button>
        </>
    )
}

export default ReadButton
