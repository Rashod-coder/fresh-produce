import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchCartItems(user.uid);
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

    const removeFromCart = async (itemId) => {
        try {
            await deleteDoc(doc(db, "cart", itemId));
            console.log("Item removed from cart:", itemId);
    
            // Update cartItems state after removing the item
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

    return (
        <div className="container-fluid mt-5" style={{ minHeight: '100vh' }}>
            <div className="row">
                <div className="col-md-8 border-end">
                    <h1>Your Cart</h1>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {cartItems.length > 0 ? (
                                <ul className="list-group">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center border-bottom">
                                            <div>
                                                <h5>{item.productName}</h5>
                                                <p>Price: ${parseFloat(item.Price).toFixed(2)} each</p>
                                                <p>Quantity: {item.quantity} lbs</p>
                                                <p>Total: ${(parseFloat(item.Price) * parseInt(item.quantity, 10)).toFixed(2)}</p>
                                                <PayPalScriptProvider options={{ "client-id": "AZbnZ6MJRL0j1tx5Pa_ZNsMCy_kGlr626jtRg86ZLRB9PiIlJTOCDKKf53X6xZHt9k1X-QIww7uGbQAz" }}>
                                                <PayPalButtons
    createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: (parseFloat(item.Price) * parseInt(item.quantity, 10)).toFixed(2),
                },
            }],
        });
    }}
    style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
    onApprove={(data, actions) => {
        return actions.order.capture().then(async details => {
            // Remove the item from the cart
            await removeFromCart(item.id);
    
            // Close PayPal window
            actions.restart();
    
            // Optionally, you can update the cart items state
            const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
            setCartItems(updatedCartItems);
    
            // Show alert or any other action
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    }}
/>
                                                </PayPalScriptProvider>
                                            </div>
                                            <button className="btn btn-danger btn-lg" onClick={() => removeFromCart(item.id)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Your cart is empty</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="border-start p-3">
                        <h3 className="mt-3">Total: ${calculateTotal()}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
