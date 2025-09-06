// backend/seed.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const initialItems = [
  {
    title: 'Vintage Leather Jacket',
    description: 'Classic biker style, perfectly worn in. Great condition.',
    price: 120,
    sellerId: 1,
    imageUrl: 'https://images.pexels.com/photos/1567442/pexels-photo-1567442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    title: 'Minimalist Wooden Desk',
    description: 'Solid oak desk, perfect for a home office. Minor scuffs.',
    price: 250,
    sellerId: 1,
    imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    title: 'Retro Roller Skates',
    description: 'Size 8, vibrant colors. Ready to roll!',
    price: 75,
    sellerId: 1,
    imageUrl: 'https://images.pexels.com/photos/716107/pexels-photo-716107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

db.serialize(() => {
    console.log('Creating tables...');
    // Create the users table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, location TEXT)`);

    // Create the items table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        price REAL,
        sellerId INTEGER,
        co2_saved REAL,
        imageUrl TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sellerId) REFERENCES users (id)
    )`, (err) => {
        if (err) {
            console.error("Error creating items table:", err.message);
            return;
        }

        console.log('Tables created. Seeding database...');
        const stmt = db.prepare("INSERT INTO items (title, description, price, sellerId, imageUrl, co2_saved) VALUES (?,?,?,?,?,?)");

        for (const item of initialItems) {
            const co2_saved = item.price * 0.5;
            stmt.run(item.title, item.description, item.price, item.sellerId, item.imageUrl, co2_saved);
        }
        stmt.finalize((err) => {
            if (err) {
                console.error("Error finalizing statement:", err.message);
            } else {
                console.log('Seeding complete!');
            }
            db.close();
        });
    });
});


    

