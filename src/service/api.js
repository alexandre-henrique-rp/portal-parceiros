import axios from "axios";

export const clienteHttp = axios.create({
     baseURL: 'rbrp.kinghost.net:21312',
});

export const createSession = async (email, senha) => {
     return clienteHttp.post("/login", { email, senha });
};

export const getCliente = async (numeropolo) => {
     return clienteHttp.get(`/clientes/${ numeropolo }`);
};

export const getUsuarios = async (id) => {
     return clienteHttp.get(`/usuario/${id}`);
}    

export const updateUsuarios = async (id, nome, cpf, nascimento, rg, rua, numero, complemento, bairro, cep, cidade, estado, whatsapp, chavepix, tipopix) => {
     return clienteHttp.put(`/usuario/update/${id}`, {
          nome, cpf, nascimento, rg, rua, numero, complemento, bairro, cep, cidade, estado, whatsapp, chavepix, tipopix
});
}  

export const updateCliente = async (id, nome, cpf, rg, dtnascimento, reg_cnh, razaosocial, cei, cnpj, telefone, ct_parcela, valorcd, tipocd, formapgto, hr_agenda, email, dt_agenda) => {
     return clienteHttp.put(`/cliente/update/${id}`, {
          nome, cpf, rg, dtnascimento, reg_cnh, razaosocial, cei, cnpj, telefone, ct_parcela, valorcd, tipocd, formapgto, hr_agenda, email, dt_agenda
     });
}  

export const excluirCliente = async (id, unidade) => {
     return clienteHttp.put(`/cliente/excluir/${id}`, {
          unidade
     });
}  

export const getEdtCliente = async (id) => {
     return clienteHttp.get(`/cliente/get/${id}`);
}  

export const addcliente = async(dt_agenda, nome, email, rg, cpf, cnpj, unidade, tipocd, hr_agenda, fomapgto, valorcd, ct_parcela, telefone, contador, dt_nascimento, reg_cnh, cei, razaosocial, validacao) => {
     return clienteHttp.post("/cadastrar/cliente", {
          dt_agenda, nome, email, rg, cpf, cnpj, unidade, tipocd, hr_agenda, fomapgto, valorcd, ct_parcela, telefone, contador, dt_nascimento, reg_cnh, cei, razaosocial, validacao
});
}

export const robo = async (id) => {
     return clienteHttp.get(`/cliente/robo/${id}`);
}

export const getContador = async () => {
     return clienteHttp.get("/contador");
}
