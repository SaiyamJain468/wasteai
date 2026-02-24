import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  preview: string | null;
}

export default function UploadZone({ onFileSelect, preview }: UploadZoneProps) {
  const { colors, mode } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        backgroundColor: colors.surface,
        border: `2px dashed ${colors.primary}`,
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      className="w-full max-w-[600px] h-[220px] flex flex-col items-center justify-center"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/jpeg, image/png, image/webp"
        style={{ display: 'none' }}
      />
      
      {preview ? (
        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
      ) : (
        <>
          <Upload size={40} color={colors.primary} className="mb-4" />
          <p className="text-base font-bold mb-2" style={{ color: colors.textPrimary }}>
            Drag & drop or click to upload
          </p>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Supports JPG, PNG, WEBP • Max 10MB
          </p>
        </>
      )}
    </div>
  );
}
