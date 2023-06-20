const integracaoMercadoPago = require('./services/integracao-mercadopago.service');

const buscaSegredoService = require('./services/busca-secret.service');
const criaObjetoClienteService = require('./services/cria-objeto-cliente');

exports.lambdaHandler = async (event, context) => {

    try {
        const body = JSON.parse(event.Records[0].body);

        const objetoCliente = criaObjetoClienteService.criarObjetoCliente(body);
        const segredo = await buscaSegredoService.buscaSecret();

        let idCliente = '';

        await integracaoMercadoPago.buscaClientePorEmail(segredo.Parameter.Value, body.email)
            .then(async (response) => {
                if (response.ok) {
                    const respostaJson = await response.json();
                    idCliente = respostaJson.results[0].id;
                }
            });

        await integracaoMercadoPago.atualizaDadosCliente(segredo.Parameter.Value,
            objetoCliente, idCliente)
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    console.log(error);
                }
            });
    }
    catch (error) {
        console.log(error);
    }
}
