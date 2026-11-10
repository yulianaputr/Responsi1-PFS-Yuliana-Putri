import React, { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaBoxes, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import NavigationBar from './components/Navbar';
import InventoryTable from './components/InventoryTable';
import InventoryModal from './components/InventoryModal';

export default function App() {
    // State awal data inventaris gudang (Array of Objects)
    const [inventory, setInventory] = useState([
        { id: 1, namaBarang: 'Laptop ASUS ROG', kategori: 'Elektronik', stok: 8, hargaBeli: 12000000, hargaJual: 14000000, status: 'Aman' },
        { id: 2, namaBarang: 'Printer Epson L3210', kategori: 'Elektronik', stok: 3, hargaBeli: 2000000, hargaJual: 2400000, status: 'Menipis' },
        { id: 3, namaBarang: 'Kertas HVS A4 70gr', kategori: 'Alat Tulis', stok: 0, hargaBeli: 45000, hargaJual: 55000, status: 'Habis' }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    // Fungsi Create & Update (Save)
    const handleSave = (item) => {
        if (currentItem) {
            // Update data
            setInventory(inventory.map(inv => (inv.id === item.id ? item : inv)));
        } else {
            // Create data baru
            setInventory([item, ...inventory]);
        }
        setCurrentItem(null);
    };

    // Fungsi Trigger Edit
    const handleEdit = (item) => {
        setCurrentItem(item);
        setShowModal(true);
    };

    // Fungsi Delete
    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus barang ini dari inventaris?')) {
            setInventory(inventory.filter(item => item.id !== id));
        }
    };

    // Hitung Statistik Ringkas
    const totalJenisBarang = inventory.length;
    const totalStokBarang = inventory.reduce((acc, curr) => acc + curr.stok, 0);
    const stokMenipisHabis = inventory.filter(item => item.stok <= 5).length;

    return (
        <div className="bg-light min-vh-100 pb-5">
            <NavigationBar />
            
            <Container>
                {/* Kartu Ringkasan Dashboard */}
                <Row className="mb-4">
                    <Col md={4} className="mb-3">
                        <Card className="border-0 shadow-sm border-start border-primary border-4">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-1">Total Jenis Barang</h6>
                                    <h3 className="fw-bold mb-0">{totalJenisBarang}</h3>
                                </div>
                                <FaBoxes size={40} className="text-primary opacity-50" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="border-0 shadow-sm border-start border-success border-4">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-1">Akumulasi Total Stok</h6>
                                    <h3 className="fw-bold mb-0">{totalStokBarang} Unit</h3>
                                </div>
                                <FaCheckCircle size={40} className="text-success opacity-50" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="border-0 shadow-sm border-start border-danger border-4">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-1">Stok Menipis / Habis</h6>
                                    <h3 className="fw-bold mb-0">{stokMenipisHabis}</h3>
                                </div>
                                <FaExclamationTriangle size={40} className="text-danger opacity-50" />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Header Konten & Tombol Tambah */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold text-dark m-0">Daftar Inventaris Gudang</h4>
                    <Button variant="primary" onClick={() => { setCurrentItem(null); setShowModal(true); }}>
                        <FaPlus className="me-1" /> Tambah Barang Baru
                    </Button>
                </div>

                {/* Komponen Tabel Data */}
                <InventoryTable 
                    items={inventory} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />

                {/* Komponen Modal Form */}
                <InventoryModal 
                    show={showModal} 
                    handleClose={() => setShowModal(false)} 
                    handleSave={handleSave} 
                    currentItem={currentItem} 
                />
            </Container>
        </div>
    );
}