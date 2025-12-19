// Servidor de producción para Railway/Heroku
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para producción
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Crear directorio de datos si no existe
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Archivos de datos
const INVENTORY_FILE = path.join(DATA_DIR, 'inventory.json');
const MOVEMENTS_FILE = path.join(DATA_DIR, 'movements.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CAMBIO_POLINES_FILE = path.join(DATA_DIR, 'cambio-polines.json');

// Funciones para cargar y guardar datos
function loadData(filePath, defaultData = []) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error(`Error cargando ${filePath}:`, error);
    }
    return defaultData;
}

function saveData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error guardando ${filePath}:`, error);
        return false;
    }
}

// Cargar datos al iniciar con datos por defecto
let inventory = loadData(INVENTORY_FILE, [
    {
        id: 'pol001',
        code: 'POL-001',
        description: 'Polín de Acero 1200mm',
        type: 'Polín',
        currentStock: 45,
        minStock: 20,
        location: 'Almacén A',
        supplier: 'Proveedor ABC',
        unitPrice: 150.00,
        lastModified: new Date().toISOString(),
        version: 1,
        syncStatus: 'synced'
    },
    {
        id: 'lin001',
        code: 'LIN-001',
        description: 'Liner de Goma 800x600mm',
        type: 'Liner',
        currentStock: 8,
        minStock: 15,
        location: 'Almacén B',
        supplier: 'Proveedor XYZ',
        unitPrice: 280.00,
        lastModified: new Date().toISOString(),
        version: 1,
        syncStatus: 'synced'
    }
]);

let movements = loadData(MOVEMENTS_FILE, []);

let users = loadData(USERS_FILE, [
    {
        id: 'admin',
        username: 'admin',
        password: 'admin123',
        fullName: 'Administrador del Sistema',
        email: 'admin@empresa.com',
        role: 'Administrador',
        active: true,
        shift: 'A',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        syncStatus: 'synced'
    },
    {
        id: 'supervisor',
        username: 'supervisor',
        password: 'super123',
        fullName: 'Supervisor de Turno',
        email: 'supervisor@empresa.com',
        role: 'Supervisor',
        active: true,
        shift: 'A',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        syncStatus: 'synced'
    },
    {
        id: 'operador',
        username: 'operador',
        password: 'oper123',
        fullName: 'Operador de Planta',
        email: 'operador@empresa.com',
        role: 'Operador',
        active: true,
        shift: 'B',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        syncStatus: 'synced'
    }
]);

let cambioPolinesRegistros = loadData(CAMBIO_POLINES_FILE, []);

// Función para generar IDs
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// API Routes - Inventario
app.get('/api/inventory', (req, res) => {
    const since = req.query.since;
    let result = inventory;

    if (since) {
        result = inventory.filter(item =>
            new Date(item.lastModified) > new Date(since)
        );
    }

    res.json(result);
});

app.post('/api/inventory', (req, res) => {
    const item = {
        ...req.body,
        id: req.body.id || generateId(),
        lastModified: new Date().toISOString(),
        version: 1,
        syncStatus: 'synced'
    };

    inventory.push(item);
    
    if (saveData(INVENTORY_FILE, inventory)) {
        console.log('✅ Material creado:', item.code);
        res.status(201).json(item);
    } else {
        res.status(500).json({ error: 'Error guardando inventario' });
    }
});

// API Routes - Movimientos
app.get('/api/movements', (req, res) => {
    const since = req.query.since;
    let result = movements;

    if (since) {
        result = movements.filter(movement =>
            new Date(movement.timestamp) > new Date(since)
        );
    }

    res.json(result);
});

app.post('/api/movements', (req, res) => {
    const movement = {
        ...req.body,
        id: req.body.id || generateId(),
        timestamp: new Date().toISOString(),
        syncStatus: 'synced'
    };

    movements.unshift(movement);

    // Actualizar stock
    if (movement.tipoMovimiento === 'Ingreso') {
        const material = inventory.find(item => item.id === movement.materialId);
        if (material) {
            material.currentStock += movement.cantidad;
            material.lastModified = new Date().toISOString();
            material.version++;
        }
    } else if (movement.tipoMovimiento === 'Consumo' || movement.tipoMovimiento === 'Salida') {
        const material = inventory.find(item => item.id === movement.materialId);
        if (material) {
            material.currentStock -= movement.cantidad;
            material.lastModified = new Date().toISOString();
            material.version++;
        }
    }

    const movementsSaved = saveData(MOVEMENTS_FILE, movements);
    const inventorySaved = saveData(INVENTORY_FILE, inventory);
    
    if (movementsSaved && inventorySaved) {
        console.log('✅ Movimiento registrado:', movement.tipoMovimiento);
        res.status(201).json(movement);
    } else {
        res.status(500).json({ error: 'Error guardando datos' });
    }
});

// API Routes - Usuarios
app.get('/api/users', (req, res) => {
    const includeDeleted = req.query.includeDeleted === 'true';
    let result = includeDeleted ? users : users.filter(user => user.active !== false && user.deleted !== true);
    
    // No devolver contraseñas
    result = result.map(({ password, ...user }) => user);
    res.json(result);
});

app.post('/api/users', (req, res) => {
    const user = {
        ...req.body,
        id: req.body.id || generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        syncStatus: 'synced',
        active: req.body.active !== undefined ? req.body.active : true,
        deleted: false
    };

    // Verificar email único
    const existingUser = users.find(u => u.email === user.email && !u.deleted);
    if (existingUser) {
        return res.status(400).json({ error: 'El email ya está en uso' });
    }

    users.push(user);
    
    if (saveData(USERS_FILE, users)) {
        console.log('✅ Usuario creado:', user.email);
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } else {
        res.status(500).json({ error: 'Error guardando usuario' });
    }
});

// API Routes - Cambio de Polines
app.get('/api/cambio-polines', (req, res) => {
    const since = req.query.since;
    let result = cambioPolinesRegistros;

    if (since) {
        result = cambioPolinesRegistros.filter(registro =>
            new Date(registro.timestamp || registro.fecha) > new Date(since)
        );
    }

    res.json(result);
});

app.post('/api/cambio-polines', (req, res) => {
    const registro = {
        ...req.body,
        id: req.body.id || generateId(),
        timestamp: new Date().toISOString(),
        syncStatus: 'synced'
    };

    cambioPolinesRegistros.unshift(registro);
    
    if (saveData(CAMBIO_POLINES_FILE, cambioPolinesRegistros)) {
        console.log('✅ Cambio de polín registrado:', registro.tagEquipo);
        res.status(201).json(registro);
    } else {
        res.status(500).json({ error: 'Error guardando registro' });
    }
});

// Sincronización - Cambio de Polines
app.post('/api/cambio-polines/sync', (req, res) => {
    const clientData = req.body.registros || [];
    const serverTime = new Date().toISOString();

    clientData.forEach(clientRegistro => {
        const existingIndex = cambioPolinesRegistros.findIndex(r => r.id === clientRegistro.id);
        
        if (existingIndex === -1) {
            cambioPolinesRegistros.unshift({
                ...clientRegistro,
                syncStatus: 'synced',
                timestamp: clientRegistro.timestamp || new Date().toISOString()
            });
        } else {
            const existing = cambioPolinesRegistros[existingIndex];
            const clientTime = new Date(clientRegistro.timestamp || clientRegistro.fecha);
            const serverTime = new Date(existing.timestamp || existing.fecha);
            
            if (clientTime > serverTime) {
                cambioPolinesRegistros[existingIndex] = {
                    ...existing,
                    ...clientRegistro,
                    syncStatus: 'synced',
                    timestamp: clientRegistro.timestamp || new Date().toISOString()
                };
            }
        }
    });

    cambioPolinesRegistros.sort((a, b) => 
        new Date(b.timestamp || b.fecha) - new Date(a.timestamp || a.fecha)
    );

    const saved = saveData(CAMBIO_POLINES_FILE, cambioPolinesRegistros);
    
    if (saved) {
        res.json({
            registros: cambioPolinesRegistros,
            serverTime: serverTime,
            totalSynced: cambioPolinesRegistros.length
        });
    } else {
        res.status(500).json({ error: 'Error guardando datos de sincronización' });
    }
});

// Autenticación
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son requeridos' });
    }

    const user = users.find(u => u.username === username && u.active);
    
    if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado o inactivo' });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    user.lastAccess = new Date().toISOString();
    user.lastModified = new Date().toISOString();
    saveData(USERS_FILE, users);

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
        success: true,
        user: userWithoutPassword,
        message: 'Login exitoso'
    });
});

// Servir archivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-production.html'));
});

// Health check para Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: PORT
    });
});

// Root endpoint para Railway health check
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-production.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor de producción iniciado en puerto ${PORT}`);
    console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Datos iniciales:`);
    console.log(`   • ${inventory.length} materiales en inventario`);
    console.log(`   • ${movements.length} movimientos registrados`);
    console.log(`   • ${users.length} usuarios configurados`);
    console.log(`   • ${cambioPolinesRegistros.length} registros de cambio de polines`);
});

module.exports = app;