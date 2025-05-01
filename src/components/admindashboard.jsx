import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Nav } from 'react-bootstrap';
import { menuData } from '../data/menudata';
import { LogOut, Coffee, Wine, Cookie, ClipboardList, Menu } from 'lucide-react';

function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('menu'); // 'menu' or 'orders'
  const [activeTab, setActiveTab] = useState('food');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    image: ''
  });

  // Simulated orders data - in a real app, this would come from a database
  const [orders] = useState([
    {
      id: 1,
      date: '2025-01-20 12:05',
      items: [
        { name: 'Soto Daging', quantity: 2, price: 20000 },
        { name: 'Es Teh Manis', quantity: 2, price: 5000 },
        { name: 'Tempe', quantity: 1, price: 1500 }
      ],
      total: 51500,
      note: 'kuah banyakin, tidak pakai daun bawang',
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-01-20 12:10',
      items: [
        { name: 'Soto Ayam', quantity: 1, price: 20000 },
        { name: 'Es Jeruk', quantity: 1, price: 7000 }
      ],
      total: 27000,
      note: 'gula di es jeruknya tolong sedikit saja',
      status: 'processing'
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    onLogout();
  };

  const getCurrentMenuItems = () => {
    return menuData[activeTab];
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditForm({
      name: item.name,
      price: item.price,
      image: item.image
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the database
    console.log('Updating item:', { ...selectedItem, ...editForm });
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would delete from the database
    console.log('Deleting item:', selectedItem);
    setShowDeleteModal(false);
  };

  const getTabIcon = (tab) => {
    switch(tab) {
      case 'food': return <Coffee className="w-5 h-5" />;
      case 'drinks': return <Wine className="w-5 h-5" />;
      case 'sideDishes': return <Cookie className="w-5 h-5" />;
      default: return null;
    }
  };

  const getTabName = (tab) => {
    switch(tab) {
      case 'food': return 'Makanan';
      case 'drinks': return 'Minuman';
      case 'sideDishes': return 'Cemilan';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      <Container fluid className="px-4 max-w-[1920px] mx-auto">
        <Card className="border-0 rounded-xl shadow-lg overflow-hidden mb-6">
          <Card.Header className="bg-gradient-to-r from-indigo-600 to-emerald-600 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-2xl font-bold m-0">Dashboard Admin</h2>
              <Button 
                variant="light" 
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-indigo-600 font-semibold hover:bg-white/90"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </Card.Header>

          <Card.Body className="p-6">
            <Nav 
              variant="pills" 
              className="mb-4 gap-2 custom-nav-pills inline-flex bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg"
              activeKey={activeSection}
              onSelect={(k) => k && setActiveSection(k)}
            >
              <Nav.Item>
                <Nav.Link 
                  eventKey="menu" 
                  className="flex items-center gap-2 px-6 py-3 rounded-xl"
                >
                  <Menu className="w-5 h-5" />
                  Kelola Menu
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="orders" 
                  className="flex items-center gap-2 px-6 py-3 rounded-xl"
                >
                  <ClipboardList className="w-5 h-5" />
                  Daftar Pesanan
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {activeSection === 'menu' ? (
              <Row>
                <Col md={3}>
                  <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                    <h4 className="text-lg font-semibold mb-3">Kategori Menu</h4>
                    <div className="flex flex-col gap-2">
                      {['food', 'drinks', 'sideDishes'].map((tab) => (
                        <Button
                          key={tab}
                          variant={activeTab === tab ? 'primary' : 'outline-primary'}
                          onClick={() => setActiveTab(tab)}
                          className={`flex items-center gap-2 py-3 px-4 rounded-xl w-full justify-start ${
                            activeTab === tab 
                              ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 border-0 text-white' 
                              : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          {getTabIcon(tab)}
                          {getTabName(tab)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Col>

                <Col md={9}>
                  <Card className="border-0 rounded-xl shadow-md">
                    <Card.Body className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold m-0">
                          {getTabName(activeTab)}
                        </h3>
                        <Button 
                          variant="success"
                          className="rounded-xl px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 hover:shadow-lg transition-all duration-200"
                        >
                          + Tambah Menu Baru
                        </Button>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-gray-200">
                        <Table hover responsive className="m-0">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama Menu</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Harga</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Gambar</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCurrentMenuItems().map((item) => (
                              <tr key={item.id} className="border-t border-gray-100">
                                <td className="px-4 py-3">{item.name}</td>
                                <td className="px-4 py-3">Rp {item.price.toLocaleString()}</td>
                                <td className="px-4 py-3">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm"
                                      onClick={() => handleEditClick(item)}
                                      className="rounded-xl px-4 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                    >
                                      Edit
                                    </Button>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => handleDeleteClick(item)}
                                      className="rounded-xl px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-50"
                                    >
                                      Hapus
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ) : (
              <Card className="border-0 rounded-xl shadow-md">
                <Card.Body className="p-6">
                  <h3 className="text-xl font-bold mb-6">Daftar Pesanan</h3>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border border-gray-200 rounded-xl">
                        <Card.Body>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="font-semibold">Pesanan #{order.id}</h5>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status === 'completed' ? 'Selesai' : 'Diproses'}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          
                          {order.note && (
                            <div className="mb-4">
                              <p className="text-sm font-semibold mb-1">Catatan:</p>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {order.note}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-3 border-t">
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">Rp {order.total.toLocaleString()}</span>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Edit Menu Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Edit Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Menu</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Gambar</Form.Label>
              <Form.Control
                type="text"
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                required
              />
            </Form.Group>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Batal
              </Button>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus menu "{selectedItem?.name}"?</p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;