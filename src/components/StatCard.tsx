type StatCardProps = {
  label: string
  value: string
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl bg-primary p-4 shadow-xs ring-1 ring-secondary">
      <div className="text-sm text-tertiary">{label}</div>
      <div className="mt-2 text-display-sm font-semibold text-primary">{value}</div>
    </div>
  )
}
