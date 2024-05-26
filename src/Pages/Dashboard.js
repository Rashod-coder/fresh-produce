import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { LineChart } from '@mui/x-charts';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

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
  const [salesData, setSalesData] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [userPosts, setUserPosts] = useState([]);

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
                setIncomingOrders(userData.incomingOrders || []);
                setSalesData(userData.salesData || []);
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
    
          // Fetch earnings and sales data for the seller from the "users" collection
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
    
          // Fetch placed orders from 'orders' collection
          const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
          const ordersSnapshot = await getDocs(ordersQuery);
          const userPlacedOrders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPlacedOrders(userPlacedOrders);
    
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

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(collection(db, 'posts'), postId));
      setUserPosts(userPosts.filter(post => post.id !== postId));
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', p: 3 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff' }}>
              <Typography variant="h3" gutterBottom>{greeting} {userName} welcome to your dashboard</Typography>
              <Box sx={{ width: '100%' }}>
                <Divider sx={{ borderColor: 'black' }} />
              </Box>
              <Typography variant="body1" className='mt-2' gutterBottom>Email: {userEmail}</Typography>
            </Paper>
          </Grid>
          
          {!zipCode && (
            <Grid item xs={12} sm={12} md={12}>
              <Paper elevation={3} sx={{ p: 3, backgroundColor: '#ffe6e6' }}>
                <Typography variant="h6" color="error">Please set your 5-digit zip code in account settings to ensure you can view products in your area or neighboring cities.</Typography>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Money Earned</Typography>
              <Typography variant="h4">${moneyEarned}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Sales Made</Typography>
              <Typography variant="h4">{sold}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LineChart
                  xAxis={[{ data: salesData.map(item => item.date) }]} 
                  series={[
                    {
                      data: salesData.map(item => item.value),
                      area: true,
                    },
                  ]}
                  width={600}
                  height={400}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>How do I sell a product?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    To sell a product, first link your PayPal account email in account settings. Then go to the "Sell" section and upload your produce.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper elevation={3} sx={{ p: 3, maxHeight: '250px', overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom>Incoming Orders</Typography>
              {incomingOrders && incomingOrders.length > 0 ? (
                <ul>
                  {incomingOrders.map((order, index) => (
                    <li key={index}>{order}</li>
                    
                  ))}
                </ul>
              ) : (
                <Typography>No incoming orders</Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper elevation={3} sx={{ p: 3, maxHeight: '250px', overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom>Order History</Typography>
              {placedOrders && placedOrders.length > 0 ? (
                <ul>
                  {placedOrders.map((order, index) => (
                    <li key={order.id}>
                      <Typography variant="body1"><strong>Product:</strong> {order.productName}</Typography>
                      <Typography variant="body1"><strong>Quantity:</strong> {order.quantity}</Typography>
                      <Typography variant="body1"><strong>Date:</strong> {new Date(order.timestamp.seconds * 1000).toLocaleString()}</Typography>
                      <Typography variant="body1"><strong>SKU:</strong> {order.itemId.substring(0, 8)}</Typography>
                      <hr></hr>
                      
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No orders placed</Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography>You can access your ordered produce here and view incoming orders from other users.</Typography>
              <Typography variant="h1">PAGE IS W.I.P</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Your Posts</Typography>
              {userPosts && userPosts.length > 0 ? (
                <ul>
                  {userPosts.map((post, index) => (
                    <li key={index}>
                      {post.title} - {post.description}
                      <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No posts found</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Home;
