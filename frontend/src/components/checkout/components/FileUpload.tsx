import { ImagePlus, Upload, XCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface FileUploadProps {
  id: string
  label: string
  fileName: string
  previewUrl?: string
  onChange: (file: File | null) => void
}

export const FileUpload = ({
  id,
  label,
  fileName,
  onChange,
  previewUrl,
}: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] ?? null)
  }

  const handleFileRemove = () => {
    onChange(null)

    const fileInput = document.getElementById(id) as HTMLInputElement | null
    if (fileInput) {
      fileInput.value = ''
    }
  }

  if (previewUrl) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>

        <div className="relative rounded-xl border border-primary/40 bg-secondary/50 p-2">
          <img
            src={previewUrl}
            alt="پیش‌نمایش فیش واریزی"
            className="max-h-[240px] w-full rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={handleFileRemove}
            className="absolute left-4 top-4 rounded-full bg-white text-red-500 shadow-md transition-transform hover:scale-105"
            aria-label="حذف فایل"
          >
            <XCircle className="h-6 w-6" fill="white" />
          </button>

          <input
            id={id}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor={id}
        className="block min-h-36 cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-6 text-center transition-colors hover:border-primary hover:bg-secondary/50"
      >
        <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
          <ImagePlus className="h-6 w-6" />
        </span>

        {fileName ? (
          <p className="text-sm font-medium text-foreground">{fileName}</p>
        ) : (
          <>
            <p className="mb-1 text-sm font-medium text-foreground">
              تصویر فیش واریزی
            </p>
            <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Upload className="h-3.5 w-3.5" />
              برای انتخاب تصویر کلیک کنید
            </p>
          </>
        )}
      </label>
    </div>
  )
}
