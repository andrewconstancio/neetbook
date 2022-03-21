import _ from 'lodash';

export default (state = 0, action) => {
    switch (action.type) {
        case "FETCH_COMMENTS": 
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default: 
            return state;
    }
}