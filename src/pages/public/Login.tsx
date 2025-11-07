import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Divider, Image, Input } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/configStore/store';
import { logInRequest } from '../../store/features/auth/authSlice';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);


    const { user, loading, error } = useSelector(
        (state: RootState) => ({
            user: state.auth.user,
            loading: state.auth.loading,
            error: state.auth.error
        }),
    );

    // Redirección al dashboard si el login fue exitoso
    useEffect(() => {
        if (user) {
            navigate('/sia/socios');
        }
    }, [user, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logInRequest({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit} className='h-dscreen w-screen flex flex-row justify-center items-center p-8 bg-gray-50'>
            <div className="w-full lg:w-1/3 h-full flex flex-col items-start justify-start gap-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-gray-200">
                <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                    <Image src='/assets/favicon.png' className='w-32' />
                    <span className='text-lg font-semibold text-center'>Centro Psicosocial Sur Palermo <br></br> SIA</span>
                </div>
                <Divider className='mb-4' />
                <div className='w-full flex flex-col gap-y-8'>
                    <Input
                        required
                        size='md'
                        variant='bordered'
                        label="Correo electrónico"
                        placeholder="usuario@ejemplo.com"
                        type="email"
                        labelPlacement='outside'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='w-full flex flex-col items-end space-y-2'>
                        <Input
                            required
                            size='md'
                            variant='bordered'
                            label='Contraseña'
                            placeholder='••••••••'
                            type={passwordVisible ? 'text' : 'password'}
                            labelPlacement='outside'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endContent={
                                <button
                                    type='button'
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className='font-semibold text-xs'
                                >
                                    {passwordVisible ? 'OCULTAR' : 'MOSTRAR'}
                                </button>
                            }
                        />
                        <button>
                            <span className="text-sm font-semibold hover:underline">
                                ¿Olvidaste tu contraseña?
                            </span>
                        </button>
                    </div>
                </div>



                <Button
                    size='md'
                    type="submit"
                    variant="shadow"
                    color='default'
                    radius='lg'
                    className="w-full mt-3 bg-black text-white "
                    isLoading={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>

                {error && <div className='w-full text-center text-rose-600 text-sm'>{error}</div>}

            </div>
        </form>
    );
};

export default Login;
