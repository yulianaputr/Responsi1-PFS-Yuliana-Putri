import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function InventoryTable({ items, onEdit, onDelete }) {
    
    // Fungsi pemberi warna Badge dinamis sesuai status stok
    const getBadgeStatus = (status) => {
        switch (status) {
            case 'Aman': return <Badge bg="success">Aman</Badge>;
            case 'Menipis': return <Badge bg="warning" text="dark">Menipis</Badge>;
            case 'Habis': return <Badge bg="danger">Habis</Badge>;
            default: return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="table-responsive">
            <Table striped bordered hover className="align-middle shadow-sm bg-white rounded">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Nama Barang</th>
                        <th>Kategori</th>
                        <th>Stok</th>
                        <th>Status Stok</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td className="fw-semibold">{item.namaBarang}</td>
                                <td>{item.kategori}</td>
                                <td>{item.stok}</td>
                                <td>{getBadgeStatus(item.status)}</td>
                                <td>Rp {item.hargaBeli.toLocaleString()}</td>
                                <td>Rp {item.hargaJual.toLocaleString()}</td>
                                <td className="text-center">
                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onEdit(item)}>
                                        <FaEdit /> Edit
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)}>
                                        <FaTrash /> Hapus
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-muted">
                                Belum ada data inventaris barang di gudang.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}