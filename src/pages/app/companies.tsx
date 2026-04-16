import { useState } from 'react';
import { Search, ArrowLeft, Eye, Download } from 'lucide-react';

type Proposta = { id: number; servico: string; criadoPor: string; valor: string; data: string; status: string };
type Contrato = { id: number; servico: string; inicio: string; termino: string; status: string };
type Documento = { id: number; nome: string; tipo: string; dataEnvio: string; status: string };
type Reuniao = { id: number; pauta: string; data: string; hora: string; modalidade: string };
type Relatorio = { id: number; nome: string; analista: string; data: string; status: string };

type Empresa = {
  id: number;
  initials: string;
  name: string;
  cnpj: string;
  tags: string[];
  active: boolean;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  endereco: string;
  cep: string;
  responsavel: string;
  clienteDesde: string;
  contratoAte: string;
  propostas: Proposta[];
  contratos: Contrato[];
  documentos: Documento[];
  reunioes: Reuniao[];
  relatorios: Relatorio[];
};

const EmpresaCard = ({ empresa, onClick }: { empresa: Empresa, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-[#111111] border border-zinc-800 rounded-xl p-6 hover:border-zinc-500 transition-all cursor-pointer h-fit"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-lg bg-[#79C6C0] flex items-center justify-center text-black font-bold text-xl uppercase shadow-md shadow-[#79C6C0]/10">
        {empresa.initials}
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg truncate w-40">{empresa.name}</h3>
        <p className="text-zinc-400 text-sm">{empresa.cnpj}</p>
      </div>
    </div>
    <div className="flex gap-2 mb-6 flex-wrap">
      {empresa.tags.map((tag: string) => (
        <span key={tag} className={`text-xs px-2.5 py-1 rounded-md font-medium border uppercase ${tag === 'BPO' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : tag === 'Valuation' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
          {tag}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${empresa.active ? 'bg-[#79C6C0]' : 'bg-zinc-600'}`}></div>
      <span className={empresa.active ? 'text-white font-medium' : 'text-zinc-400'}>{empresa.active ? 'Ativa' : 'Inativa'}</span>
      <span className="text-zinc-500 whitespace-nowrap">desde {empresa.clienteDesde}</span>
    </div>
  </div>
);

export function Companies() {
  const [empresas] = useState<Empresa[]>([
    { 
      id: 1, initials: "JN", name: "Jotanunes Construtora", cnpj: "12.345.678/0001-99", tags: ['BPO', 'Valuation'], active: true,
      razaoSocial: "Jota Nunes Construtora LTDA", nomeFantasia: "JN Construtora", email: "contato@jnconstrutora.com.br", telefone: "(XX) XXXX-XXXX", endereco: "Av. Paulista, 1000 — São Paulo, SP", cep: "XXXXX-XXX", responsavel: "Pessoa X", clienteDesde: "02/03/2026", contratoAte: "02/03/2027",
      propostas: [
        { id: 1, servico: "BPO", criadoPor: "Pessoa X", valor: "R$ 7.200", data: "01/02/2026", status: "Aceita" },
        { id: 2, servico: "Valuation", criadoPor: "Pessoa Y", valor: "R$ 15.000", data: "15/02/2026", status: "Aceita" }
      ],
      contratos: [
        { id: 1, servico: "BPO", inicio: "02/03/2026", termino: "02/03/2027", status: "Ativo" },
        { id: 2, servico: "Valuation", inicio: "10/03/2026", termino: "10/06/2026", status: "Ativo" }
      ],
      documentos: [
        { id: 1, nome: "Balanço Patrimonial 2025", tipo: "Balanço", dataEnvio: "07/02/2026", status: "Validado" },
        { id: 2, nome: "DRE 2025", tipo: "DRE", dataEnvio: "07/02/2026", status: "Pendente" },
        { id: 3, nome: "Contrato Social", tipo: "Contrato Social", dataEnvio: "07/02/2026", status: "Validado" }
      ],
      reunioes: [
        { id: 1, pauta: "Alinhamento BPO", data: "10/03/2026", hora: "14:00", modalidade: "Online" },
        { id: 2, pauta: "Apresentação Valuation", data: "20/03/2026", hora: "10:00", modalidade: "Presencial" },
        { id: 3, pauta: "Fechamento Mensal", data: "05/04/2026", hora: "15:00", modalidade: "Online" }
      ],
      relatorios: [
        { id: 1, nome: "Relatório Mensal BPO", analista: "Analista X", data: "01/04/2026", status: "Em Elaboração" },
        { id: 2, nome: "Prévia Valuation", analista: "Analista Y", data: "15/03/2026", status: "Entregue" }
      ]
    },
    { 
      id: 2, initials: "UT", name: "Universidade Tiradentes", cnpj: "98.765.432/0001-11", tags: ['BPO'], active: true,
      razaoSocial: "Sociedade de Educação Tiradentes S/A", nomeFantasia: "Unit", email: "reitoria@unit.br", telefone: "(XX) XXXX-XXXX", endereco: "Av. Murilo Dantas, 300 — Aracaju, SE", cep: "XXXXX-XXX", responsavel: "Pessoa Y", clienteDesde: "02/03/2026", contratoAte: "02/03/2027",
      propostas: [
        { id: 3, servico: "BPO", criadoPor: "Pessoa Z", valor: "R$ 12.000", data: "10/01/2026", status: "Aceita" },
        { id: 4, servico: "Financeiro", criadoPor: "Pessoa X", valor: "R$ 5.000", data: "20/01/2026", status: "Recusada" }
      ],
      contratos: [
        { id: 3, servico: "BPO", inicio: "01/02/2026", termino: "01/02/2027", status: "Ativo" }
      ],
      documentos: [
        { id: 4, nome: "Comprovante de Inscrição", tipo: "Fiscal", dataEnvio: "15/01/2026", status: "Validado" },
        { id: 5, nome: "Balanço Patrimonial 2024", tipo: "Balanço", dataEnvio: "15/01/2026", status: "Validado" },
        { id: 6, nome: "DRE 2024", tipo: "DRE", dataEnvio: "15/01/2026", status: "Validado" },
        { id: 7, nome: "Estatuto Social", tipo: "Jurídico", dataEnvio: "16/01/2026", status: "Validado" },
        { id: 8, nome: "Ata da Assembleia", tipo: "Jurídico", dataEnvio: "16/01/2026", status: "Pendente" }
      ],
      reunioes: [
        { id: 4, pauta: "Revisão de Metas", data: "12/04/2026", hora: "09:00", modalidade: "Online" }
      ],
      relatorios: [
        { id: 3, nome: "Fechamento Trimestral", analista: "Analista Z", data: "30/03/2026", status: "Entregue" }
      ]
    },
    { 
      id: 3, initials: "EX", name: "Empresa X", cnpj: "xx.xxx.xxx/xxxx-xx", tags: ['Financeiro', 'Valuation'], active: false,
      razaoSocial: "Empresa X LTDA", nomeFantasia: "Empresa X", email: "contato@empresax.com", telefone: "(XX) XXXX-XXXX", endereco: "Rua Fictícia, 123 — Cidade, UF", cep: "XXXXX-XXX", responsavel: "Pessoa Z", clienteDesde: "02/03/2026", contratoAte: "02/03/2027",
      propostas: [
        { id: 5, servico: "Financeiro", criadoPor: "Pessoa Y", valor: "R$ 4.000", data: "05/02/2026", status: "Recusada" }
      ],
      contratos: [],
      documentos: [
        { id: 9, nome: "Documento Inicial", tipo: "Geral", dataEnvio: "05/02/2026", status: "Rejeitado" }
      ],
      reunioes: [],
      relatorios: []
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Visão Geral");

  const empresasFiltradas = empresas.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.cnpj.includes(searchQuery)
  );

  const selectedCompany = empresas.find(emp => emp.id === selectedCompanyId);

  const getStatusColor = (status: string) => {
    if (status === 'Aceita' || status === 'Ativo' || status === 'Validado' || status === 'Entregue') {
      return 'bg-emerald-500/20 text-emerald-400';
    }
    if (status === 'Recusada' || status === 'Encerrado' || status === 'Rejeitado') {
      return 'bg-red-500/20 text-red-400';
    }
    return 'bg-yellow-500/20 text-yellow-500';
  };

  if (selectedCompany) {
    const totalContratosAtivos = selectedCompany.contratos.filter(c => c.status === 'Ativo').length;
    const totalDocumentos = selectedCompany.documentos.length;
    const totalReunioes = selectedCompany.reunioes.length;
    const totalRelatoriosPendentes = selectedCompany.relatorios.filter(r => r.status === 'Em Elaboração').length;

    return (
      <div className="flex flex-col h-full font-sans p-6 overflow-y-auto custom-scrollbar">
        <h1 className="text-2xl font-bold text-white mb-6">Empresas</h1>
        
        <button 
          onClick={() => {
            setSelectedCompanyId(null);
            setActiveTab("Visão Geral");
          }}
          className="flex items-center gap-2 text-sm text-zinc-300 border border-zinc-700 bg-transparent hover:bg-zinc-800/50 px-4 py-2 rounded-lg w-fit mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Voltar para Empresas
        </button>

        <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-xl bg-[#79C6C0] flex items-center justify-center text-black font-bold text-2xl uppercase shadow-md">
              {selectedCompany.initials}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-white font-bold text-xl">{selectedCompany.name}</h2>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${selectedCompany.active ? 'bg-[#79C6C0]' : 'bg-zinc-600'}`}></div>
                  <span className={selectedCompany.active ? 'text-white text-sm font-medium' : 'text-zinc-400 text-sm'}>
                    {selectedCompany.active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mt-1">{selectedCompany.cnpj}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 border-t border-zinc-800/50 pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-medium">Serviços Ativos</span>
              <span className="text-[#79C6C0] text-sm font-medium">{selectedCompany.tags.join(', ')}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-medium">Responsável</span>
              <span className="text-white text-sm font-medium">{selectedCompany.responsavel}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-medium">Cliente desde</span>
              <span className="text-white text-sm font-medium">{selectedCompany.clienteDesde}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 text-xs font-medium">Contrato até</span>
              <span className="text-white text-sm font-medium">{selectedCompany.contratoAte}</span>
            </div>
          </div>
        </div>

        <div className="flex border-b border-zinc-800 mb-6 overflow-x-auto custom-scrollbar">
          {['Visão Geral', 'Proposta', 'Contrato', 'Documentos', 'Reuniões', 'Relatórios'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-6 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab 
                  ? 'border-[#79C6C0] text-white' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Visão Geral' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">{totalContratosAtivos}</span>
                <span className="text-sm font-medium text-white">Contratos Ativos</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">{totalDocumentos}</span>
                <span className="text-sm font-medium text-white">Documentos Enviados</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">{totalReunioes}</span>
                <span className="text-sm font-medium text-white">Reuniões Agendadas</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">{totalRelatoriosPendentes}</span>
                <span className="text-sm font-medium text-white">Relatórios Pendentes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs text-zinc-500">Razão Social</span>
                <span className="text-sm text-white">{selectedCompany.razaoSocial}</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs text-zinc-500">Nome Fantasia</span>
                <span className="text-sm text-white">{selectedCompany.nomeFantasia}</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs text-zinc-500">Email</span>
                <span className="text-sm text-white">{selectedCompany.email}</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs text-zinc-500">Telefone</span>
                <span className="text-sm text-white">{selectedCompany.telefone}</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs text-zinc-500">Endereço</span>
                <span className="text-sm text-white">{selectedCompany.endereco}</span>
              </div>
              <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs text-zinc-500">CEP</span>
                <span className="text-sm text-white">{selectedCompany.cep}</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Proposta' && (
          <div className="bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="py-4 px-6 text-sm font-medium text-white">Serviço</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Criado por</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Valor</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Data</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedCompany.propostas.map((prop) => (
                  <tr key={prop.id} className="border-b border-zinc-800/50">
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{prop.servico}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{prop.criadoPor}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{prop.valor}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{prop.data}</td>
                    <td className="py-4 px-6">
                      <span className={`${getStatusColor(prop.status)} px-3 py-1 rounded-md text-sm font-medium`}>
                        {prop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Contrato' && (
          <div>
            <div className="flex justify-end items-center gap-4 mb-4">
              <span className="text-zinc-400 text-sm">Histórico de Contratos</span>
              <div className="flex bg-[#111111] border border-zinc-800 rounded-lg overflow-hidden">
                <button className="px-4 py-2 text-sm font-medium text-white bg-zinc-800/50 cursor-pointer">Ativos</button>
                <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">Todos</button>
              </div>
            </div>
            <div className="bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-4 px-6 text-sm font-medium text-white">Serviço</th>
                    <th className="py-4 px-6 text-sm font-medium text-white">Início</th>
                    <th className="py-4 px-6 text-sm font-medium text-white">Término</th>
                    <th className="py-4 px-6 text-sm font-medium text-white">Status</th>
                    <th className="py-4 px-6 text-sm font-medium text-white">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompany.contratos.map((cont) => (
                    <tr key={cont.id} className="border-b border-zinc-800/50">
                      <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{cont.servico}</td>
                      <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{cont.inicio}</td>
                      <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{cont.termino}</td>
                      <td className="py-4 px-6">
                        <span className={`${getStatusColor(cont.status)} px-3 py-1 rounded-md text-sm font-medium`}>
                          {cont.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button className="text-zinc-400 hover:text-white cursor-pointer"><Eye size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Documentos' && (
          <div className="flex flex-col gap-4">
            {selectedCompany.documentos.map((doc) => (
              <div key={doc.id} className="bg-[#111111] border border-zinc-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium mb-1">{doc.nome}</h4>
                  <p className="text-xs text-zinc-500">{doc.tipo} • enviado em {doc.dataEnvio}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`${getStatusColor(doc.status)} px-3 py-1 rounded-md text-sm font-medium`}>
                    {doc.status}
                  </span>
                  <button className="text-zinc-400 hover:text-white cursor-pointer"><Eye size={20} /></button>
                  <button className="text-zinc-400 hover:text-white cursor-pointer"><Download size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Reuniões' && (
          <div className="bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="py-4 px-6 text-sm font-medium text-white">Pauta</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Data</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Hora</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Modalidade</th>
                </tr>
              </thead>
              <tbody>
                {selectedCompany.reunioes.map((reu) => (
                  <tr key={reu.id} className="border-b border-zinc-800/50">
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{reu.pauta}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{reu.data}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{reu.hora}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{reu.modalidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Relatórios' && (
          <div className="bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="py-4 px-6 text-sm font-medium text-white">Relatório</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Analista</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Data</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Status</th>
                  <th className="py-4 px-6 text-sm font-medium text-white">Ações</th>
                </tr>
              </thead>
              <tbody>
                {selectedCompany.relatorios.map((rel) => (
                  <tr key={rel.id} className="border-b border-zinc-800/50">
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{rel.nome}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{rel.analista}</td>
                    <td className="py-4 px-6 text-sm text-zinc-300 font-medium">{rel.data}</td>
                    <td className="py-4 px-6">
                      <span className={`${getStatusColor(rel.status)} px-3 py-1 rounded-md text-sm font-medium`}>
                        {rel.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-zinc-400 hover:text-white cursor-pointer"><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-sans p-6">
      <div className="flex justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-white whitespace-nowrap">Empresas</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-[300px]">
            <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full bg-[#111111] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#79C6C0]" 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-6 pr-2 items-start">
        {empresasFiltradas.map((emp) => (
           <EmpresaCard 
            key={emp.id} 
            empresa={emp} 
            onClick={() => setSelectedCompanyId(emp.id)} 
           />
        ))}
      </div>
    </div>
  );
}