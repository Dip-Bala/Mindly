"use client";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--color-text)]">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          bg-[var(--color-surface)]
          p-3
          rounded-lg
          text-sm
          border
          border-[var(--color-border)]
          focus:outline
          // focus:ring
          focus:border
          focus:outline-[var(--color-accent)]
        "
        disabled={disabled}
      />
    </div>
  );
}
