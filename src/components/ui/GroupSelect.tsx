"use client";

interface GroupSelectOption {
  value: string;
  label: string;
}

interface GroupSelectGroup {
  label: string;
  options: GroupSelectOption[];
}

interface GroupSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  groups: GroupSelectGroup[];
}

export function GroupSelect({
  label,
  value,
  onChange,
  groups,
}: GroupSelectProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
      >
        {groups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
