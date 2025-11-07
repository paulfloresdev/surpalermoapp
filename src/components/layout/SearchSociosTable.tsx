import React from 'react';
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { Socio } from '../../types/socios';
import CustomColumn from './CustomColumn';
import { Link, useNavigate } from 'react-router-dom';

interface SearchSociosTableProps {
    items: Socio[];
    onOrderChange: (newOrderValue: number) => void;
    currentOrder?: number;
    loading: boolean;
}

const SearchSociosTable: React.FC<SearchSociosTableProps> = ({ items, onOrderChange, currentOrder, loading }) => {
    const navigate = useNavigate();
    const columnClassname = "bg-transparent border-b !rounded-none"

    const handleClick = (asc: number, desc: number) => {
        onOrderChange(currentOrder == asc ? desc : asc);
    }

    return (
        <Table>
            <TableHeader>
                <TableColumn
                    className={`${columnClassname}`}
                >
                    <span></span>
                </TableColumn>
                <TableColumn
                    className={`${columnClassname}`}
                    onClick={() => handleClick(1, 2)}
                >
                    <CustomColumn
                        label='DNI'
                        asc={1}
                        desc={2}
                        currentOrder={currentOrder}
                    />
                </TableColumn>
                <TableColumn
                    className={`${columnClassname}`}
                    onClick={() => handleClick(3, 4)}
                >
                    <CustomColumn
                        label='Apellido Paterno'
                        asc={3}
                        desc={4}
                        currentOrder={currentOrder}
                    />
                </TableColumn>
                <TableColumn
                    className={`${columnClassname}`}
                    onClick={() => handleClick(5, 6)}
                >
                    <CustomColumn
                        label='Apellido Materno'
                        asc={5}
                        desc={6}
                        currentOrder={currentOrder}
                    />
                </TableColumn>
                <TableColumn
                    className={`${columnClassname}`}
                    onClick={() => handleClick(7, 8)}
                >
                    <CustomColumn
                        label='Nombres'
                        asc={7}
                        desc={8}
                        currentOrder={currentOrder}
                    />
                </TableColumn>
                <TableColumn
                    className={`${columnClassname}`}
                >
                    <span className='text-sm'>Teléfono</span>
                </TableColumn>
                <TableColumn
                    className={`${columnClassname}`}
                >
                    <span className='text-sm'>Celular</span>
                </TableColumn>
            </TableHeader>
            <TableBody>
                {loading ?
                    <TableRow>
                        <TableCell>{""}</TableCell>
                        <TableCell>{""}</TableCell>
                        <TableCell>{""}</TableCell>
                        <TableCell className='text-center'>
                            <Spinner
                                size='md'
                                color='success'
                            />
                        </TableCell>
                        <TableCell>{""}</TableCell>
                        <TableCell>{""}</TableCell>
                        <TableCell>{""}</TableCell>
                    </TableRow>
                    :
                    items.map((item) => (
                        <TableRow
                            className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                            as={Link}
                            href={`/sia/socios/${item.id}`}
                            target='_blank'
                        >
                            <TableCell className='rounded-l-xl'>
                                <Button
                                    size='sm'
                                    variant='flat'
                                    color={item.activo ? "success" : "danger"}
                                    className='w-12 font-semibold'
                                >
                                    {item.activo ? "Activo" : "Inactivo"}
                                </Button>
                            </TableCell>
                            <TableCell>{item.dni}</TableCell>
                            <TableCell>{item.apellido_paterno}</TableCell>
                            <TableCell>{item.apellido_materno}</TableCell>
                            <TableCell>{`${item.nombre} ${item.segundo_nombre}`}</TableCell>
                            <TableCell>{item.telefono}</TableCell>
                            <TableCell className='rounded-r-xl'>{item.celular}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default SearchSociosTable;


