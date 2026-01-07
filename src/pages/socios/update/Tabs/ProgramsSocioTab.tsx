import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { SearchSocioProgramaPivotsParams, SocioProgramaPivot } from "../../../../types/socioProgramaPivots";
import { searchSocioProgramaPivotsRequest } from "../../../../store/features/socioProgramaPivots/socioProgramaPivotsSlice";
import { Button, Card, Code, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { MotivoBajaPrograma, perPageOptions } from "../../../../types/combos";
import CustomColumn from "../../../../components/layout/CustomColumn";
import { DateToDMY } from "../../../../helper/utils/Format";
import InscriptionSocioProgramModal from "../modals/programs/InscriptionSocioProgramModal";
import UpdateSocioProgramModal from "../modals/programs/UpdateProgramModal";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";

export interface SocioTabProps {
    socioId: number;
}

const ProgramsSocioTab: React.FC<SocioTabProps> = ({ socioId }) => {
    const dispatch = useDispatch();

    const programasSocio = useSelector((state: RootState) => state.socioProgramaPivots as PaginatedState<SocioProgramaPivot>);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [order, setOrder] = useState<undefined | number>(3);
    const [search, setSearch] = useState<undefined | string>(undefined);
    const [itemsPerPage, setItemsPerPage] = useState<undefined | number>(10);

    const [openInscription, setOpenInscription] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);

    const [selectedProgram, setSelectedProgram] = useState<undefined | SocioProgramaPivot>(undefined);


    useEffect(() => {
        if (!openInscription && !openUpdate) {
            makeSearch();
        }
    }, [page, order, itemsPerPage, openInscription, openUpdate]);

    useEffect(() => {
        if (selectedProgram !== undefined && selectedProgram !== null) {
            if (selectedProgram?.fecha_baja === null) {
                setOpenUpdate(true);
            }
        }
    }, [selectedProgram]);

    const buildParams = (): SearchSocioProgramaPivotsParams => {
        var params: SearchSocioProgramaPivotsParams = {
            page: page,
            body: {
                socio_id: socioId,
                order: order,
                search: search,
                per_page: itemsPerPage
            }
        }

        return params;
    }

    const makeSearch = () => {
        var params = buildParams();
        dispatch(searchSocioProgramaPivotsRequest(params));
    }

    const handleClick = (asc: number, desc: number) => {
        setOrder(order == asc ? desc : asc);
    }



    return (
        <Card className="w-full flex flex-col gap-16 p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Input
                        size='sm'
                        variant='flat'
                        placeholder="Búsqueda"
                        className="w-96"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                makeSearch();
                            }
                        }}
                        endContent={<DynamicFaIcon name="FaSearch" size={16} btnInput={true} onClick={() => makeSearch()} />
                        }
                        value={search}
                        onChange={(e) => setSearch(e.target.value != "" ? e.target.value : undefined)}
                    />
                    <Button
                        size="sm"
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={() => setOpenInscription(true)}
                    >
                        Inscribir nuevo
                    </Button>
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="bg-cyan-900 text-white"
                                endContent={<DynamicFaIcon name="FaAngleDown" size={16} className="text-gray-100" />}
                                variant="solid"
                                size="sm"
                            >
                                Exportar
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                key={1}
                                endContent={<DynamicFaIcon name="FaFileExcel" className="!text-emerald-500" />}
                            >
                                Exportar a Excel
                            </DropdownItem>
                            <DropdownItem
                                key={2}
                                endContent={<DynamicFaIcon name="FaFilePdf" className="!text-danger" />}
                            >
                                Exportar a PDF
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="">
                    {
                        programasSocio.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : programasSocio.error ? <span>{programasSocio.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${programasSocio.data?.from} - ${programasSocio.data?.to} de ${programasSocio.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={programasSocio.data?.last_page ?? 1}
                                        page={programasSocio.data?.current_page}
                                        onChange={(v) => setPage(v)}
                                    >

                                    </Pagination>
                                    <Select
                                        size="sm"
                                        variant="flat"
                                        className="w-20"
                                        labelPlacement="outside"
                                        selectedKeys={[String(itemsPerPage)]}
                                        onChange={(e) => {
                                            setItemsPerPage(parseInt(e.target.value));
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
            <Table
                removeWrapper
            >
                <TableHeader>
                    <TableColumn
                        className={`${TABLE_COLUMN_CLASSNAME}`}
                        onClick={() => handleClick(1, 2)}
                    >
                        <CustomColumn
                            label='Fecha de Inscripción'
                            asc={1}
                            desc={2}
                            currentOrder={order}
                        />
                    </TableColumn>
                    <TableColumn
                        className={`${TABLE_COLUMN_CLASSNAME}`}
                        onClick={() => handleClick(3, 4)}
                    >
                        <CustomColumn
                            label='Programa'
                            asc={3}
                            desc={4}
                            currentOrder={order}
                        />
                    </TableColumn>
                    <TableColumn
                        className={`${TABLE_COLUMN_CLASSNAME}`}
                        onClick={() => handleClick(5, 6)}
                    >
                        <CustomColumn
                            label='Costo Mensual'
                            asc={5}
                            desc={6}
                            currentOrder={order}
                        />
                    </TableColumn>
                    <TableColumn
                        className={`${TABLE_COLUMN_CLASSNAME}`}
                        onClick={() => { }}
                    >
                        <span className='text-sm'>Fecha de Baja</span>
                    </TableColumn>
                    <TableColumn
                        className={`${TABLE_COLUMN_CLASSNAME}`}
                        onClick={() => { }}
                    >
                        <span className='text-sm'>Motivo</span>
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {programasSocio.loading ? (
                        <TableRow>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>Cargando...</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell>{''}</TableCell>
                        </TableRow>
                    ) : (
                        (programasSocio.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setSelectedProgram(item)}
                            >
                                <TableCell className='rounded-l-xl'>{DateToDMY(item.fecha_inscripcion)}</TableCell>
                                <TableCell>{item.programa?.nombre}</TableCell>
                                <TableCell>{item.costo_mensual}</TableCell>
                                <TableCell>
                                    {
                                        item.fecha_baja ?
                                            <Code className="font-sans" color="danger">{DateToDMY(item.fecha_baja)}</Code>
                                            :
                                            <></>
                                    }
                                </TableCell>
                                <TableCell className='rounded-r-xl'>{item.motivo_baja ? MotivoBajaPrograma.at(item.motivo_baja - 1)?.label : '-'}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {
                openInscription && <InscriptionSocioProgramModal
                    socioId={socioId}
                    value={openInscription}
                    setValue={() => setOpenInscription(false)}
                    setShouldRefresh={() => setShouldRefresh(false)}
                />
            }
            {
                openUpdate && <UpdateSocioProgramModal
                    item={selectedProgram!}
                    value={openUpdate}
                    setValue={() => setOpenUpdate(false)}
                    setShouldRefresh={() => setShouldRefresh(false)}
                />
            }
        </Card >
    );
}

export default ProgramsSocioTab;