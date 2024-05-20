import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db, storage } from '../Firebase/firebase';
import { useLocation,useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function Product() {
const [isLoading, setIsLoading] = useState(true);
const location = useLocation();
let s = location.pathname.split("/")[2];
const [posts, setPosts] = useState([]);
const navigate = useNavigate();
useEffect(() => {
    const getDatabase =  () => {
        try {
            const q = query(collection(db, "store"));
            getDocs(q)
            .then((querySnapshot) => {
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
                        
                            });
                        })
                        
                        .catch((error) => {
                            console.error("Error getting download URL:", error);
                        });
                        promises.push(downloadPromise);
                    }
                });

                Promise.all(promises)
                    .then(() => {
                        console.log(newPosts);
                        setPosts(newPosts); 
                    })
                    .catch((error) => {
                        console.error("Error fetching download URLs:", error);
                    });
                setIsLoading(false);
            }); 
        } 
        catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    getDatabase();
}, []);

    return (
        <div className="container mt-5">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                posts && (
                    <div style={{ minHeight: '90vh' }}>
                        <div className="row">
                            <div className="col-md-9">
                                <h1 className="text-center">{posts.length > 0 && posts[0].Type}</h1>
                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end">
                                <button className="btn btn-primary" onClick={() => navigate('/store')}>Back To Store</button>
                            </div>
                        </div>
                        <hr />

                        
                        <div className="row">
                            <div className="col-md-6">
                                <img src={posts.length > 0 && posts[0].Image}  style={{ minWidth: '600px'}}className="img-fluid rounded" alt={posts.length > 0 && posts[0].Type} />
                                <p className="text" style={{fontSize: '20px'}}>{posts.length > 0 && posts[0].Notes}</p>

                            </div>
                            
                            <div className="col-md-6 mt-3">
                                <h3 className="text">Description:</h3>
                                <p className="text" style={{fontSize: '20px'}}>{posts.length > 0 && posts[0].Description}</p>
                            
                        
                                <div className="bg-light p-4 rounded">
                                    <h3>Product Details:</h3>
                                    <p><strong>Price:</strong> ${posts.length > 0 && posts[0].Price}/lb</p>
                                    <p><strong>Amount available:</strong> {posts.length > 0 && posts[0].Amount} lbs</p>
                                    <p><strong>Shipped from:</strong> {posts.length > 0 && posts[0].Address}, {posts.length > 0 && posts[0].State}, {posts.length > 0 && posts[0].Zip}</p>
                                    <p><strong>Seller:</strong> {posts.length > 0 && posts[0].Seller}</p>
                                    <p><strong>Contact:</strong> {posts.length > 0 && posts[0].Contact}</p>
                                </div>
                                <div className="col-md-12 mt-5 py-5">
                                <div className="justify-content-center">
                                <PayPalScriptProvider options={{ clientId: "test" }}>
                                        <PayPalButtons style={{ layout: "horizontal" }} />
                                    </PayPalScriptProvider>
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