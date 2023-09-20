/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { PublicRoute } from '../../src/router/PublicRoute'
import { AuthContext } from '../../src/auth'
import { MemoryRouter, Route, Routes } from 'react-router-dom'


describe('pruebas en <PublicRoute />', () => { 
  
    test('debe de mostrar el children si no esta autenticado', () => { 

        const  contexValue = {
            logged: false
        }
    
        render( 
            <AuthContext.Provider value={ contexValue }>
                <PublicRoute>
                    <h1>Plublic Route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        expect( screen.getByText('Plublic Route')).toBeTruthy();
    })

    test('debe de navegar si esta autenticado', () => { 

        const  contexValue = {
            logged: true,
            user: {
                name: 'Ignacio',
                id: '123'
            }
        }
    
        render( 
            <AuthContext.Provider value={ contexValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>

                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Plublic Route</h1>
                            </PublicRoute>
                        }/>

                        
                        <Route path='marvel' element={ <h1>Pagina Marvel</h1> }/>
                    </Routes>


                    
                </MemoryRouter>
            </AuthContext.Provider>
        )
        screen.debug()

        expect( screen.getByText('Pagina Marvel')).toBeTruthy();
    })

})