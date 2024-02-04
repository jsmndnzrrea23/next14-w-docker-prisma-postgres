'use client'

import { ComponentPropsWithoutRef } from 'react'
import { useFormStatus } from 'react-dom'

const Button: React.FC<ComponentPropsWithoutRef<'button'>> = (props) => {
  const { pending } = useFormStatus()

  return <button {...props} disabled={pending} />
}

export default Button
