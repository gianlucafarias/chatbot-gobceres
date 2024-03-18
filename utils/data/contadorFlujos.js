const { Pool } = require('pg');

const contadorFlujos = async (idFlujo) => {
    const pool = new Pool(); // Crear una instancia de Pool
    const client = await pool.connect(); // Obtener un cliente de la piscina

    const query = 'UPDATE visitas_flujo SET contador = contador + 1 WHERE id = $1';
    try {
        await client.query(query, [idFlujo]);
        console.log(`🆗 Contador incrementado para el flujo con ID: ${idFlujo}`);
    } catch (error) {
        console.error('🚫 Error al incrementar el contador del flujo:', error);
        throw error;
    } finally {
        client.release(); // Liberar el cliente de vuelta a la piscina
    }
};

module.exports = contadorFlujos;
