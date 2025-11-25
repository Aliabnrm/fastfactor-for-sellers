import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  label: string;
  fileName: string;
  onChange: (file: File | null) => void;
}

export const FileUpload = ({ id, label, fileName, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />

        <label htmlFor={id} className="cursor-pointer block">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />

          {fileName ? (
            <p className="text-sm font-medium text-foreground">{fileName}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground mb-1">
                {label}
              </p>
              <p className="text-xs text-muted-foreground">فایل تصویر را انتخاب کنید</p>
            </>
          )}
        </label>
      </div>
    </div>
  );
};
