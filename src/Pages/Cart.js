import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db, auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Nature from '../Assets/tadas-mikuckis-_a3movaGK-0-unsplash.jpg';
import {
    Box,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid
} from '@mui/material';
import { styled } from '@mui/system';
import { serverTimestamp } from 'firebase/firestore';

const StyledBox = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items at the top
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontSize: '3rem', // Change font size here
    fontWeight: 300, // Change font weight here
    textAlign: 'center',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: 'black',
    fontWeight: 300, // Change font weight here
    fontSize: '1.2rem', // Change font size here
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: theme.spacing(0.5),
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing(2), // Add some bottom margin
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 auto',
    },
}));

const TotalCostContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
    },
    fontWeight: 300, // Change font weight here
}));

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [buyerItem, setBuyerItem] = useState({ email: null, fullName: null });



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchCartItems(user.uid);
                fetchUser(user.uid); 
            } else {
                console.error("User is not logged in");
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchCartItems = async (userId) => {
        try {
            const q = query(collection(db, "cart"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setCartItems(items);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setIsLoading(false);
        }
    };

    const fetchUser = async (userId) => {
        try {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("User Data:", userData); // Log user data
            
                setBuyerItem({ email: userData.email, fullName: userData.fullName }); // Update buyerItem state
                setIsLoading(false);
                console.log( buyerItem.fullName)
            console.log( buyerItem.email)
            } else {
                console.error("User document not found");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching buyer details:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Buyer item:", buyerItem);
    }, [buyerItem]);

    const removeFromCart = async (itemId) => {
        try {
            await deleteDoc(doc(db, "cart", itemId));
            console.log("Item removed from cart:", itemId);
            fetchCartItems(user.uid);

            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.Price) || 0;
            const quantity = parseInt(item.quantity, 10) || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const handlePaymentSuccess = async (itemId, quantity, cart, userId, name,  seller, buyerEmail, buyerName) => {
        console.log('Buyer email:', buyerEmail);
        console.log('Buyer name:', buyerName);
        try {
            console.log("Buyer Item:", buyerItem); // Add this console log
            const itemRef = doc(db, "store", itemId);
            const itemSnapshot = await getDoc(itemRef);
            const currentItem = itemSnapshot.data();

            if (!currentItem) {
                console.error("Item data not found");
                return;
            }

            const sellerId = currentItem.sellerId; 
            const sellerRef = doc(db, "users", sellerId);
            const sellerSnapshot = await getDoc(sellerRef);
            const sellerData = sellerSnapshot.data();

            if (!sellerData) {
                console.error("Seller data not found");
                return;
            }

            console.log(seller)
            console.log(currentItem.price);
            const totalPrice = (parseFloat(currentItem.price) || 0) * quantity;
            console.log(totalPrice);

            // Ensure earnings field is properly handled
            const currentEarnings = parseFloat(sellerData.earnings) || 0;

            // Update seller's sales and earnings
            await updateDoc(sellerRef, {
                sales: (sellerData.sales || 0) + 1,
                earnings: (currentEarnings + parseFloat(totalPrice)).toFixed(2)
            });

            // Add the order to the "orders" collection
            const orderRef = collection(db, "orders");
            await addDoc(orderRef, {
                userId: userId,
                itemId: itemId,
                quantity: quantity,
                timestamp: serverTimestamp(),
                productName: name,
                bName: buyerItem.fullName,
                bEmail: buyerItem.email
            });

            console.log( buyerItem.fullName)
            console.log( buyerItem.email)
            const incomingRef = collection(db, "incoming");
            await addDoc(incomingRef, {
                sellerId: seller,
                itemId: itemId,
                productName: name,
                quantity: quantity,
                dateOrdered: serverTimestamp(),
                userId: userId,
                personName:  buyerItem.fullName,
                personEmail:  buyerItem.email
            });

            // Update the stock of the item
            const updatedStock = currentItem.quantity - quantity;

            if (updatedStock <= 0) {
                await updateDoc(itemRef, { quantity: 0, status: "Out of Stock" });
                await deleteDoc(itemRef);
            } else {
                await updateDoc(itemRef, { quantity: updatedStock });
            }

            // Remove the item from the cart
            await removeFromCart(cart);
            setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));

            alert('Transaction completed successfully!');
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const onPaymentApprove = (itemId, quantity, cart, userId, name, seller, buyerEmail, buyerName) => async (data, actions) => {
        try {
            await handlePaymentSuccess(itemId, quantity, cart, userId, name, seller, buyerEmail, buyerName);
            alert('Transaction completed successfully!');
        } catch (error) {
            console.error("Error capturing the order:", error);
        }
    };
    

    return (
        <StyledBox>
            <Container>
                <StyledTypography variant="h1">Shopping Cart</StyledTypography>
                <Divider style={{ borderTop: '1px solid #ccc', marginBottom: '2rem' }} />

                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress color="inherit" />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <StyledTableContainer component={Paper} elevation={0}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Product</StyledTableCell>
                                            <StyledTableCell>Price</StyledTableCell>
                                            <StyledTableCell>Quantity</StyledTableCell>
                                            <StyledTableCell>Subtotal</StyledTableCell>
                                            <StyledTableCell>Payment</StyledTableCell>
                                            <StyledTableCell>SKU</StyledTableCell>
                                            <StyledTableCell>Remove</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map(item => (
                                            <TableRow key={item.id}>
                                                <StyledTableCell>{item.productName}</StyledTableCell>
                                                <StyledTableCell>${parseFloat(item.Price).toFixed(2)}/lbs</StyledTableCell>
                                                <StyledTableCell>{item.quantity} lbs</StyledTableCell>
                                                <StyledTableCell>${parseFloat(item.Price * item.quantity).toFixed(2)}</StyledTableCell>
                                                <StyledTableCell>
                                                    <PayPalScriptProvider options={{ "client-id": "AZbnZ6MJRL0j1tx5Pa_ZNsMCy_kGlr626jtRg86ZLRB9PiIlJTOCDKKf53X6xZHt9k1X-QIww7uGbQAz" }}>
                                                        <PayPalButtons
                                                            createOrder={(data, actions) => {
                                                                return actions.order.create({
                                                                    purchase_units: [{
                                                                        amount: {
                                                                            value: (parseFloat(item.Price) * parseInt(item.quantity, 10)).toFixed(2),
                                                                        },
                                                                        payee: {
                                                                            email_address: item.payee,
                                                                        },
                                                                    }],
                                                                });
                                                            }}
                                                            style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', height: 30 }}
                                                            onApprove={onPaymentApprove(item.Id, parseInt(item.quantity, 10), item.id, user.uid, item.productName,  item.sellerId, buyerItem.email, buyerItem.fullName)}
                                                        />
                                                    </PayPalScriptProvider>
                                                </StyledTableCell>
                                                <StyledTableCell>{item.Id.substring(0, 8)}</StyledTableCell>
                                    
                                                <StyledTableCell>
                                                    <IconButton onClick={() => removeFromCart(item.id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} className="text-danger" />
                                                    </IconButton>
                                                </StyledTableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TotalCostContainer>
                                <Typography variant="h4" style={{ color: 'black', fontWeight: 'bold' }}>Total:</Typography>
                                <Typography variant="h4" style={{ color: 'black', fontWeight: 'bold' }}>${calculateTotal()}</Typography>
                            </TotalCostContainer>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </StyledBox>
    );
}

export default Cart;
