import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { PaginatedParams, PaginatedState } from "../../types/commons";
import { paginatedEmergenciasRequest } from "../../store/features/emergencias/emergenciasSlice";
import { Button, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { Emergencia } from "../../types/emergencias";
import { perPageOptions } from "../../types/combos";
import StoreEmergenciaModal from "./modals/StoreEmergenciaModal";
import UpdateEmergenciaModal from "./modals/UpdateEmergenciaModal";
import DestroyEmergenciaModal from "./modals/DestroyEmergenciaModal";

const EmergenciasPage: React.FC = () => {
    const dispatch = useDispatch();

    const columnClassname = "bg-transparent border-b !rounded-none"

    const emergencias = useSelector((state: RootState) => state.emergencias as PaginatedState<Emergencia>);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);

    const [updateEmergency, setUpdateEmergency] = useState<undefined | Emergencia>(undefined);
    const [destroyEmergency, setDestroyEmergency] = useState<undefined | Emergencia>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
    }, [page, perPage, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateEmergency !== undefined && updateEmergency !== null) {
            setOpenUpdate(true);
        }
    }, [updateEmergency]);

    useEffect(() => {
        if (destroyEmergency !== undefined && destroyEmergency !== null) {
            setOpenDestroy(true);
        }
    }, [destroyEmergency])

    const buildParams = (): PaginatedParams => {
        const params: PaginatedParams = {
            page,
            body: {
                order: undefined,
                per_page: perPage
            }
        }

        return params;
    }

    const makeSearch = () => {
        var params = buildParams();
        dispatch(paginatedEmergenciasRequest(params));
    }

    return (
        <div className="w-1/2 mx-auto h-full flex flex-col gap-2">
            <span className="font-semibold text-lg">Emergencias</span>
            <div className="flex flex-row items-center justify-between">
                <Button
                    disableRipple
                    className="bg-cyan-900 text-white"
                    endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                    variant="solid"
                    size="sm"
                    onPress={() => setOpenStore(true)}
                >
                    Agregar
                </Button>
                <div className="">
                    {
                        emergencias.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : emergencias.error ? <span>{emergencias.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${emergencias.data?.from} - ${emergencias.data?.to} de ${emergencias.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={emergencias.data?.last_page ?? 1}
                                        page={emergencias.data?.current_page}
                                        onChange={(v) => setPage(v)}
                                    >

                                    </Pagination>
                                    <Select
                                        size="sm"
                                        variant="flat"
                                        className="w-20"
                                        labelPlacement="outside"
                                        selectedKeys={[String(perPage)]}
                                        onChange={(e) => {
                                            setPerPage(parseInt(e.target.value));
                                        }}
                                    >
                                        {perPageOptions.map((item) => (
                                            <SelectItem
                                                className="text-xs"
                                                key={item.key}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                    }
                </div>
            </div>
            <Table className="mt-4">
                <TableHeader>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Nombre</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Teléfono</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Dirección</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname} w-10`}>
                        {""}
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {emergencias.loading ?
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell className='text-center'>
                                <Spinner
                                    size='md'
                                    color='success'
                                />
                            </TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                        :
                        (emergencias.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setUpdateEmergency(item)}
                            >
                                <TableCell className='rounded-l-xl'>{item.nombre}</TableCell>
                                <TableCell>{item.telefono}</TableCell>
                                <TableCell>{item.direccion}</TableCell>
                                <TableCell className='rounded-r-xl'>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        className="w-10 min-w-10 p-0"
                                        onPress={() => setDestroyEmergency(item)}
                                    >
                                        <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {
                openStore && <StoreEmergenciaModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateEmergenciaModal
                    item={updateEmergency!}
                    setItem={setUpdateEmergency}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyEmergenciaModal
                    item={destroyEmergency!}
                    setItem={setDestroyEmergency}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div>
    );
}

export default EmergenciasPage;