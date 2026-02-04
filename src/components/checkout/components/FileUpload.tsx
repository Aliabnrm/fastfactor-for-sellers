import { Upload, XCircle } from 'lucide-react'
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

        <div className="relative rounded-lg border border-primary/50 bg-secondary/20 p-2">
          <img
            src={previewUrl}
            alt="پیش‌نمایش فیش واریزی"
            className="max-h-[200px] w-full rounded object-cover"
          />

          <button
            type="button"
            onClick={handleFileRemove}
            className="absolute left-4 top-4 rounded-full text-red-500 transition-transform hover:scale-110"
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
        className="block cursor-pointer rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary"
      >
        <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />

        {fileName ? (
          <p className="text-sm font-medium text-foreground">{fileName}</p>
        ) : (
          <>
            <p className="mb-1 text-sm font-medium text-foreground">
              تصویر فیش واریزی
            </p>
            <p className="text-xs text-muted-foreground">
              کلیک کنید یا فایل را اینجا بکشید و رها کنید
            </p>
          </>
        )}
      </label>
    </div>
  )
}
