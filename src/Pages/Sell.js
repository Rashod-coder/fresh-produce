import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function OrderForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [sales, setSales] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(''); // Declare quantity state
  const [zip, setZip] = useState(''); // Declare quantity state
  const [description, setDescription] = useState(''); // Declare description state
  const [additionalNotes, setAdditionalNotes] = useState(''); // Declare additionalNotes state
  const [image, setImage] = useState(null); // Declare image state
  const [imageUrl, setImageUrl] = useState(''); // State to hold the URL of the uploaded image


  const keepDatabase = async (event) => {
    event.preventDefault(); 
    
    try {
      await addDoc(collection(db, 'store'), { 
        productName: product,
        price: price,
        quantity: quantity,
        description: description,
        name: userName,
        email: email,
        sales: sales,
        address: address,
        zip: zip,
        state: state,
        additionalNotes: additionalNotes,
      });

      setProduct('');
    setPrice('');
    setQuantity('');
    setDescription('');
    setAddress('');
    setZip('');
    setState('');
    setAdditionalNotes('');
      window.alert("Product added on marketplace"); // Show alert after document is successfully added
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if (user) {
          console.log("User:", user); 
          if (user.displayName) {
            setUserName(user.displayName);
            setEmail(user.email)
            const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data()
                setSales(userData.sales)
            }
          } else {
            try {
              const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(userData.fullName);
                setEmail(userData.email);
                setSales(userData.sales)
                console.log("User document not found in Firestore");
              }
            } catch (error) {
              window.alert("An error occurred please try again: ", error)
              console.log("Error fetching user data from Firestore:", error);
            }
          }
        } 
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="container">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
          <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: 'black' }} role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="py-5 text-center">
            <h2>Upload your produce</h2>
            <p className="lead">Feel free to upload your product onto our platform, please follow community guidelines while uploading your product</p>
          </div>

          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted">Seller Details</span>
                                
              </h4>
              <h5>These details will be listed on your listing</h5>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Seller Name</h6>
                    <small className="text-muted">{userName}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Seller Email</h6>
                    <small className="text-muted">{email}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Sales made</h6>
                    <small className="text-muted">{sales}</small>
                  </div>
                 
                </li>
              </ul>
            </div>

            <div style={{ borderRadius: '10px', backgroundColor: 'rgba(69, 193, 250, 0.35)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="col-md-8 order-md-1">
              <h4 className="mb-3 mt-4">Details</h4>
              <form className="needs-validation"  onSubmit={keepDatabase}  noValidate="">
                <div className="mb-3">
                  <label htmlFor="username">Product name</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="product" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product" required="" />
                    <div className="invalid-feedback" style={{ width: '100%' }}>
                      Your product name is required
                    </div>
                  </div>
                </div>
                <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Price per pound</label>
                                <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g 7" required="" />
                                <div className="invalid-feedback">
                                    
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Quantity in pounds</label>
                                <input type="text" className="form-control" id="amount" value={quantity} setQuantity={(e) => setProduct(e.target.value)} placeholder="e.g 100" required="" />
                                <div className="invalid-feedback">
                                    
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username">Description of product</label>
                            <div className="input-group">
                                
                                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" required="" />
                                <div className="invalid-feedback" style={{ width: '100%' }}>
                                    Description is required
                                </div>
                            </div>
                        </div>

                        

                        <div className="mb-3">
                            <label htmlFor="address">Street Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="address" placeholder="1234 Main St" required="" />
                            <div className="invalid-feedback">
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">State</label>
                                <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} id="state" placeholder="e.g CA" required="" />
                                <div className="invalid-feedback">
                                    
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Zipcode</label>
                                <input type="text" className="form-control" value={zip} onChange={(e) => setZip(e.target.value)} id="zipcode" placeholder="" required="" />
                                <div className="invalid-feedback">
                                </div>
                            </div>
                        </div>
                        <h7>Upload image of product</h7>
                        <div className={`w-full bg-blue-950 rounded-xl hover:bg-blue-900 cursor-pointer flex flex-col justify-center items-center py-8 mb-4`}>
                            {/* {imageName === "" ? <FaFileUpload size={20} className={`mb-2`} fill='white' /> : <img src={image} alt='image-preview' className={`w-72 mb-2 h-auto`} />} */}
                            {/* <p className={`text-xl font-semibold text-white`}>{imageName === "" ? 'Add Image' : imageName }</p> */}
                            <input
                                type="file"
                                // ref={uploadRef}
                                className="form-control-file hidden fixed top-0 left-0"
                                accept="image/*"  
                                // onChange={handleImageChange} 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="username">Additonal Notes (optional) </label>
                            <div className="input-group">
                                
                                <input type="text" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="form-control" id="username" placeholder="Username" required="" />
                                
                            </div>
                        </div>
                <button style={{width:'100%'}} onSubmit={{keepDatabase}}type="submit" className="btn btn-dark btn-block mx-auto" >Upload</button>
                <hr className="mb-4" />
              </form>
            </div>
          </div>

          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">© 2023-2024 Fresh Farmers</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#">Privacy</a></li>
              <li className="list-inline-item"><a href="#">Terms</a></li>
              <li className="list-inline-item"><a href="#">Support</a></li>
            </ul>
          </footer>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
