import { Card, Button, Col } from 'react-bootstrap';
import { Plus } from 'lucide-react';

function MenuSection({ items, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="h-full">
          <Card className="h-full menu-card border-0 rounded-xl overflow-hidden">
            <div className="card-img-wrapper h-48">
              <Card.Img 
                variant="top" 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Card.Body className="d-flex flex-column p-4">
              <Card.Title className="text-lg font-bold mb-2">{item.name}</Card.Title>
              <div className="mt-auto">
                <div className="flex justify-between items-center">
                  <span className="price-tag text-xl">Rp{item.price.toLocaleString()}</span>
                  <Button 
                    variant="outline-primary"
                    className="add-btn rounded-full w-12 h-12 flex items-center justify-center p-0 border-2"
                    onClick={() => onAddToCart(item)}
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default MenuSection;