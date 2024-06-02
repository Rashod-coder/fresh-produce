import React, { useState, useEffect, useRef } from 'react';
import { auth, db, storage } from '../Firebase/firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { ref, uploadBytes } from 'firebase/storage';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputLabel
} from '@mui/material';

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
  const [quantity, setQuantity] = useState('');
  const [zip, setZip] = useState('');
  const [description, setDescription] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageBlob, setImageBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [payId, setPayId] = useState('');
  const uploadRef = useRef();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBlob(new Blob([reader.result], { type: selectedImage.type }));
    };
    if (selectedImage) {
      reader.readAsArrayBuffer(selectedImage);
    }
    setImageName(selectedImage.name);
    setImage(URL.createObjectURL(selectedImage));
  };

  const keepDatabase = async (event) => {
    event.preventDefault();
    setIsUploading(true); // Set isUploading to true when upload begins
  
    const user = auth.currentUser;
  
    try {
      const docRef = await addDoc(collection(db, 'store'), {
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
        Image: imageName,
        payPal: payId,
        sellerId: user.uid,
      });
  
      await uploadBytes(ref(storage, `${docRef.id}/${imageName}`), imageBlob);
  
      // Reset form
      setProduct('');
      setPrice('');
      setQuantity('');
      setDescription('');
      setAddress('');
      setZip('');
      setState('');
      setAdditionalNotes('');
      setImage(null);
      setImageName('');
      setImageBlob(null);
  
      window.alert('Product added to the marketplace');
      window.location.reload();
    } catch (error) {
      console.error('Error adding document: ', error);
      window.alert(error.message);
    } finally {
      setIsUploading(false); // Set isUploading to false when upload completes
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          if (user.displayName) {
            setUserName(user.displayName);
            setEmail(user.email);
            const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setSales(userData.sales);
              setPayId(userData.payPal);
              setIsLoading(false);
            }
          } else {
            try {
              const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(userData.fullName);
                setEmail(userData.email);
                setSales(userData.sales);
                setPayId(userData.payPal);
                setIsLoading(false);
              }
            } catch (error) {
              console.error('Error fetching user data: ', error);
              window.alert('An error occurred, please try again');
            }
          }
        } else {
          navigate('/login');
        }
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [navigate]);

  return (
    <Container sx={{ mb: 5 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: '#f0f8ff',
            borderRadius: 2,
            padding: 4,
            mt: 5,
            mb: 5, // Add margin-bottom for spacing from footer
            boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.2)', // Enhance shadow on hover
            
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Upload Your Produce
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Please follow community guidelines while uploading your product
          </Typography>

          <Box component="form" onSubmit={keepDatabase} sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
              margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Price per Pound"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Quantity in Pounds"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                margin="normal"
              />
            </Box>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Zipcode"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                margin="normal"
              />
            </Box>
            <TextField
              fullWidth
              label="Additional Notes (Optional)"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              margin="normal"
            />
            <Box>
              <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
              <input
                id="image-upload"
                type="file"
                ref={uploadRef}
                className="form-control-file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '1rem' }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isUploading}
              sx={{
                mt: 2,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {isUploading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default OrderForm;
