import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Input from "./components/Input";
import Sujeito from "./components/Sujeito";
import Select from "./components/Select";

function App() {
  const [sujeitos, setSujeitos] = useState([]);
  const [nomeSujeito, setNomeSujeito] = useState('');
  const [idExperimentoSujeito, setIdExperimentoSujeito] = useState('');
  const [nascimentoSujeito, setNascimentoSujeito] = useState('');
  const [classificacaoSujeito, setClassificacaoSujeito] = useState('');
  const [statusSujeito, setStatusSujeito] = useState('');

  const carregarSujeitos = async () => {
  try {
    const res = await fetch('/api/sujeitos');
    if (res.ok) {
      const data = await res.json();
      const lista = data.map(s => ({
        id: s._id,
        nome: s.nomeCompleto,
        idExperimento: s.idExperimento,
        nascimento: s.dataNascimento ? s.dataNascimento.split('T')[0] : '',
        classificacao: s.classeTelecinetica,
        status: s.estadoAtual
      }));
      setSujeitos(lista);
    }
  } catch (e) {
    console.error('Erro ao carregar sujeitos', e);
  }
};


useEffect(() => {
  carregarSujeitos();
}, []);

const addSujeito = async (event) => {
 event.preventDefault();
 
 // Validações
 if (!nomeSujeito || !idExperimentoSujeito || !nascimentoSujeito || !classificacaoSujeito || !statusSujeito) {
   alert('Por favor, preencha todos os campos obrigatórios.');
   return;
 }
 
 const dados = {
  nomeCompleto: nomeSujeito,
  idExperimento: idExperimentoSujeito,
  dataNascimento: nascimentoSujeito,
  classeTelecinetica: classificacaoSujeito,
  estadoAtual: statusSujeito
 };

 try {
   const response = await fetch('/api/sujeitos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
   });

   if (response.ok) {
    const novo = await response.json();
    setSujeitos(prev => [...prev, {
     id: novo._id,
     nome: novo.nomeCompleto,
     idExperimento: novo.idExperimento,
     nascimento: novo.dataNascimento.split('T')[0],
     classificacao: novo.classeTelecinetica,
     status: novo.estadoAtual
    }]);
    limparCampos();
    alert('Sujeito adicionado com sucesso!');
   } else {
     const erro = await response.json();
     alert(`Erro: ${erro.error || 'Erro desconhecido'}`);
   }
 } catch (error) {
   console.error('Erro ao adicionar sujeito:', error);
   alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
 }
};

const deletarSujeito = async (id) => {
 await fetch(`/api/sujeitos/${id}`, { method: 'DELETE' });
 setSujeitos(prev => prev.filter(s => s.id !== id));
};


  const limparCampos = () => {
    setNomeSujeito('');
    setIdExperimentoSujeito('');
    setNascimentoSujeito('');
    setClassificacaoSujeito('');
    setStatusSujeito('');
  };

  return (
    <div className="App container my-2">
      <Header />

      {/* Seção de Sujeitos Cadastrados */}
      {sujeitos.length > 0 && (
        <div className="card shadow rounded-0 border-0 mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4">
              📊 Sujeitos Cadastrados ({sujeitos.length})
            </h5>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">ID-Experimento</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">Classificação</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {sujeitos.map((s) => (
                    <Sujeito key={s.id} sujeito={s} handler={() => deletarSujeito(s.id)} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Seção de Cadastro */}
      <div className="card shadow rounded-0 border-0">
        <div className="card-body">
          <h5 className="card-title mb-4">➕ Cadastro de Novos Sujeitos</h5>

          <form onSubmit={addSujeito}>
            <Input
              label="Nome Completo"
              placeholder="Digite o nome do sujeito"
              type="text"
              name="nome"
              value={nomeSujeito}
              onChange={(e) => setNomeSujeito(e.target.value)}
            />
            <Input
              label="ID-Experimento"
              placeholder="001, 011, 008..."
              type="text"
              name="idExperimento"
              value={idExperimentoSujeito}
              onChange={(e) => setIdExperimentoSujeito(e.target.value)}
            />
            <Input
              label="Data de Nascimento"
              placeholder=""
              type="date"
              name="data_nasc"
              value={nascimentoSujeito}
              onChange={(e) => setNascimentoSujeito(e.target.value)}
            />

            <Select
              label="Classificação"
              name="classificacao"
              value={classificacaoSujeito}
              onChange={(e) => setClassificacaoSujeito(e.target.value)}
              options={["Classe I - Telecinese Básica", "Classe II - Telecinese Avançada", "Classe III - Poderes Múltiplos", "Classe IV - Poder Psíquico Extremo", "Sem Habilidades", "Classificação Pendente"]}
            />

            <Select
              label="Status"
              name="status"
              value={statusSujeito}
              onChange={(e) => setStatusSujeito(e.target.value)}
              options={["Em Isolamento", "Sob Teste", "Treinamento Telecinético", "Observação", "Fuga", "Em Coma", "Liberado"]}
            />

            <button type="submit" className="btn btn-primary mt-3">
              Adicionar
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
