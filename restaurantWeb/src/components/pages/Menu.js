import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Plate from '../ui/Plate';

const Menu = () => {

    const [plates, savePlates] = useState([])

    const { firebase } = useContext(FirebaseContext);


    // Consultar la bbdd al cargar el componente
    useEffect(() => {
        const getPlates = () => {
            firebase.db.collection('plates').onSnapshot(handleSnapshot);
        }
        getPlates();
    }, [])

    // Snapshot nos permite el tiempo real de firestore
    function handleSnapshot(snapshot) {
        const plates = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        savePlates(plates)
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menu</h1>
            <Link to="/NewPlate" className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Add new Plate
            </Link>

            {plates.map(plate => (
                <Plate
                    key={plate.id}
                    plate={plate}
                />
            ))}
        </>
    );
}

export default Menu;