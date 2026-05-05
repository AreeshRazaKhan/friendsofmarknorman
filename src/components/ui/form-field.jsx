import PropTypes from 'prop-types'

import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const FormField = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
  error,
  className,
  children,
  hint,
  ...inputProps
}) => {
  const fieldId = id || name
  const errorId = error ? `${fieldId}-error` : undefined
  const hintId = hint ? `${fieldId}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={fieldId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>

      {children ? (
        children
      ) : (
        <Input
          id={fieldId}
          name={name}
          type={type}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...inputProps}
        />
      )}

      {hint && !error && (
        <p id={hintId} className="text-xs text-stone">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red">
          {error}
        </p>
      )}
    </div>
  )
}

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default FormField
