export const getBooks = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // const firestore = getFirestore();
        // const userCollectionRef = firestore.collectioncollection("books");
        // const data = await firestore.getDocs(userCollectionRef);
        const data = "yo";
        dispatch( {type: "GET_BOOKS", payload: data} );
    }
}