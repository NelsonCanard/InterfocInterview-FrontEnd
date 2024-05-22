const urlApi = "http://localhost:5180";
 
    export const ExecutarRequisicaoGET = async (caminho) => {
        var retorno = "";
         await fetch(urlApi + caminho , { headers : {  "Content-Type": "application/json"}})
        .then(response => response.json().then(data => ({status: response.status, body: data}))).then(obj => retorno = obj)
        .catch(err => retorno = err);

        return retorno.body;
    }

    export const ExecutarRequisicaoPOST = async (caminho, bodyJson) => {
        
        debugger
        var retorno = "";
        const response = await fetch(urlApi + caminho , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyJson)
          })
          .then(response => response.json().then(data => ({status: response.status, body: data}))).then(obj => retorno = obj)
          .catch(err => retorno = err);;
          
        return await retorno.body; 
    }
    
