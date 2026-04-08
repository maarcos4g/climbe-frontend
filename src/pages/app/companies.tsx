import { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import { Drawer } from '../../components/ui/drawer';

type Empresa = {
  id: number;
  initials: string;
  name: string;
  cnpj: string;
  tags: string[];
  active: boolean;
};

const EmpresaCard = ({ initials, name, cnpj, tags, active }: any) => (
  <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6 hover:border-zinc-500 transition-all cursor-pointer h-fit">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-lg bg-[#79C6C0] flex items-center justify-center text-black font-bold text-xl uppercase shadow-md shadow-[#79C6C0]/10">
        {initials}
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg truncate w-40">{name}</h3>
        <p className="text-zinc-400 text-sm">{cnpj}</p>
      </div>
    </div>
    <div className="flex gap-2 mb-6 flex-wrap">
      {tags.map((tag: string) => (
        <span key={tag} className={`text-xs px-2.5 py-1 rounded-md font-medium border uppercase ${tag === 'BPO' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : tag === 'Valuation' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>{tag}</span>
      ))}
    </div>
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#79C6C0]' : 'bg-zinc-600'}`}></div>
      <span className={active ? 'text-white font-medium' : 'text-zinc-400'}>{active ? 'Ativa' : 'Inativa'}</span>
      <span className="text-zinc-500 whitespace-nowrap">desde hoje</span>
    </div>
  </div>
);

export function Companies() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [empresas, setEmpresas] = useState<Empresa[]>([
    { id: 1, initials: "JN", name: "Jotanunes Construtora", cnpj: "12.345.678/0001-99", tags: ['BPO', 'Valuation'], active: true },
    { id: 2, initials: "UT", name: "Universidade Tiradentes", cnpj: "98.765.432/0001-11", tags: ['BPO'], active: true },
    { id: 3, initials: "EX", name: "Empresa X", cnpj: "xx.xxx.xxx/xxxx-xx", tags: ['Financeiro', 'Valuation'], active: false },
  ]);

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [servico, setServico] = useState("");

  const handleCriarEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !cnpj || !servico) return;
    const sigla = nome.substring(0, 2);
    const novaEmpresaObj: Empresa = { id: Date.now(), initials: sigla, name: nome, cnpj: cnpj, tags: [servico], active: true };
    setEmpresas([novaEmpresaObj, ...empresas]);
    setNome(""); setCnpj(""); setServico(""); setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col h-full font-sans p-6">

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-white whitespace-nowrap">Empresas</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-[300px]">
            <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={18} />
            <input type="text" placeholder="Pesquisar..." className="w-full bg-[#111111] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#79C6C0]" />
          </div>
          <button onClick={() => setIsDrawerOpen(true)} className="bg-[#79C6C0]/20 border border-[#79C6C0]/50 hover:bg-[#79C6C0]/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap">
            <Plus size={18} className="text-[#79C6C0]" /> Nova Empresa
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-6 pr-2 items-start">
        {empresas.map((emp) => (
           <EmpresaCard key={emp.id} initials={emp.initials} name={emp.name} cnpj={emp.cnpj} tags={emp.tags} active={emp.active} />
        ))}
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Criar nova empresa">
        <form className="space-y-6" onSubmit={handleCriarEmpresa}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Nome da Empresa</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Insira o nome da Empresa" className="w-full bg-[#111111] border border-zinc-800 rounded-lg p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#79C6C0]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">CNPJ</label>
            <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required placeholder="Ex: 00.000.000/0000-00" className="w-full bg-[#111111] border border-zinc-800 rounded-lg p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#79C6C0]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Serviço</label>
            <div className="relative">
              <select value={servico} onChange={(e) => setServico(e.target.value)} required className="w-full bg-[#111111] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400 appearance-none focus:outline-none focus:border-[#79C6C0]">
                <option value="">Selecione</option>
                <option value="BPO">BPO</option>
                <option value="Valuation">Valuation</option>
                <option value="Financeiro">Financeiro</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>
          <button type="submit" className="w-full mt-4 bg-[#79C6C0]/20 border border-[#79C6C0]/50 hover:bg-[#79C6C0]/40 text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer">
            Salvar Empresa
          </button>
        </form>
      </Drawer>
    </div>
  );
}