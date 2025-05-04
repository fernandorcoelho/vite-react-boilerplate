import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
  it('renderiza corretamente', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })
}) 