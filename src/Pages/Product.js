import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db, storage } from '../Firebase/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CryptoJS from 'crypto-js'; // Import CryptoJS


function Product() {

    // const decryptPayPal = (encryptedPayPal) => {
    //     const decryptedPayPal = CryptoJS.AES.decrypt(encryptedPayPal, 'FXsaNKzW0gSVv3yTP9mtYZJEpe28RlkL').toString(CryptoJS.enc.Utf8);
    //     return decryptedPayPal;
    // };
    


    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    let s = location.pathname.split("/")[2];
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(3);
    const [inputQuantity, setInputQuantity] = useState(2);

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

    const createOrder = (data, actions) => {
        const price = posts.length > 0 ? posts[0].Price : 0;
        const total = price * quantity;
        const payeeEmail = posts.length > 0 ? posts[0].payId : '';
        console.log(total);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                    },
                    payee: {
                        email_address: payeeEmail,
                    }
                },
            ],
        });
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setInputQuantity(value);
    };

    const updateQuantity = () => {
        if (inputQuantity > 0 && inputQuantity <= posts[0].Amount) {
            setQuantity(inputQuantity);
            console.log(quantity)
        } else if (inputQuantity > posts[0].Amount) {
            setQuantity(posts[0].Amount);
            console.log(quantity)

        } else {
            setQuantity(1);
            console.log(quantity)

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
                                    <h2>Payment:</h2>
                                    <div className="col-md-12 mt-3">
                                        <div className="justify-content-center mb-5 py-5">
                                            <PayPalScriptProvider options={{ clientId: "test" }}>
                                                <PayPalButtons
                                                                                                    createOrder={createOrder}

                                                    style={{ layout: "horizontal", height: 45, color: "blue", shape: "pill", tagline: false }}
                                                />
                                            </PayPalScriptProvider>
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
                                            style={{ width: '100px', display: 'inline-block', marginRight: '10px' }}
                                        />
                                        <button className="btn btn-primary" onClick={updateQuantity}>Set Quantity</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Product;
