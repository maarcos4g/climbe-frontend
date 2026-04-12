import { useState } from 'react';
import { Search } from 'lucide-react';

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
  const [empresas] = useState<Empresa[]>([
    { id: 1, initials: "JN", name: "Jotanunes Construtora", cnpj: "12.345.678/0001-99", tags: ['BPO', 'Valuation'], active: true },
    { id: 2, initials: "UT", name: "Universidade Tiradentes", cnpj: "98.765.432/0001-11", tags: ['BPO'], active: true },
    { id: 3, initials: "EX", name: "Empresa X", cnpj: "xx.xxx.xxx/xxxx-xx", tags: ['Financeiro', 'Valuation'], active: false },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const empresasFiltradas = empresas.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.cnpj.includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-full font-sans p-6">

      {/* Action Bar */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-6 pr-2 items-start">
        {empresasFiltradas.map((emp) => (
           <EmpresaCard key={emp.id} initials={emp.initials} name={emp.name} cnpj={emp.cnpj} tags={emp.tags} active={emp.active} />
        ))}
      </div>

    </div>
  );
}