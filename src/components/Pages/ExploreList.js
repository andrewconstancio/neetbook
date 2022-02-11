import React from 'react'

export const VideoList = ({ books }) => {
    const renderedList = books.map((book) => {
        return <VideoItem key={book.key} onVideoSelect={onVideoSelect} video={video} />
    })

    return (
        <div className='ui relaxed divided list'>
            {renderedList}
        </div>
    )
}