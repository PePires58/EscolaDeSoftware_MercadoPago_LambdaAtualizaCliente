async function atualizaDadosCliente(secret, cliente, id) {
    const urlAtualizaCliente = `${process.env.BaseUrlMercadoPago}/v1/customers/${id}`;

    return fetch(urlAtualizaCliente, {
        method: 'PUT',
        body: JSON.stringify(cliente),
        headers: {
            'Authorization': `Bearer ${secret}`,
            'Content-Type': 'application/json'
        }
    })
}

async function buscaClientePorEmail(secret, email) {
    const urlBuscaCliente = `${process.env.BaseUrlMercadoPago}/v1/customers/search?email=${email}`;

    return fetch(urlBuscaCliente, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${secret}`,
            'Content-Type': 'application/json'
        }
    });
}

module.exports = {
    atualizaDadosCliente, buscaClientePorEmail
};