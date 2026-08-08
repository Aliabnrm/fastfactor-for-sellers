const DetailRow = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => (
  <div className="flex items-start justify-between gap-4 py-3 text-sm">
    <span className="shrink-0 text-muted-foreground">{label}:</span>
    <span className="min-w-0 break-words text-left font-medium" dir="auto">
      {value}
    </span>
  </div>
)

export default DetailRow
