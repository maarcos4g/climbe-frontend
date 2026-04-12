interface StatCardProps {
  number: string | number;
  label: string;
}

export function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="bg-[#171717] border border-[#404040] rounded-lg p-6 flex flex-col justify-between h-32">
      <span className="text-3xl font-bold text-[#79C6C0]">{number}</span>
      <span className="text-sm text-zinc-400 font-medium">{label}</span>
    </div>
  );
}