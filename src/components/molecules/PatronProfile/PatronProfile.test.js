import { render, screen } from '@testing-library/react'
import PatronProfile from './'
describe('Patron Profile Component', () => {
    test('renders patron details', () => {
        render(<PatronProfile />)
        expect(screen.getByTestId('local-property-patron-details').textContent).toContain('Local Property Patron Details')
        expect(screen.getByTestId('patron-account-number').textContent).toContain('Account Number')
        expect(screen.getByTestId('patron-first-name').textContent).toContain('Patron First Name')
        expect(screen.getByTestId('patron-last-name').textContent).toContain('Patron Last Name')
        expect(screen.getByTestId('patron-date-of-birth').textContent).toContain('Patron Date of Birth')


      })
  })

