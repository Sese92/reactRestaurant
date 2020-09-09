import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

const NewPlate = () => {

    const [uploading, saveUploading] = useState(false)
    const [progress, saveProgress] = useState(0)
    const [urlimage, saveUrlimage] = useState('')

    // Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            category: '',
            image: '',
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'The plate`s name have to be at least of 3 characters')
                .required('The name of the plate is mandatory'),
            price: Yup.string()
                .min(1, 'The plates have to have a price')
                .required('The price of the plate is mandatory'),
            category: Yup.string()
                .required('The category of the plate is mandatory'),
            description: Yup.string()
                .min(10, 'The plates description have to have at least 10 characters')
                .required('The description of the plate is mandatory')
        }),
        onSubmit: newPlate => {
            try {
                newPlate.existence = true;
                newPlate.image = urlimage;
                firebase.db.collection('plates').add(newPlate);

                navigate('/Menu')
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleUploadStart = () => {
        saveProgress(0);
        saveUploading(true);
    }

    const handleUploadError = error => {
        saveUploading(false);
        console.log(error)
    }

    const handleUploadSuccess = async name => {
        saveProgress(100)
        saveUploading(false)

        const url = await firebase
            .storage
            .ref('plates')
            .child(name)
            .getDownloadURL();

        console.log(url)
        saveUrlimage(url)
    }

    const handleProgress = progress => {
        saveProgress(progress)
        console.log(progress)
    }


    return (
        <>
            <h1 className="text-3xl font-light mb-4">New Plate</h1>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Plate name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                            <input
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="number"
                                placeholder="Price"
                                min="0"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.price && formik.errors.price ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.price}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                            <select
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Select the category --</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="drinks">Drinks</option>
                                <option value="desserts">Desserts</option>
                                <option value="salad">Salads</option>
                            </select>
                        </div>
                        {formik.touched.category && formik.errors.category ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.category}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                            <FileUploader
                                accept="image/*"
                                id="image"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage.ref("plates")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>

                        {uploading && (
                            <div className="h-4 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{ width: `${progress}%` }}>
                                    {progress} %
                                </div>
                            </div>
                        )}

                        {urlimage && (
                            <p className="bg-green-500 text-white p-3 text-center my-5">
                                The image has been uploaded
                            </p>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                            <textarea
                                className="h-40 shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                placeholder="Description of the plate"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </textarea>
                        </div>
                        {formik.touched.description && formik.errors.description ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.description}</p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Add plate"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPlate;