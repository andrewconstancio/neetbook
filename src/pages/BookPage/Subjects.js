import React, { useState, useEffect } from 'react'
import SubjectButton from '../../components/SubjectButton';

const Subjects = ( {categories} ) => {
    const [subjects, setSubjects] = useState(null)

    const parseSubject = () => {
        var subsArr = [];
        categories.map((subject) => {
            var sub  = subject.split("/");
            sub.map((subs) => {
                subsArr.indexOf(subs.trim()) === -1 ? subsArr.push(subs.trim()) : "";
            })
        })
        setSubjects(subsArr);
    }

    useEffect(() => {
        parseSubject();
    }, [])


    if(!subjects) {
        return (
            <></>
        )
    }

    console.log(subjects)

    return (
        <>
            {subjects.map((subject) => {
                return (
                    <SubjectButton key={subject} subject={subject} />
                )
            })}
        </>
    )
}

export default Subjects
