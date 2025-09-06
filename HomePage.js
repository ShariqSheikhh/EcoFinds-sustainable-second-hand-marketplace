import React from 'react';

const demoProducts = [
    {
        id: 1,
        title: 'Wireless Headphones',
        price: '$39.99',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        title: 'Eco-Friendly Water Bottle',
        price: '$14.99',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        title: 'Smart Watch',
        price: '$89.99',
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 4,
        title: 'Bluetooth Speaker',
        price: '$24.99',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
    }
];

function HomePage() {
    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Welcome to EcoFinds</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '32px'
            }}>
                {demoProducts.map(product => (
                    <div key={product.id} style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                        padding: '16px',
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
                        />
                        <h2 style={{ fontSize: '1.1rem', margin: '8px 0' }}>{product.title}</h2>
                        <div style={{ fontWeight: 'bold', color: '#B12704', marginBottom: '12px' }}>{product.price}</div>
                        <button style={{
                            background: '#FFD814',
                            color: '#111',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
