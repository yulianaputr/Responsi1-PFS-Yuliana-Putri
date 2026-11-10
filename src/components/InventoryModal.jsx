import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function InventoryModal({ show, handleClose, handleSave, currentItem }) {
    const [namaBarang, setNamaBarang] = useState('');
    const [kategori, setKategori] = useState('Elektronik');
    const [stok, setStok] = useState('');
    const [hargaBeli, setHargaBeli] = useState('');
    const [hargaJual, setHargaJual] = useState('');

    useEffect(() => {
        if (currentItem) {
            setNamaBarang(currentItem.namaBarang);
            setKategori(currentItem.kategori);
            setStok(currentItem.stok);
            setHargaBeli(currentItem.hargaBeli);
            setHargaJual(currentItem.hargaJual);
        } else {
            setNamaBarang('');
            setKategori('Elektronik');
            setStok('');
            setHargaBeli('');
            setHargaJual('');
        }
    }, [currentItem]);

    const onSubmit = (e) => {
        e.preventDefault();
        
        // Logika Status Stok otomatis berdasarkan jumlah stok
        let status = 'Aman';
        const numStok = parseInt(stok);
        if (numStok === 0) {
            status = 'Habis';
        } else if (numStok <= 5) {
            status = 'Menipis';
        }

        handleSave({
            id: currentItem ? currentItem.id : Date.now(),
            namaBarang,
            kategori,
            stok: numStok,
            hargaBeli: parseFloat(hargaBeli),
            hargaJual: parseFloat(hargaJual),
            status
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{currentItem ? 'Edit Barang Inventaris' : 'Tambah Barang Baru'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Barang</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Contoh: Laptop Asus" 
                            value={namaBarang} 
                            onChange={(e) => setNamaBarang(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Kategori</Form.Label>
                        <Form.Select value={kategori} onChange={(e) => setKategori(e.target.value)}>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Pakaian">Pakaian</option>
                            <option value="Perabotan">Perabotan</option>
                            <option value="Alat Tulis">Alat Tulis</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jumlah Stok</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="0" 
                            value={stok} 
                            onChange={(e) => setStok(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Harga Beli (Rp)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="0" 
                            value={hargaBeli} 
                            onChange={(e) => setHargaBeli(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Harga Jual (Rp)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="0" 
                            value={hargaJual} 
                            onChange={(e) => setHargaJual(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Batal</Button>
                    <Button variant="primary" type="submit">Simpan Data</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}