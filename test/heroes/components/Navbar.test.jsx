/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import { Navbar } from '../../../src/heroes/components'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../src/auth'


const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <Navbar />', () => { 
   
    const  contextValue = {
        logged: true,
        user: {
            id: '123',
            name: 'Ignacio'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario', () => { 
        

        render(
            <MemoryRouter >
                <AuthContext.Provider value={ contextValue }>
                   <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect( screen.getByText('Ignacio')).toBeTruthy();
        
    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => { 
      
        render(
            <MemoryRouter >
                <AuthContext.Provider value={ contextValue }>
                   <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const btn = screen.getByRole('button');
        fireEvent.click(btn)

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});


    })

})