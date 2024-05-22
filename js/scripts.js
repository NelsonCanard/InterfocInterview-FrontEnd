import { CadastrarCNPJ, BuscarTodosCNPJ, BuscarCNPJ, AtualizarCNPJ, ExcluirCNPJ } from './Apis/CNPJApi/ApiCNPJ.js'; 

const consultaForm = document.querySelector("#consulta-form");
const consultaInput = document.querySelector("#consulta-input");
const consultaList = document.querySelector("#consulta-list");
const editForm = document.querySelector("#edit-form");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterBtn = document.querySelector("#filter-select");
const barraFerramentas = document.getElementById('BarraFerramentas');
const confirmarEdicaoBotao = document.getElementById('confirmar-edit-btn');


const SalvarConsulta = async (text, origemGrid, save = 1) => {

  
  if(!origemGrid) await CadastrarCNPJ(text);

  const consulta = document.createElement("div");
  consulta.classList.add("consulta");

  text = text.replace(/[^\d]+/g,'');
  var x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
  text = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');

  const textoCnpj = document.createElement("label");
  textoCnpj.classList.add("lbl-consulta");
  textoCnpj.innerHTML = text;
  consulta.appendChild(textoCnpj);

  const editar = document.createElement("button");
  editar.classList.add("edit-consulta");
  editar.innerHTML = '<i class="fa-solid fa-pen"></i>';
  consulta.appendChild(editar);

  const remover = document.createElement("button");
  remover.classList.add("remove-consulta");
  remover.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  consulta.appendChild(remover);

  consultaList.appendChild(consulta);
  consultaInput.value = "";
};

const TrocarTelas = () => {
  
  editForm.classList.toggle("hide");
  consultaForm.classList.toggle("hide");
  consultaList.classList.toggle("hide");
  document.getElementById("cnpj-input").disabled = true;
  if(barraFerramentas.style.display == 'none')
    barraFerramentas.style.display = '';
  else  barraFerramentas.style.display = 'none'
};

const FormEditar = async (cnpj) => 
  {
    TrocarTelas();
    const pessoaJuridica = await BuscarCNPJ(cnpj);
    
    document.getElementById("nome-input").value  = pessoaJuridica.nome;
    document.getElementById("cnpj-input").value  = pessoaJuridica.cnpj;
    document.getElementById("atividadePrincipal-input").value  = pessoaJuridica.atividadePrincipal;
    document.getElementById("tipo-input").value  = pessoaJuridica.tipo;
    document.getElementById("porte-input").value  = pessoaJuridica.porte;
  }
  
const CarregarConsultas = async () => {
  
    consultaList.innerHTML = "";
    consultaList.innerText = "";

  for (const item of await BuscarTodosCNPJ("", 1)) {
    SalvarConsulta(item, true, 0);
  }

};

const FiltrarCNPJ = async () => {
  consultaList.innerHTML = "";
  consultaList.innerText = "";
  
  for (const item of await BuscarTodosCNPJ(searchInput.value, filterBtn.value == "all" ? 1 : 2)) {
  SalvarConsulta(item, true, 0);
  }

};

consultaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = consultaInput.value;

  if (inputValue) {
    await SalvarConsulta(inputValue);
    CarregarConsultas();
  }
});

document.addEventListener("click", async (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  const cnpjLabel = parentEl.querySelector("label");
  
  if (targetEl.classList.contains("remove-consulta")) 
    {
      await ExcluirCNPJ(cnpjLabel.innerText);
      await CarregarConsultas();
    }

  if (targetEl.classList.contains("edit-consulta")) await  FormEditar(cnpjLabel.innerText)

});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  TrocarTelas();
});


confirmarEdicaoBotao.addEventListener("click",  async (e) => {
  e.preventDefault();

  const pessoaJuridica = 
  { atividadePrincipal : document.getElementById("atividadePrincipal-input").value, 
    nome : document.getElementById("nome-input").value, 
    porte :   document.getElementById("porte-input").value, 
    tipo :   document.getElementById("tipo-input").value , 
    cnpj :   document.getElementById("cnpj-input").value};

  await AtualizarCNPJ(pessoaJuridica);
  debugger
  TrocarTelas();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  TrocarTelas();
});


searchInput.addEventListener("keyup", async (e) => {
  await FiltrarCNPJ();
});

filterBtn.addEventListener("change", async (e) => {
  await FiltrarCNPJ();
});

CarregarConsultas();

