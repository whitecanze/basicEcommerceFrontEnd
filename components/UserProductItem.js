import React,{useState,useEffect} from 'react'
import { motion } from "framer-motion"
import { useMutation } from "@apollo/react-hooks"
import { ME, QUERY_PRODUCTS } from '../gql/gql_query'
import {UPDATE_PRODUCT,DELETE_PRODUCT,DELETE_CART} from '../gql/gql_mutation'
import fetch from 'isomorphic-unfetch'

const UserProductItem = ({ product }) => {

	const [edit, setEdit] = useState(false)
    const [file,setFile] = useState(null)
    const [fileName,setFileName] = useState(null)

	const [productData, setProductData] = useState(product)
	
	useEffect(() => {
		setProductData(product)
	},[product])

    const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
		onCompleted: data => {
			console.log(data)
			setProductData(data.updateProduct)
			setEdit(false)
			// $('#' + productData.id).remove()
		},
		refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }],
		// fetchPolicy: 'no-cache',
	})
	
    const [deleteProduct, { delLoading, delError }] = useMutation(DELETE_PRODUCT, {
		onCompleted: data => {
			console.log(data)
			// setProductData(data.deleteProduct.id)
			setEdit(false)
		},
		refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }]
	})
	
	const [deleteCart, { delCartloading, delCarterror }] = useMutation(DELETE_CART, {
		onCompleted: data => {
			console.log(data)
		},
		refetchQueries: [{ query: ME }],
	})

    const handleChange = e => setProductData({
        ...productData,
        [e.target.name]: e.target.value
    })

    const selectFile = e => {
        const files = e.target.files
        // console.log(files)
		setFile(files[0])
		// console.log(files[0].name)
		setFileName(files[0].name)
    }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'graphql-whitecanze-dev')
		console.log('data:',data)
        const res = await fetch('https://api.cloudinary.com/v1_1/whitecanze-dev/image/upload',
            {
                method: 'post',
                body: data
            }
        )

        const result = await res.json()
        console.log('result:',result.secure_url)
        return result.secure_url
    }

    const hideAlert = () => {
        setTimeout(() => {
            $('.alert').fadeOut('slow')
        },3000)
    }
	const handleSubmit = async () => {
		if (!file && productData === product) {
			setProductData(product)
			setEdit(false)
			return
		}

		console.log(productData)

        try {
			hideAlert()
			if (file) {
				const url = await uploadFile()
				console.log(url)
				if (url) {
					await updateProduct({
						variables: {
							...productData,
							imageUrl: url,
							price: +productData.price
						}
					})
				}
			} else {
				await updateProduct({
						variables: {
							...productData,
							imageUrl: productData.imageUrl,
							price: +productData.price
						}
					})
			}
            
        } catch (error) {
            console.log(error)
        }
    }
	const handleRemoveProduct = async () => {
        try {
			hideAlert()

			await deleteProduct({
				variables: {
					id:productData.id
				}
			})
			await deleteCart({
				variables: {
					id: productData.id
				}
			})
        } catch (error) {
            console.log(error)
        }
	}
	
	const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div id={product.id}
            style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 2fr',
                width: '100%',
                borderTop:'solid 1px rgba(0,0,0,.7)',
                textAlign: 'center',
                padding:'5px 0'
			}}>
			
			{error || delError || delCarterror && (
                    <div className="alert alert-danger" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        {error.graphQLErrors[0]?error.graphQLErrors[0].message:''}
                    </div>
            )}

            <div style={{margin:'auto',display: 'grid',
                placeItems: 'center',
            }}>
                {!edit ?(
                    <p style={{
                    margin:"0"
                    }}>{productData.description}</p>
                ) : (
                    <input
                        className="form-control"
                        style={{margin:"5px"}}
                        type="text"
                        name="description"
						value={productData.description}
						onChange={handleChange}
                    />
                )}

            </div>
            <div style={{margin:'auto',display: 'grid',
                placeItems: 'center',}}>
				{!edit ? (
					<img
						src={productData.imageUrl}
						alt={productData.description}
						width='150px'
						height='150px'
					/>
				) : (
					<div className="form-file" style={{margin:"px"}}>
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
				)}
            </div>
			<div
				style={{
				margin: 'auto',
				display: 'grid',
				placeItems: 'center',
			}}>
				{!edit ? (
                	<p style={{margin:"0"}}>{numberWithCommas(parseInt(productData.price))}</p>
				) : (
					<input
						className="form-control"
						style={{margin:"15px 0"}}
						type="number"
						name="price"
						value={productData.price}
						onChange={handleChange}
					/>
				)}
			</div>
			{!edit ? (
					<div style={{
						margin: 'auto',
						display: 'grid',
						placeItems: 'center',
						gridTemplateColumns:'1fr'
					}}>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							style={{
								background: "green",
								color: "white",
								padding: "5px 10px",
								cursor: "pointer",
								border: 'none',
								borderRadius: '5px',
								outline: 'none',
							}}
							onClick={() => setEdit(true)}
						><i className="fas fa-edit"></i>&nbsp;EDIT</motion.button>
					</div>
				) : (
					<div style={{
						margin: 'auto',
						display: 'grid',
						placeItems: 'center',
						gridTemplateColumns:'1fr 1fr 1fr'
					}}>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							style={{
								background: "green",
								color: "white",
								padding: "5px 10px",
								cursor: "pointer",
								border: 'none',
								borderRadius: '5px',
								outline: 'none',
							}}
								onClick={handleSubmit}
								disabled={loading}
							>
								{loading ? <>
									<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
									&nbsp;Loading...
								</> : <>
									<i className="fas fa-check-circle"></i>&nbsp;CONFIRM
								</>}
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							style={{
								background: "darkred",
								color: "white",
								padding: "5px 10px",
								cursor: "pointer",
								border: 'none',
								borderRadius: '5px',
								outline: 'none',
							}}
							onClick={() => {
								setEdit(false)
								handleRemoveProduct()
								setProductData(product)
							}}
							disabled={delLoading || delCartloading}
						>
							{delLoading ? <>
									<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
									&nbsp;Deleting...
								</> :delCartloading?<>
									<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
									&nbsp;Cart Deleting...
								</>: <>
									<i className="fas fa-trash"></i>&nbsp;DELETE
								</>}
						</motion.button>
						
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							style={{
								background: "orange",
								color: "white",
								padding: "5px 10px",
								cursor: "pointer",
								border: 'none',
								borderRadius: '5px',
								outline: 'none',
							}}
								onClick={() => {
									setEdit(false)
									setProductData(product)
								}}
							disabled={loading}
						><i className="fas fa-window-close"></i>&nbsp;CANCEL</motion.button>

						
					</div>
				)}
        </div>
    )
}

export default UserProductItem
