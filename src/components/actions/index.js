export const insertBook = formValues => async (dispatch, getState, { getFirebase, getFirestore}) => {
    // const { userId } = getState().auth;
    // const response = await streams.post('/streams', { ...formValues, userId });
    console.log(formValues.coverImage);

    const firestore = getFirestore();
    firestore.collection('books').add({
        author: formValues.author,
        description: formValues.description,
        title: formValues.title,
        coverImgURL: formValues.coverImage,
        type: "new",
        year: formValues.year,
        createdAt: new Date()
    }).then(() => {
        const data = "hey"
        dispatch({ type: "INSERT_BOOK", payload: data });
    }).catch((err) => {
        dispatch({ type: "INSERT_BOOK_ERROR", payload: err });
    })

};
