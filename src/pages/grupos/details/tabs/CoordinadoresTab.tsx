import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { Coordinador, IndexCoordinadoresParams } from "../../../../types/coordinadores";
import { indexCoordinadoresRequest } from "../../../../store/features/coordinadores/coordinadoresSlice";
import { Card, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import { perPageOptions } from "../../../../types/combos";
import StoreCoordinadorModal from "../modals/StoreCoordinadorModal";
import DestroyCoordinadorModal from "../modals/DestroyCoordinadorModal";
import { GroupTab } from "./SociosOfGrupoTab";

const CoordinadoresTab: React.FC<GroupTab> = ({ grupoId, editable = false }) => {
    const dispatch = useDispatch();

    const coordinadores = useSelector((state: RootState) => state.coordinadores as PaginatedState<Coordinador>)

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);

    const [destroyCoordinador, setDestroyCoordinador] = useState<undefined | Coordinador>(undefined);

    useEffect(() => {
        if (!openStore && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
    }, [page, itemsPerPage, openStore, openDestroy]);

    useEffect(() => {
        if (destroyCoordinador !== undefined && destroyCoordinador !== null) {
            setOpenDestroy(true);
        }
    }, [destroyCoordinador]);

    const buildParams = (): IndexCoordinadoresParams => {
        return {
            page,
            per_page: itemsPerPage,
            grupo_id: grupoId
        }
    }

    const makeSearch = () => {
        dispatch(indexCoordinadoresRequest(buildParams()));
    }

    return (
        <Card className="w-full flex flex-col gap-8 p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    {
                        !editable ? <></> :
                            <Button
                                disableRipple
                                className="min-w-fit bg-emerald-500 text-white"
                                endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                                variant="solid"
                                size="sm"
                                onPress={() => setOpenStore(true)}
                            >
                                Agregar coordinador
                            </Button>
                    }
                    {/* Dropdown export */}
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="bg-cyan-900 text-white"
                                endContent={<DynamicFaIcon name="FaAngleDown" size={16} className="!text-white" />}
                                variant="solid"
                                size="sm"
                            >
                                Exportar
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key={1}>Exportar Excel</DropdownItem>
                            <DropdownItem key={2}>Exportar PDF</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {/* Pagination + items per page */}
                {!coordinadores.loading && !coordinadores.error && (
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {`${coordinadores.data?.from} - ${coordinadores.data?.to} de ${coordinadores.data?.total}`}
                        </span>

                        <Pagination
                            size="sm"
                            variant="flat"
                            classNames={{ wrapper: "gap-2", cursor: "bg-emerald-500 text-white" }}
                            total={coordinadores.data?.last_page ?? 1}
                            page={page} // 🔒 CONTROLADO (no depende del backend)
                            onChange={(v) => setPage(v)}
                        />

                        <Select
                            size="sm"
                            variant="flat"
                            className="w-20"
                            selectedKeys={[String(itemsPerPage)]}
                            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                        >
                            {perPageOptions.map((item) => (
                                <SelectItem key={item.key} className="text-xs">
                                    {item.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                )}
            </div>

            {/* Tabla */}
            <Table removeWrapper>
                <TableHeader>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Nombre</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>DNI</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Email</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Teléfono</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Celular</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>{''}</TableColumn>
                </TableHeader>

                <TableBody>
                    {coordinadores.loading ? (
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>Cargando...</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    ) : (
                        (coordinadores.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => { }}
                            >
                                <TableCell className='rounded-l-xl'>{`${item.docente.nombre ?? ''} ${item.docente.apellido ?? ''}`}</TableCell>
                                <TableCell>{item.docente.dni}</TableCell>
                                <TableCell>{item.docente.email}</TableCell>
                                <TableCell>{item.docente.telefono}</TableCell>
                                <TableCell>{item.docente.celular}</TableCell>
                                <TableCell className='rounded-r-xl'>
                                    {
                                        !editable ? <></> :
                                            <Button
                                                variant="flat"
                                                color="danger"
                                                className="w-10 min-w-10 p-0"
                                                onPress={() => setDestroyCoordinador(item)}
                                            >
                                                <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                            </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {
                openStore && <StoreCoordinadorModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                    grupoId={grupoId}
                />
            }
            {
                openDestroy && <DestroyCoordinadorModal
                    item={destroyCoordinador!}
                    setItem={setDestroyCoordinador}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </Card>
    );
}

export default CoordinadoresTab;
