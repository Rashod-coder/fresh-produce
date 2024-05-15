import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db, storage } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';


function Buy() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getDatabase = async () => {
        try {
            const q = query(collection(db, "store"));
            const querySnapshot = await getDocs(q);
            const newPosts = [];
            const promises = [];
    
            querySnapshot.forEach((doc) => {
                const imageRef = ref(storage, `${doc.id}/${doc.data().Image}`);
                const downloadPromise = getDownloadURL(imageRef)
                    .then((downloadUrl) => {
                        newPosts.push({
                            id: doc.id,
                            Type: doc.data().productName,
                            Price: doc.data().price,
                            Description: doc.data().description,
                            Image: downloadUrl,
                            Amount: doc.data().quantity
                        });
                    })
                    .catch((error) => {
                        console.error("Error getting download URL:", error);
                    });
                promises.push(downloadPromise);
            });
        
            await Promise.all(promises);
    
            setPosts(newPosts);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false); 
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
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
                    <h2>Current Produce</h2>
                    <div className="row row-cols-1 row-cols-md-2 g-4 mr-4 mb-5 ">
                        {posts.map(post => (
                            <div key={post.id} className="col">
                                    <div className='card' style={{width: '18rem'}}>
                                        <img src={post.Image} className='card-img-top' style={{height: '225px'}}/>
                                        <div className="card-body bg-dark">
                                        <h2 className="card-title text-light">{post.Type}</h2>
                                        <h4 className='text-light'>Price: ${post.Price}</h4>
                                        <h4 className='text-light'>Amount: {post.Amount} lbs</h4>
                                        <p className="card-text text-light">{post.Description}</p>
                                        <a href="#" onClick = {() => navigate("/Store/"+post.id)} className="btn btn-light">View More</a>
                                        </div>

                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Buy;
