/* eslint-disable no-undef */
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { render, screen } from '@testing-library/react'

describe('pruebas en <PrivateRoute />', () => { 
    
    test('debe de mostrar el children si esta autenticado', () => { 


        Storage.prototype.setItem = jest.fn();

        const  contexValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Ignacio'
            }
        }
    
        render( 
            <AuthContext.Provider value={ contexValue }>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Plublic Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect( screen.getByText('Plublic Route')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/");

    })
})