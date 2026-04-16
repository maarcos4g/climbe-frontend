import { useState } from 'react';
import { Plus, MoreHorizontal, Search, ChevronDown } from 'lucide-react';
import { Drawer } from '../../components/ui/drawer';

type Proposta = {
  id: number;
  empresa: string;
  servico: string;
  valor: string;
  status: string;
};

const Card = ({ id, title, service, value, color, onDragStart }: any) => (
  <div 
    draggable
    onDragStart={(e) => onDragStart(e, id)}
    className="bg-[#27272A] p-4 rounded-lg border border-zinc-700/50 hover:border-zinc-500 transition-all cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md"
  >
    <h4 className="text-white font-medium mb-3 text-sm truncate">{title}</h4>
    <div className="flex justify-between items-center mb-4 text-xs">
      <span className={`px-2 py-1 rounded-md font-medium uppercase ${color}`}>{service}</span>
      <span className="text-zinc-400">{value}</span>
    </div>
    <div className="flex items-center gap-2 text-[10px] text-zinc-400">
      <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-5 h-5 rounded-full" />
      criou há 20 dias atrás
    </div>
  </div>
);

const getTagColor = (service: string) => {
    const s = service.toLowerCase();
    if(s.includes('valuation')) return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    if(s.includes('financeiro')) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'; 
}

export function Proposals() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [propostas, setPropostas] = useState<Proposta[]>([
    { id: 1, empresa: "Jota Nunes Construtora", servico: "BPO", valor: "R$ 7.200", status: "Rascunhos" },
    { id: 2, empresa: "Universidade Tiradentes", servico: "BPO", valor: "R$ 7.200", status: "Rascunhos" },
    { id: 3, empresa: "Jota Nunes Construtora", servico: "BPO", valor: "R$ 7.200", status: "Aguardando Aprovação" },
    { id: 4, empresa: "Empresa Exemplo", servico: "Financeiro", valor: "R$ 7.200", status: "Em Revisão (Recusados)" },
    { id: 5, empresa: "Jota Nunes Construtora", servico: "Valuation", valor: "R$ 7.200", status: "Aceitas (Contratos gerados)" }
  ]);

  const [novaEmpresa, setNovaEmpresa] = useState("");
  const [novoServico, setNovoServico] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");

  const colunas = ['Rascunhos', 'Aguardando Aprovação', 'Em Revisão (Recusados)', 'Aceitas (Contratos gerados)'];

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("propostaId", id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent, novoStatus: string) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData("propostaId"));
    if (!id) return;
    setPropostas(propostasAtuais => propostasAtuais.map(prop => prop.id === id ? { ...prop, status: novoStatus } : prop));
  };

  const handleCriarProposta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaEmpresa || !novoServico) return;
    const novaPropostaObj: Proposta = { id: Date.now(), empresa: novaEmpresa, servico: novoServico, valor: "R$ 0,00", status: "Rascunhos" };
    setPropostas([...propostas, novaPropostaObj]);
    setNovaEmpresa(""); setNovoServico(""); setIsDrawerOpen(false);
  };

  const propostasFiltradas = propostas.filter(p => 
    p.empresa.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.servico.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full font-sans p-6 overflow-hidden">
      
      <div className="flex justify-between items-center mb-8 gap-4">
        
        <h1 className="text-2xl font-bold text-white whitespace-nowrap">Propostas</h1>
        
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
          <button onClick={() => setIsDrawerOpen(true)} className="bg-[#79C6C0]/30 border border-[#79C6C0]/50 hover:bg-[#79C6C0]/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all whitespace-nowrap cursor-pointer">
            <Plus size={18} className="text-[#79C6C0]" /> Nova proposta
          </button>
        </div>

      </div>

      {/* Kanban com GRID e sem min-w nas colunas */}
      <div className="grid grid-cols-4 gap-4 pb-6 flex-1 items-start overflow-y-auto custom-scrollbar pr-2">
        {colunas.map((col) => (
          <div 
            key={col} 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
            className="bg-[#111111] rounded-xl p-4 flex flex-col gap-3 border border-zinc-800 min-h-[200px]"
          >
            <div className="flex justify-between items-center text-zinc-400 px-1 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">{col}</span>
              <MoreHorizontal size={16} className="cursor-pointer hover:text-white" />
            </div>
            
            {propostasFiltradas.filter(p => p.status === col).map(proposta => (
              <Card 
                key={proposta.id} 
                id={proposta.id}
                title={proposta.empresa} 
                service={proposta.servico} 
                value={proposta.valor} 
                color={getTagColor(proposta.servico)} 
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Criar nova proposta">
        <form className="space-y-6" onSubmit={handleCriarProposta}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Empresa</label>
            <div className="relative">
              <select 
                value={novaEmpresa}
                onChange={(e) => setNovaEmpresa(e.target.value)}
                required
                className="w-full bg-[#111111] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400 appearance-none focus:outline-none focus:border-[#79C6C0]"
              >
                <option value="">Selecione</option>
                <option value="Jota Nunes Construtora">Jota Nunes Construtora</option>
                <option value="Universidade Tiradentes">Universidade Tiradentes</option>
                <option value="Empresa Nova Simulação">Empresa Nova Simulação</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Serviço</label>
            <div className="relative">
              <select 
                value={novoServico}
                onChange={(e) => setNovoServico(e.target.value)}
                required
                className="w-full bg-[#111111] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400 appearance-none focus:outline-none focus:border-[#79C6C0]"
              >
                <option value="">Selecione</option>
                <option value="BPO">BPO</option>
                <option value="Valuation">Valuation</option>
                <option value="Financeiro">Financeiro</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>

          <button type="submit" className="w-full mt-4 bg-[#79C6C0]/30 border border-[#79C6C0]/50 hover:bg-[#79C6C0]/40 text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer">
            Salvar Proposta
          </button>
        </form>
      </Drawer>
    </div>
  );
}