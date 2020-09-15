import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { ME,QUERY_PRODUCTS  } from '../gql/gql_query'
import { CREATE_PRODUCT } from '../gql/gql_mutation'
import fetch from 'isomorphic-unfetch'
import UserProducts from './UserProducts'

const ManageProduct = () => {
    const [file, setFile] = useState(null)
    const [fileName,setFileName] = useState(null)
    const [success, setSuccess] = useState(false)
    const [productData, setProductData] = useState({
        description: '',
        imageUrl: '',
        price:''
    })

    const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
        onCompleted: data => {
            // console.log('show data:',data)
            setSuccess(true)
            setProductData(data.createProduct)
        },
        refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }],
        fetchPolicy:'no-cache'
    })

    const handleChange = e => setProductData({
        ...productData,
        [e.target.name]: e.target.value
    })

    const selectFile = e => {
        const files = e.target.files
        // console.log(files)
        setFile(files[0])
		setFileName(files[0].name)
    }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'graphql-whitecanze-dev')
        // console.log('data:',data)
        const res = await fetch('https://api.cloudinary.com/v1_1/whitecanze-dev/image/upload',
            {
                method: 'post',
                body: data
            }
        )

        const result = await res.json()
        // console.log('result:',result)
        return result.secure_url
    }

    const hideAlert = () => {
        setTimeout(() => {
            $('.alert').fadeOut('slow')
        },3000)
    }
    const handleSubmit = async e => {
        try {
            hideAlert()
            e.preventDefault()
            const url = await uploadFile()
            // console.log('url:',url)
            if (url) {
                const result = await createProduct({
                    variables: {
                        ...productData,imageUrl: url,
                        price: +productData.price
                    }
                })
                // console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <div
            style={{
                margin: "100px",
                textAlign:"center"
            }}
        >
            <div>
                {success && (
                    <div className="alert alert-success" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        Add new product success
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        {error.graphQLErrors[0]?error.graphQLErrors[0].message:''}
                    </div>
                )}
                {(!productData.description || !file || !productData.price) &&
                    <div className="alert alert-warning" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        ❗❗❗ Please fill all in required fields.
                    </div>
                }
                

            </div>

            <h1 style={{
                fontSize: "5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                
            }}>add new product</h1>
            
            <form
                style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                marginTop: "100px",
                width: "30%"
                }}
                onSubmit={handleSubmit}
            >
                
                <input
                    className="form-control"  
                    style={{margin:"15px 0"}}
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={productData.description}
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    style={{margin:"15px 0"}}
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={productData.price}
                    onChange={handleChange}
                />
                <div className="form-file"
                    style={{margin:"15px 0"}}
                >
                    <input
                        type="file"
                        className="form-file-input"
                        name="file"
                        onChange={selectFile}
                    />
                    <label className="form-file-label" htmlFor="customFile">
                        <span className="form-file-text">{file?fileName:'Choose file...'}</span>
                        <span className="form-file-button">Browse</span>
                    </label>
                </div>
                <button
                    style={{
                        margin: "15px 0",
                        padding: "10px",
                        background: "teal",
                        color: "white",
                        border: "none",
                        cursor: !productData.description ||
                                !file ||
                                !productData.price ||
                                loading ?"not-allowed" :"pointer",
                        fontSize: "18px"
                    }}
                    type="submit"
                    disabled={
                        !productData.description ||
                        !file ||
                        !productData.price ||
                        loading
                    }
                >
                Submit{loading ? 'ting...': ''}
                </button>
            </form>
            {loading && (
                    <div style={{
                        width: "500px",
                        height: "auto",
                        display: "flex",
                        flexDirection:"row",
                        position: "fixed",
                        bottom: "1%",
                        left: "1%"
                    }} role="status"><span style={{
                            width: "3rem",
                            height: "3rem"
                        }} className="spinner-grow text-info spinner-grow-sm" role="status" aria-hidden="true"></span>
                        <h4 style={{
                            marginTop: "10px",
                            marginLeft: "10px"
                    }}>Loading...</h4></div>
                )}
            </div>
            <UserProducts />
        </>
    )
    }

export default ManageProduct