import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sold, setSolds] = useState(0);
  const [moneyEarned, setMoneyEarned] = useState(0);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [currentView, setCurrentView] = useState('seller'); 

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if (user) {
          setUserEmail(user.email);
          if (user.displayName) {
            setUserName(user.displayName);
          } else {
            try {
              const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(userData.fullName);
                setSolds(userData.sales || 0);
                setMoneyEarned(userData.moneyEarned || 0);
                setZipCode(userData.zipCode || '');
                setUserPosts(userData.posts || []);
              } else {
                console.log("User document not found in Firestore");
              }
            } catch (error) {
              window.alert("An error occurred, please try again: ", error);
              console.log("Error fetching user data from Firestore:", error);
            }
          }

          try {
            const sellerDoc = await getDoc(doc(collection(db, 'users'), user.uid));
            if (sellerDoc.exists()) {
              const sellerData = sellerDoc.data();
              setMoneyEarned(sellerData.earnings || 0);
              setSolds(sellerData.sales || 0);
            } else {
              console.log("Seller document not found in Firestore");
            }
          } catch (error) {
            console.error("Error fetching seller data from Firestore:", error);
          }

          // Fetch incoming orders from 'incoming' collection
          try {
            const incomingOrdersQuery = query(collection(db, 'incoming'), where('sellerId', '==', user.uid));
            const incomingOrdersSnapshot = await getDocs(incomingOrdersQuery);
            const sellerIncomingOrders = incomingOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setIncomingOrders(sellerIncomingOrders);
          } catch (error) {
            console.error("Error fetching incoming orders from Firestore:", error);
          }

          try {
            const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
            const ordersSnapshot = await getDocs(ordersQuery);
            const userPlacedOrders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPlacedOrders(userPlacedOrders);
          } catch (error) {
            console.error("Error fetching placed orders from Firestore:", error);
          }

          setIsLoading(false);
        }
      });

      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 12) {
        setGreeting('Good morning, ');
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting('Good afternoon, ');
      } else {
        setGreeting('Good evening, ');
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => unsubscribe();
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const updatedIncomingOrders = await Promise.all(incomingOrders.map(async (order) => {
        try {
          const userDoc = await getDoc(doc(collection(db, 'users'), order.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullName = userData.fullName;
            const email = userData.email;
            return { ...order, buyerName: fullName, buyerEmail: email };
          } else {
            console.log("User document not found in Firestore");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          return null;
        }
      }));

      setIncomingOrders(updatedIncomingOrders.filter(Boolean));
    };

    fetchUserData();
  }, [incomingOrders]);

  const switchToSellerView = () => {
    setCurrentView('seller');
  };

  const switchToBuyerView = () => {
    setCurrentView('buyer');
  };

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', p: 3 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h3" gutterBottom>{greeting}{userName} welcome to your dashboard</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" color="textPrimary">Please set your 5-digit zip code in account settings to ensure you can view products in your area or neighboring cities.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" color="textPrimary">Ensure you have set your PayPal email in account settings to receive payments if you are going to be selling produce.</Typography>
            </Paper>
          </Grid>

          

          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">How do I sell a product?</Typography>
              <Typography variant="body1">
                To sell a product, first link your PayPal account email in account settings. Then go to the "Sell" section and upload your produce.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button variant={currentView === 'seller' ? 'contained' : 'outlined'} onClick={switchToSellerView} sx={{ mx: 1 }}>
                Seller Dashboard
              </Button>
              <Button variant={currentView === 'buyer' ? 'contained' : 'outlined'} onClick={switchToBuyerView} sx={{ mx: 1 }}>
                Buyer Dashboard
              </Button>
            </Box>
          </Grid>

          {currentView === 'seller' && (
            <Grid item xs={12} sm={6} lg={12}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Incoming Orders</Typography>
                <TableContainer component={Paper} style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Customer Email</TableCell>
                        <TableCell>Time Placed</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {incomingOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.productName}</TableCell>
                          <TableCell>{order.personName}</TableCell>
                          <TableCell>{order.quantity} lbs</TableCell>
                          <TableCell>{order.personEmail}</TableCell>
                          <TableCell>{new Date(order.dateOrdered.seconds * 1000).toLocaleString()}</TableCell>
                          <TableCell>
                            <Button>Fulfil Order</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            <Paper className= 'mt-4'  sx={{ p: 3, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">Money Earned</Typography>
              <Typography variant="h4">${moneyEarned}</Typography>
            </Paper>
            <Paper className= 'mt-4'sx={{ p: 3, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">Sales Made</Typography>
              <Typography variant="h4">{sold}</Typography>
            </Paper>
            </Grid>
            
          )}

          {currentView === 'buyer' && (
            <Grid item xs={12} sm={6} md={6} lg={12}>
              <Paper sx={{ p: 3, maxHeight: '250px', overflowY: 'auto', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Order History</Typography>
                <Typography variant='subtitle1'><i>Note you may have to scroll down to view all your orders.</i></Typography>
                {placedOrders && placedOrders.length > 0 ? (
                  <ul>
                    {placedOrders.map((order) => (
                      <li key={order.id}>
                        <Typography variant="body1"><strong>Product:</strong> {order.productName}</Typography>
                        <Typography variant="body1"><strong>Quantity:</strong> {order.quantity} lbs</Typography>
                        <Typography variant="body1"><strong>Date:</strong> {new Date(order.timestamp.seconds * 1000).toLocaleString()}</Typography>
                        <Typography variant="body1"><strong>SKU:</strong> {order.itemId.substring(0, 8)}</Typography>
                        <Divider sx={{ my: 1 }} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No orders history found</Typography>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}

export default Home;
