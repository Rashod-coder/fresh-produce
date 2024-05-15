import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';


function Buy() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getDatabase = async () => {
        try {
            const q = query(collection(db, "store"));
            const querySnapshot = await getDocs(q);
            const newPosts = [];

            querySnapshot.forEach((doc) => {
                newPosts.push({
                    id: doc.id, 
                    Type: doc.data()["productName"],
                    Price: doc.data()["price"],
                    Description: doc.data()["description"],
                    Image: doc.data()["Image"],
                    Amount: doc.data()["quantity"]
                });
            });

            setPosts(newPosts);
            setIsLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false); // Set loading to false in case of error
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        getDatabase();
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Current Posts</h2>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {posts.map(post => (
                            <div key={post.id} className="col">
                                    <div className='card' style={{width: '18rem'}}>
                                        <div className="card-body">
                                        <h2 className="card-title">{post.Type}</h2>
                                        <h4>Price: ${post.Price}</h4>
                                        <p className="card-text">{post.Description}</p>
                                        <a href="#" onClick = {() => navigate("/Store/"+post.id)} className="btn btn-primary">View More</a>
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
