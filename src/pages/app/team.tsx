import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { StatCard } from "../../components/ui/StatCard";
import { MemberCard } from "../../components/ui/MemberCard";

type Member = {
  id: number;
  initials: string;
  name: string;
  role: string;
  isAdmin: boolean;
  email: string;
  phone: string;
  isActive: boolean;
  permissionsCount: number;
};

const initialMembers: Member[] = [
  { id: 1, initials: "MP", name: "Marcos Paulo", role: "CEO", isAdmin: true, email: "xxxxx@climbe.com.br", phone: "(XX) XXXXX-XXXX", isActive: true, permissionsCount: 5 },
  { id: 2, initials: "PX", name: "Pessoa x", role: "Compliance", isAdmin: false, email: "xxxxx@climbe.com.br", phone: "(XX) XXXXX-XXXX", isActive: true, permissionsCount: 4 },
  { id: 3, initials: "PX", name: "Pessoa x", role: "CSO", isAdmin: false, email: "xxxxx@climbe.com.br", phone: "(XX) XXXXX-XXXX", isActive: true, permissionsCount: 3 },
  { id: 4, initials: "PX", name: "Pessoa x", role: "CMO", isAdmin: false, email: "xxxxx@climbe.com.br", phone: "(XX) XXXXX-XXXX", isActive: true, permissionsCount: 3 },
  { id: 5, initials: "PX", name: "Pessoa x", role: "Analista Sênior", isAdmin: false, email: "xxxxx@climbe.com.br", phone: "(XX) XXXXX-XXXX", isActive: false, permissionsCount: 2 },
  { id: 6, initials: "PX", name: "Pessoa x", role: "Analista Pleno", isAdmin: false, email: "xxxxx@climbe.com.br", phone: "(XX) XXXXX-XXXX", isActive: true, permissionsCount: 2 }
];

const availablePermissions = [
  'Criar Proposta', 'Aprovar Proposta', 'Criar Contato', 
  'Validar Documentos', 'Ver Relatórios', 'Criar Relatórios', 
  'Agendar Reuniões', 'Gerenciar Equipe', 'Gerenciar Empresas'
];

export function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const totalColaboradores = members.length;
  const totalAtivos = members.filter(m => m.isActive).length;
  const totalInativos = members.filter(m => !m.isActive).length;
  const totalAnalistas = members.filter(m => m.role.toLowerCase().includes('analista')).length;

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePermission = (perm: string) => {
    setSelectedPermissions(prev => 
      prev.includes(perm) 
        ? prev.filter(p => p !== perm) 
        : [...prev, perm]
    );
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    const nameParts = name.trim().split(" ");
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();

    const newMember: Member = {
      id: Date.now(),
      initials,
      name,
      role,
      isAdmin: role.toLowerCase() === 'ceo' || role.toLowerCase() === 'admin' || role.toLowerCase() === 'cso',
      email: email || "pendente@climbe.com.br",
      phone: phone || "(XX) XXXXX-XXXX",
      isActive: status === "Ativo",
      permissionsCount: selectedPermissions.length
    };

    setMembers([newMember, ...members]);
    
    setName("");
    setCpf("");
    setEmail("");
    setPhone("");
    setRole("");
    setStatus("Ativo");
    setSelectedPermissions([]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full font-sans p-6">
      <div className="flex justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-white whitespace-nowrap">Equipe</h1>
        
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
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#79C6C0]/10 border border-[#79C6C0]/50 hover:bg-[#79C6C0]/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus size={18} className="text-[#79C6C0]" /> Novo colaborador
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard number={totalColaboradores} label="Total de Colaboradores" />
          <StatCard number={totalAtivos} label="Ativos" />
          <StatCard number={totalAnalistas} label="Analistas" />
          <StatCard number={totalInativos} label="Inativo" />
        </div>

        {/* MENSAGEM SE A PESQUISA NÃO ENCONTRAR NINGUÉM */}
        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p>Nenhum colaborador encontrado para "{searchQuery}"</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {/* Mapeando agora os membros FILTRADOS, e não mais o array original */}
          {filteredMembers.map(member => (
            <MemberCard 
              key={member.id}
              initials={member.initials} 
              name={member.name} 
              role={member.role} 
              isAdmin={member.isAdmin} 
              email={member.email} 
              phone={member.phone} 
              isActive={member.isActive} 
              permissionsCount={member.permissionsCount} 
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-[#404040] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#404040] flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Novo Colaborador</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white p-1 border border-[#404040] rounded cursor-pointer transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateMember} className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">Nome Completo</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-black border border-[#404040] rounded p-2 text-white outline-none focus:border-[#79C6C0]" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">CPF</label>
                  <input 
                    type="text" 
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="bg-black border border-[#404040] rounded p-2 text-white outline-none focus:border-[#79C6C0]" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">E-mail</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black border border-[#404040] rounded p-2 text-white outline-none focus:border-[#79C6C0]" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">Contato</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-black border border-[#404040] rounded p-2 text-white outline-none focus:border-[#79C6C0]" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">Cargo</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="bg-black border border-[#404040] rounded p-2 text-white outline-none focus:border-[#79C6C0] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Analista Pleno">Analista Pleno</option>
                    <option value="Analista Sênior">Analista Sênior</option>
                    <option value="Compliance">Compliance</option>
                    <option value="CSO">CSO</option>
                    <option value="CMO">CMO</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">Situação</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-black border border-[#404040] rounded p-2 text-white outline-none focus:border-[#79C6C0] appearance-none"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-400 mb-3 block">Permissões</label>
                <div className="grid grid-cols-3 gap-3">
                  {availablePermissions.map(perm => {
                    const isSelected = selectedPermissions.includes(perm);
                    return (
                      <button 
                        key={perm} 
                        type="button"
                        onClick={() => togglePermission(perm)}
                        className={`bg-black border text-sm p-2 rounded transition-colors cursor-pointer flex items-center justify-center
                          ${isSelected ? 'border-[#79C6C0] text-[#79C6C0]' : 'border-[#404040] text-zinc-300 hover:border-zinc-500'}
                        `}
                      >
                        {perm}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 bg-[#79C6C0]/20 border border-[#79C6C0]/50 hover:bg-[#79C6C0]/40 text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer"
              >
                Salvar Colaborador
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}