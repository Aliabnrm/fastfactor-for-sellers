import { Copy } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

type ShopProps = {
  shopSlug: string
}

const LinkCard = ({ shopSlug }: ShopProps) => {
  const { toast } = useToast()

  const handleCopyLink = () => {
    const link = `${window.location.origin}/checkout/${shopSlug}`
    navigator.clipboard.writeText(link)

    toast({
      title: 'لینک کپی شد',
      description: 'لینک فروشگاه شما در کلیپ‌بورد کپی شد',
    })
  }

  return (
    <Card className="p-6 shadow-md">
      <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row">
        <div>
          <h3 className="mb-1 font-semibold">لینک فروشگاه من</h3>
          <span className="text-sm text-muted-foreground">
            این لینک را در بیو خود قرار دهید
          </span>
        </div>

        <Button onClick={handleCopyLink} className="w-full gap-2 md:w-auto">
          <Copy className="h-4 w-4" />
           لینک فروشگاه
        </Button>
      </div>
    </Card>
  )
}

export default LinkCard
