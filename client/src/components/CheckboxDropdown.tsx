import { ChevronDown } from "lucide-react";

export type CheckboxDropdownOption = {
  value: string;
  label: string;
};

export type CheckboxDropdownGroup = {
  id: string;
  label?: string;
  selected?: boolean;
  options: CheckboxDropdownOption[];
};

type CheckboxDropdownProps = {
  label: string;
  summary: string;
  allLabel: string;
  allSelected: boolean;
  selectedValues: ReadonlySet<string>;
  groups: CheckboxDropdownGroup[];
  onSelectAll: () => void;
  onToggleGroup?: (groupId: string) => void;
  onToggleOption: (value: string) => void;
};

export function CheckboxDropdown({
  label,
  summary,
  allLabel,
  allSelected,
  selectedValues,
  groups,
  onSelectAll,
  onToggleGroup,
  onToggleOption,
}: CheckboxDropdownProps) {
  const hasOptions = groups.some((group) => group.options.length > 0);

  return (
    <div className="checkbox-dropdown-field">
      <span className="checkbox-dropdown-label">{label}</span>
      <details className="checkbox-dropdown">
        <summary className="checkbox-dropdown-trigger">
          <span>{summary}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </summary>

        <div className="checkbox-dropdown-menu">
          <label className="checkbox-dropdown-option checkbox-dropdown-option--all">
            <input
              type="checkbox"
              checked={hasOptions && allSelected}
              disabled={!hasOptions}
              onChange={onSelectAll}
            />
            <span>{allLabel}</span>
          </label>

          {hasOptions ? groups.map((group) => (
            group.label ? (
              <details
                key={group.id}
                className="checkbox-dropdown-group"
              >
                <summary className="checkbox-dropdown-group-trigger">
                  <ChevronDown size={15} aria-hidden="true" />
                  <span className="checkbox-dropdown-group-title">
                    {onToggleGroup ? (
                      <input
                        type="checkbox"
                        checked={allSelected || group.selected === true}
                        onClick={(event) => event.stopPropagation()}
                        onChange={() => onToggleGroup(group.id)}
                      />
                    ) : null}
                    <span>{group.label}</span>
                  </span>
                </summary>
                <div className="checkbox-dropdown-group-options">
                  {group.options.map((option) => (
                    <label key={option.value} className="checkbox-dropdown-option">
                      <input
                        type="checkbox"
                        checked={allSelected || selectedValues.has(option.value)}
                        onChange={() => onToggleOption(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </details>
            ) : (
              <div key={group.id} className="checkbox-dropdown-group">
                {group.options.map((option) => (
                  <label key={option.value} className="checkbox-dropdown-option">
                    <input
                      type="checkbox"
                      checked={allSelected || selectedValues.has(option.value)}
                      onChange={() => onToggleOption(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )
          )) : (
            <p className="checkbox-dropdown-empty">暂无可选动作</p>
          )}
        </div>
      </details>
    </div>
  );
}
