// src/components/forms/EmergencyContactFields.jsx
import { useFieldArray } from 'react-hook-form';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { RELATION_OPTIONS } from '../utils/constants';

/**
 * Dynamic emergency contacts array — used inside react-hook-form context.
 * ../param {{ control, register, errors }} props
 */
const EmergencyContactFields = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'emergency_contacts' });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">Emergency Contacts</h3>
        {fields.length < 5 && (
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => append({ name: '', relation: '', mobile: '' })}
          >
            + Add
          </Button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-rose-400">
          {errors?.emergency_contacts?.message || 'Add at least one emergency contact'}
        </p>
      )}

      {fields.map((field, i) => (
        <div key={field.id} className="bg-slate-900/60 rounded-xl p-4 flex flex-col gap-3 border border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              Contact {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-rose-400 text-xs hover:text-rose-300"
            >
              Remove
            </button>
          </div>

          <Input
            label="Full Name"
            placeholder="e.g. Ramesh Kumar"
            error={errors?.emergency_contacts?.[i]?.name?.message}
            {../.register(`emergency_contacts.${i}.name`)}
            required
          />

          <Select
            label="Relation"
            options={RELATION_OPTIONS}
            placeholder="Select relation"
            error={errors?.emergency_contacts?.[i]?.relation?.message}
            {../.register(`emergency_contacts.${i}.relation`)}
            required
          />

          <Input
            label="Mobile"
            type="tel"
            placeholder="+91 98765 43210"
            inputMode="tel"
            error={errors?.emergency_contacts?.[i]?.mobile?.message}
            {../.register(`emergency_contacts.${i}.mobile`)}
            required
          />
        </div>
      ))}
    </div>
  );
};

export default EmergencyContactFields;