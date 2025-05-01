import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { menuData } from '../data/menudata';
import Header from '../components/Header';
import MenuSection from '../components/MenuSection';
import Cart from '../components/Cart';
import OrderConfirmation from '../components/OrderConfirmation';
import OrderSuccess from '../components/OrderSuccess';

function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('food');

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      <Container fluid className="px-4 max-w-[1920px] mx-auto">
        <Header 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <Row className="g-4">
          <Col lg={9}>
            <MenuSection 
              items={menuData[activeSection]} 
              onAddToCart={handleAddToCart} 
            />
          </Col>
          <Col lg={3}>
            <div className="sticky-top" style={{ top: '2rem' }}>
              <Cart 
                items={cartItems}
                onRemoveItem={handleRemoveItem}
                onConfirmOrder={handleConfirmOrder}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
          </Col>
        </Row>

        <OrderConfirmation
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
          orderDetails={cartItems}
          onConfirm={handleFinalConfirm}
        />

        <OrderSuccess
          show={showSuccess}
          onClose={handleCloseSuccess}
        />
      </Container>
    </div>
  );
}

export default Home