import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db, storage } from '../Firebase/firebase';
import { useLocation } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';

function Product() {
const [isLoading, setIsLoading] = useState(true);
const location = useLocation();
let s = location.pathname.substring(5);
const [posts, setPosts] = useState([]);

useEffect(() => {
    const getDatabase =  () => {
        try {
            const q = query(collection(db, "store"));
            getDocs(q)
            .then((querySnapshot) => {
                const newPosts = [];
                const promises = [];
                querySnapshot.forEach((doc) => {
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
                        setPosts(newPosts); // Update the state with the new array of posts
                    })
                    .catch((error) => {
                        console.error("Error fetching download URLs:", error);
                    });
                setPosts(newPosts);
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
        <div style={{ minHeight: '100vh' }}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>{posts.length > 0 && posts[0].Price}</h1>
                </div>
            )}
        </div>
    );
}

export default Product;
