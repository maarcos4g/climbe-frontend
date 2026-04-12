import { Mail, Phone } from 'lucide-react';

interface MemberCardProps {
  initials: string;
  name: string;
  role: string;
  isAdmin?: boolean;
  email: string;
  phone: string;
  isActive: boolean;
  permissionsCount: number;
}

export function MemberCard({ initials, name, role, isAdmin, email, phone, isActive, permissionsCount }: MemberCardProps) {
  return (
    <div className="bg-[#171717] border border-[#404040] rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {/* CORREÇÃO AQUI: Fundo verde sólido, texto preto e cantos arredondados, seguindo o padrão da imagem 2 */}
        <div className="w-14 h-14 rounded-xl bg-[#79C6C0] text-[#171717] flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-bold text-lg">{name}</h3>
            {isAdmin && (
              <span className="bg-[#404040] text-white text-xs px-2 py-0.5 rounded">
                Admin
              </span>
            )}
          </div>
          <p className="text-zinc-400 text-sm">{role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 border-t border-[#404040] pt-4">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Mail size={16} />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Phone size={16} />
          <span>{phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {/* O ícone de status ativo/inativo já estava com as cores corretas, mantivemos */}
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#79C6C0]' : 'bg-[#404040]'}`} />
          <span className="text-sm text-white font-medium">{isActive ? 'Ativo' : 'Inativo'}</span>
        </div>
        <span className="text-xs text-zinc-500">{permissionsCount} permissões</span>
      </div>
    </div>
  );
}