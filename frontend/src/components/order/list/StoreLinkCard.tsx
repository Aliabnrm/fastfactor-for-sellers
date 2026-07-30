import { Copy, Link2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

type StoreLinkCardProps = {
  shopSlug: string
}

const StoreLinkCard = ({ shopSlug }: StoreLinkCardProps) => {
  const { toast } = useToast()
  const storeLink = `${window.location.origin}/checkout/${shopSlug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeLink)

    toast({
      title: 'لینک کپی شد',
      description: 'لینک فروشگاه شما در کلیپ‌بورد کپی شد',
    })
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
          <Link2 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-bold text-slate-900">لینک فروشگاه شما</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            این لینک را برای مشتریان ارسال کنید.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-slate-100 p-2 sm:flex-row">
        <code
          className="min-w-0 flex-1 truncate px-3 py-2 text-left text-sm text-slate-700"
          dir="ltr"
          title={storeLink}
        >
          {storeLink}
        </code>
        <Button onClick={handleCopyLink} className="shrink-0">
          <Copy className="h-4 w-4" />
          کپی لینک
        </Button>
      </div>
    </Card>
  )
}

export default StoreLinkCard
