import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

    const handlePaymentSuccess = async (itemId, quantity, cart) => {
        try {
            const itemRef = doc(db, "store", itemId);
            const itemSnapshot = await getDoc(itemRef);
            const currentItem = itemSnapshot.data();

            if (!currentItem) {
                console.error("Item data not found");
                return;
            }

            const updatedStock = currentItem.quantity - quantity;

            if (updatedStock <= 0) {
                await updateDoc(itemRef, { quantity: 0, status: "Out of Stock" });
            } else {
                await updateDoc(itemRef, { quantity: updatedStock });
            }

            await removeFromCart(cart);
            setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));

            alert('Transaction completed successfully!');
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const onPaymentApprove = (itemId, quantity, cart) => (data, actions) => {
        return actions.order.capture().then(async details => {
            await handlePaymentSuccess(itemId, quantity, cart);
            actions.close();
        });
    };

    return (
        <div className="container-fluid mt-5 d-flex justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="row w-100">
                <div className="col-12">
                    <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Shopping Cart</h1>
                    <hr style={{ borderTop: '1px solid #ccc' }} />

                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            {cartItems.length > 0 ? (
                                <>
                                    <table className="table" style={{ fontSize: '1.2rem' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">SKU</th>
                                                <th scope="col">PayPal</th>
                                                <th scope="col">Remove</th> {/* Moved Remove column to the end */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id}>
                                                    <td style={{ verticalAlign: 'middle' }}>{item.productName}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>${parseFloat(item.Price).toFixed(2)}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>{item.quantity}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <span style={{ fontSize: '1.2em', color: '#555' }}>{item.id.substring(0, 8)}</span>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>
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
                                                                style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', height: 30 }} // Adjust the height as needed
                                                                onApprove={onPaymentApprove(item.Id, parseInt(item.quantity, 10), item.id)}
                                                            />
                                                        </PayPalScriptProvider>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <FontAwesomeIcon icon={faTrashAlt} className="text-danger" style={{ marginLeft: '30px', cursor: 'pointer' }} onClick={() => removeFromCart(item.id)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <hr style={{ borderTop: '1px solid #ccc' }} />
                                    <div className="d-flex justify-content-between align-items-center mt-3" style={{ fontSize: '1.5rem' }}>
                                        <span>Total:</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                </>
                            ) : (
                                <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>Your cart is empty</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
