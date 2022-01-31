export const getBooks = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {


        console.log(getFirestore);

        // const userCollectionRef = await getFirebase.firestore.collection("books");
        // console.log(userCollectionRef);
        // const data = firestore.getDocs(userCollectionRef);
        
        const data = "hey"
        console.log(data);

        dispatch( {type: "GET_BOOKS", payload: data} );
    }
}