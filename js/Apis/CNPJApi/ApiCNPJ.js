const urlApi = "http://localhost:5180/";

import { ExecutarRequisicaoGET, ExecutarRequisicaoPOST } from '../ApiRequest.js'; 

        export const CadastrarCNPJ = async (cnpj) => {
            try
            {   
                return await ExecutarRequisicaoGET('/CNPJ/CadastrarCNPJ?cnpj=' + cnpj);
            }catch(ex)
            {
                return null
            }
            
        }

        export const BuscarTodosCNPJ = async (cnpj, tipoPesquisa) => {
            try
            {   
                const pessoaJuridica = 
                { cnpj : cnpj, 
                filtroPesquisa : tipoPesquisa};
                
                return await ExecutarRequisicaoPOST('/CNPJ/BuscarTodosCNPJ', pessoaJuridica);
            }catch(ex)
            {
                return null
            }
            
        }

        export const BuscarCNPJ = async (cnpj) => {
            try
            {   
                
                return await ExecutarRequisicaoGET('/CNPJ/BuscarCNPJ?cnpj=' + cnpj);
            }catch(ex)
            {
                return null
            }
        }
    
        export const AtualizarCNPJ = async (pessoaJuridica) => {
            try
            {   

                return await ExecutarRequisicaoPOST('/CNPJ/AtualizarCNPJ' , pessoaJuridica);
                
            }catch(ex)
            {
                return null
            }
        }

        export const ExcluirCNPJ = async (cnpj) => {
            try
            {   

                return await ExecutarRequisicaoPOST('/CNPJ/ExcluirCNPJ?cnpj=' + cnpj, cnpj);
                
            }catch(ex)
            {
                return null
            }
        }