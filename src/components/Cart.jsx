import { Button, ListGroup, Card } from 'react-bootstrap';
import { Trash2, ShoppingCart, Minus, Plus } from 'lucide-react';

const Cart = ({ items, onRemoveItem, onConfirmOrder, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <Card className="cart-sidebar border-0 rounded-xl shadow-lg overflow-hidden">
      <Card.Header className="bg-gradient-to-r from-indigo-600 to-emerald-600 text-white py-4 px-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          <h3 className="text-lg font-bold m-0">Pesanan Anda</h3>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500 m-0">Belum Ada Pesanan</p>
          </div>
        ) : (
          <ListGroup variant="flush" className="mb-4">
            {items.map((item) => (
              <ListGroup.Item key={item.id} className="py-3 px-0 border-b">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-grow">
                    <h6 className="font-bold mb-1">{item.name}</h6>
                    <div className="text-gradient font-semibold">
                      Rp {item.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <Button
                        variant="light"
                        size="sm"
                        className="border-0 px-2 py-1"
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, (item.quantity || 1) - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-3 font-semibold">{item.quantity || 1}</span>
                      <Button
                        variant="light"
                        size="sm"
                        className="border-0 px-2 py-1"
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-full p-2 flex items-center justify-center"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-bold m-0">Total:</h4>
            <h4 className="text-xl text-gradient font-bold m-0">
              Rp {total.toLocaleString()}
            </h4>
          </div>
        </div>
        
        <Button 
          size="lg"
          className="w-full custom-green-blue pulse-button rounded-xl py-3"
          onClick={onConfirmOrder}
          disabled={items.length === 0}
        >
          Pesan Sekarang
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cart;