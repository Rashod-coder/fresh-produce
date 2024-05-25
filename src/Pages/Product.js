import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage, auth } from '../Firebase/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CryptoJS from 'crypto-js'; // Import CryptoJS

function Product() {

    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    let s = location.pathname.split("/")[2];
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [inputQuantity, setInputQuantity] = useState(1);
    const [isOutOfStock, setIsOutOfStock] = useState(false); // State variable to track if product is out of stock

    useEffect(() => {
        const getDatabase = async () => {
            try {
                const q = query(collection(db, "store"));
                const querySnapshot = await getDocs(q);
                const newPosts = [];
                const promises = [];

                querySnapshot.docs.forEach((doc) => {
                    if (doc.id === s) {
                        const imageRef = ref(storage, `${doc.id}/${doc.data().Image}`);
                        const downloadPromise = getDownloadURL(imageRef)
                            .then((downloadUrl) => {
                                newPosts.push({
                                    id: doc.id,
                                    Type: doc.data().productName,
                                    Price: doc.data().price,
                                    Description: doc.data().description,
                                    Image: downloadUrl,
                                    Amount: doc.data().quantity,
                                    Seller: doc.data().name,
                                    Contact: doc.data().email,
                                    Notes: doc.data().additionalNotes,
                                    Address: doc.data().address,
                                    State: doc.data().state,
                                    Zip: doc.data().zip,
                                    Sales: doc.data().sales,
                                    payId: doc.data().payPal
                                });

                                // Check if the product is out of stock
                                if (doc.data().quantity === 0) {
                                    setIsOutOfStock(true);
                                }
                            })
                            .catch((error) => {
                                console.error("Error getting download URL:", error);
                            });
                        promises.push(downloadPromise);
                    }
                });

                await Promise.all(promises);
                setPosts(newPosts);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        getDatabase();
    }, [s]);

    const addToCart = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                // Handle case where user is not logged in
                console.error("User is not logged in");
                return;
            }
    
            const dataToAdd = {
                userId: user.uid, 
                productId: posts[0].id,
                quantity: quantity,
                productName: posts[0].Type,
                Price: posts[0].Price || 0,  
                payee: posts[0].payId,
                Id: posts[0].id
            };
    
            const docRef = await addDoc(collection(db, 'cart'), dataToAdd);
            console.log("Item added to cart with ID: ", docRef.id);
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw error; 
        }
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value.trim(); 
    
        if (value === '' || isNaN(value)) {
            setInputQuantity(''); 
            setQuantity(1); 
        } else {
            const intValue = parseInt(value);
    
            if (intValue > 0 && intValue <= posts[0].Amount) {
                setInputQuantity(intValue);
                setQuantity(intValue); 
            } else if (intValue > posts[0].Amount) {
                setInputQuantity(posts[0].Amount.toString());
                setQuantity(posts[0].Amount); 
                alert("Quantity cannot exceed maximum stock!");
            } else {
                setInputQuantity('1');
                setQuantity(1); 
            }
        }
    };

    return (
        <div className="container mt-5">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                posts.length > 0 && (
                    <div style={{ minHeight: '100vh' }}>
                        <div className="row">
                            <div className="col-md-9">
                                <h1 className="text-center">{posts[0].Type}</h1>
                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end">
                                <button className="btn btn-primary" onClick={() => navigate('/store')}>Back To Store</button>
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-center">
                                    <img src={posts[0].Image} className="img-fluid rounded" alt={posts[0].Type} style={{ width: '100%', height: 'auto', maxWidth: '550px', maxHeight: '550px'  }} />
                                    
                                </div>
                                <p className="text" style={{ fontSize: '20px', textAlign: 'center' }}>{posts[0].Notes}</p>
                                <div className="payment mt-3">
                                    
                                    <div className="col-md-12 mt-3">
                                        <div className="justify-content-center mb-5 py-5">
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mt-3">
                                <h3 className="text-dark fw-bold">Description:</h3>
                                <p className="text" style={{ fontSize: '20px' }}>{posts[0].Description}</p>

                                <div className="bg-light p-4 rounded">
                                    <h3>Product Details:</h3>
                                    <p><strong>Price:</strong> ${posts[0].Price}/lb</p>
                                    <p><strong>Amount available:</strong> {posts[0].Amount} lbs</p>
                                    <p><strong>Shipped from:</strong> {posts[0].Address}, {posts[0].State}, {posts[0].Zip}</p>
                                    <p><strong>Seller:</strong> {posts[0].Seller}</p>
                                    <p><strong>Contact:</strong> {posts[0].Contact}</p>
                                    <div className="mt-3">
                                        <label htmlFor="quantity" className="form-label">Quantity (lbs):</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="form-control"
                                            value={inputQuantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            max={posts[0].Amount}
                                            style={{ width: '100px', display: 'inline-block', marginRight: '10'}}
                                        />
                                    </div>
                                </div>
                                {isOutOfStock ? (
                                    <button className="btn btn-dark btn-lg mt-5" disabled>Add to Cart (Out of Stock)</button>
                                ) : (
                                    <div>
                                        <button className="btn btn-dark btn-lg mt-5" onClick={addToCart}>Add to Cart</button>
                                        <h6>Note that if quantity field is left blank it will automatically add only 1 lbs to cart</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Product;
