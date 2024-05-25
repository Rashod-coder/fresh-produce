import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, getDoc, doc } from "firebase/firestore";
import { db, storage, auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';

function Buy() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [user, setUser] = useState(null);
    const [showNoProduceMessage, setShowNoProduceMessage] = useState(false);

    const navigate = useNavigate();

    const getDatabase = async () => {
        setIsLoading(true);

        try {
            if (!user) {
                setIsLoading(false);
                return;
            }

            const userId = user.uid;
            const userDoc = await getDoc(doc(db, "users", userId));
            const userData = userDoc.data();
            const userZipCode = userData.zipCode;

            const q = query(collection(db, "store"));
            const querySnapshot = await getDocs(q);
            const newPosts = [];
            const promises = [];

            querySnapshot.forEach((doc) => {
                const imageRef = ref(storage, `${doc.id}/${doc.data().Image}`);
                const downloadPromise = getDownloadURL(imageRef)
                    .then((downloadUrl) => {
                        const postZipCode = doc.data().zip;
                        if (postZipCode === userZipCode) {
                            newPosts.push({
                                id: doc.id,
                                Type: doc.data().productName,
                                Price: doc.data().price,
                                Description: doc.data().description,
                                Image: downloadUrl,
                                Amount: doc.data().quantity,
                                Zip: postZipCode
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting download URL:", error);
                    });
                promises.push(downloadPromise);
            });

            await Promise.all(promises);

            setPosts(newPosts);
            setFilteredPosts(newPosts);
            setShowNoProduceMessage(newPosts.length === 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setIsSearchLoading(true);
        setTimeout(() => {
            setFilteredPosts(posts);
            setIsSearchLoading(false);
            setSearchPerformed(false);
        }, 500);
    };

    const performSearch = () => {
        setIsSearchLoading(true);
        setSearchPerformed(true);
        const query = searchQuery.toLowerCase();
        setTimeout(() => {
            const filtered = posts.filter(post =>
                post.Type.toLowerCase().includes(query) ||
                post.Description.toLowerCase().includes(query) ||
                post.Price.toString().includes(query) ||
                post.Amount.toString().includes(query) ||
                post.Zip.toLowerCase().includes(query)
            );
            setFilteredPosts(filtered);
            setIsSearchLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            getDatabase();
        } else {
            setIsLoading(false);
            setShowNoProduceMessage(false);
        }
    }, [user]);

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.substr(0, maxLength)}...`;
        }
        return description;
    };

    return (
        <div style={{ background: '#fbfef9', minHeight: '100vh', padding: '2rem' }}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h6 className='text-center text-dark mt-4'> </h6>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-12 position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyPress={handleSearchKeyPress}
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                                <i className="fas fa-search position-absolute" style={{ left: '25px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}></i>
                                {searchQuery && (
                                    <button
                                        className="btn btn-outline-secondary position-absolute"
                                        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                        onClick={handleClearSearch}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        {isSearchLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {searchPerformed && filteredPosts.length === 0 && (
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 text-center">
                                            <h4 className="text-dark">Produce not found</h4>
                                        </div>
                                    </div>
                                )}
                                {!isLoading && showNoProduceMessage && !searchPerformed && (
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 text-center">
                                            <h4 className="text-dark">No produce options available in your zip code</h4>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    {searchPerformed && (
                                        <div className="row justify-content-center mb-2">
                                            <div className="col-12 text-center">
                                                <h5 className="text-dark">Showing results for "{searchQuery}"</h5>
                                            </div>
                                        </div>
                                    )}
                                    <div className="row justify-content-start">
                                        <div className="col-md-6 mt-5">
                                            <h6 className="text-dark">To know more details of a specific product, click on "View More".</h6>
                                        </div>
                                    </div>
                                    {filteredPosts.length > 0 && (
                                        <div className="row justify-content-center">
                                            {filteredPosts.map(post => (
                                                <div key={post.id} className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center mb-4">
                                                    <div className="card shadow mb-4" style={{ width: '22rem' }}>
                                                        <img src={post.Image} className="card-img-top" style={{ height: '200px', objectFit: 'fit' }} alt={post.Type} />
                                                        <div className="card-body bg-dark">
                                                            <h2 className="card-title text-light fw-bold" style={{ fontSize: '1.5rem' }}>{post.Type}</h2>
                                                            <h4 className="text-light">Price: ${post.Price}/lb</h4>
                                                            <h4 className="text-light">Amount: {post.Amount} lbs</h4>
                                                            <h6 className="text-light">Zipcode: {post.Zip}</h6>
                                                            <h4 className='text-light mt-3 mb-4 line-clamp-2'>{truncateDescription(post.Description, 30)}</h4>
                                                            <div>
                                                                <a href="#" onClick={() => navigate("/Store/" + post.id)} className="btn btn-light">View More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Buy;
