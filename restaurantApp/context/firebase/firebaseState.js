import React, { useReducer } from 'react';

import firebase from '../../firebase/index';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import { GET_PLATES_SUCCESS } from '../../types';
import _ from 'lodash';

const FirebaseState = props => {
    // Crear state inicial
    const initialState = {
        menu: []
    }

    // useReducer para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    // Function to get the plates
    const getPlates = () => {

        // Consultar firebase
        firebase.db.collection('plates')
            .where('existence', '==', true)
            .onSnapshot(manageSnapshot)

        function manageSnapshot(snapshot) {
            let plates = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // Ordenar con lodash
            plates = _.sortBy(plates, 'category');

            dispatch({
                type: GET_PLATES_SUCCESS,
                payload: plates
            });
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                getPlates
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;