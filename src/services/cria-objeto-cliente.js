exports.criarObjetoCliente = function (data) {
    return {
        first_name: data.nome,
        last_name: data.sobrenome,
        identification: {
            type: data.identification.type,
            number: data.identification.number
        },
        description: `Usuário da escola de software - ${data.email}`
    };
}