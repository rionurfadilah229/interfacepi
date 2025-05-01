import { Nav } from 'react-bootstrap';
import { Utensils, Wine, Cookie } from 'lucide-react';

function Header({ activeSection, onSectionChange }) {
  return (
    <header className="text-center mb-8">
      <h1 className="page-title text-4xl md:text-5xl font-extrabold mb-6">
        Soto Jakarta Bang Madi
      </h1>
      <Nav 
        variant="pills" 
        className="justify-center custom-nav-pills inline-flex bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg"
        activeKey={activeSection}
        onSelect={(k) => k && onSectionChange(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="food" className="flex items-center gap-2 px-6 py-3 rounded-xl">
            <Utensils className="w-5 h-5" />
            Makanan
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="drinks" className="flex items-center gap-2 px-6 py-3 rounded-xl">
            <Wine className="w-5 h-5" />
            Minuman
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sideDishes" className="flex items-center gap-2 px-6 py-3 rounded-xl">
            <Cookie className="w-5 h-5" />
            Cemilan
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}

export default Header;