import { Upload, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  id: string;
  label: string;
  fileName: string;
  previewUrl?: string;
  onChange: (file: File | null) => void;
}

export const FileUpload = ({
  id,
  label,
  fileName,
  onChange,
  previewUrl,
}: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] ?? null);
  };

  const handleFileRemove = () => {
    onChange(null);

    const fileInput = document.getElementById(id) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  if (previewUrl) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>

        <div className="relative border border-primary/50 rounded-lg p-2 bg-secondary/20">
          <img
            src={previewUrl}
            alt="پیش‌نمایش فیش واریزی"
            className="w-full max-h-[200px] object-cover rounded"
          />

          <button
            type="button"
            onClick={handleFileRemove}
            className="absolute top-4 left-4 text-red-500  rounded-full  transition-transform hover:scale-110"
            aria-label="حذف فایل"
          >
            <XCircle className="w-6 h-6" fill="white" />
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
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden "
        onChange={handleFileChange}
      />

      <label
        htmlFor={id}
        className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer block"
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />

        {fileName ? (
          <p className="text-sm font-medium text-foreground">{fileName}</p>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground mb-1">
              تصویر فیش واریزی
            </p>
            <p className="text-xs text-muted-foreground">
              کلیک کنید یا فایل را اینجا بکشید و رها کنید
            </p>
          </>
        )}
      </label>
    </div>
  );
};
