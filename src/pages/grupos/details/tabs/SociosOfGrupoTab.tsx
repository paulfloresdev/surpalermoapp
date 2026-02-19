import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { GetSociosByGrupoParams, SocioGrupoPivot } from "../../../../types/socioGrupoPivots";
import { getSociosByGrupoRequest } from "../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";
import { Button, Card, Code, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { MotivoBajaPrograma, perPageOptions, YNCombo } from "../../../../types/combos";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import { BoolParse, DateToDMY, YNParse } from "../../../../helper/utils/Format";

export interface GroupTab {
    grupoId: number;
    editable?: boolean
}

const SociosOfGrupoTab: React.FC<GroupTab> = ({ grupoId }) => {
    const dispatch = useDispatch();

    const socios = useSelector((state: RootState) => state.socioGrupoPivots as PaginatedState<SocioGrupoPivot>);

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [activo, setActivo] = useState<boolean | undefined>(undefined);
    const [baja, setBaja] = useState<boolean | undefined>(undefined);
    const [openFilters, setOpenFilters] = useState(false);

    useEffect(() => {
        makeSearch();
    }, [page, itemsPerPage])

    const buildParams = (): GetSociosByGrupoParams => {

        if (baja === undefined && activo === undefined) {
            return {
                page,
                body: search !== undefined && search !== "" ? {
                    grupo_id: grupoId,
                    per_page: itemsPerPage,
                    search: search,
                } : {
                    grupo_id: grupoId,
                    per_page: itemsPerPage,
                }
            }
        }

        return {
            page,
            body: search !== undefined && search !== "" ? {
                grupo_id: grupoId,
                per_page: itemsPerPage,
                search: search,
                activo: activo,
                baja: baja
            } : {
                grupo_id: grupoId,
                per_page: itemsPerPage,
                activo: activo,
                baja: baja
            }
        }
    }

    const makeSearch = () => {
        dispatch(getSociosByGrupoRequest(buildParams()));
    }

    const removeFilters = () => {
        setActivo(undefined);
        setBaja(undefined);
        setOpenFilters(false);

        const params: GetSociosByGrupoParams = {
            page,
            body: search !== undefined && search !== "" ? {
                grupo_id: grupoId,
                per_page: itemsPerPage,
                search: search,
            } : {
                grupo_id: grupoId,
                per_page: itemsPerPage,
            }
        }

        dispatch(getSociosByGrupoRequest(params));
    }

    return (
        <Card className="w-full flex flex-col gap-8 p-10">
            {/* Filtros */}
            {openFilters && (
                <div className="w-full flex flex-col gap-2">
                    <span className="text-sm font-medium">Filtros</span>
                    <div className="w-5/12 flex flex-row gap-4 items-center">
                        <Select
                            size="sm"
                            required
                            placeholder="Activo"
                            label="Activo"
                            labelPlacement="outside-left"
                            value={YNParse(activo)}
                            selectedKeys={YNParse(activo)}
                            onChange={(e) => {
                                setActivo(BoolParse(e.target.value))
                            }}
                        >
                            {YNCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                        <Select
                            size="sm"
                            required
                            placeholder="Baja"
                            label="Baja"
                            labelPlacement="outside-left"
                            value={YNParse(baja)}
                            selectedKeys={YNParse(baja)}
                            onChange={(e) => {
                                setBaja(BoolParse(e.target.value))
                            }}
                        >
                            {YNCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                        <Button
                            size="sm"
                            variant="flat"
                            className="min-w-fit bg-emerald-500 text-white"
                            onPress={() => {
                                setOpenFilters(false);
                                makeSearch();
                            }}
                        >
                            Aplicar
                        </Button>
                        <Button
                            size="sm"
                            variant="flat"
                            className="min-w-fit bg-gray-500 text-white"
                            onPress={() => removeFilters()}
                        >
                            Borrar filtros
                        </Button>
                    </div>
                </div>
            )}
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Button
                        size="sm"
                        className={`${!openFilters ? "bg-gray-500" : "bg-gray-300"} text-white`}
                        startContent={<DynamicFaIcon name={"FaFilter"} className="text-white" size={14} />}
                        variant="solid"
                        onPress={() => {
                            if (activo === undefined && baja === undefined) {
                                setBaja(false);
                                setActivo(true);
                            }
                            setOpenFilters(!openFilters)
                        }}
                        disabled={openFilters}
                    >
                    </Button>

                    <Input
                        size="sm"
                        variant="flat"
                        placeholder="Búsqueda por nombre"
                        className="w-96"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                makeSearch();
                            }
                        }}
                        endContent={
                            <DynamicFaIcon
                                name="FaSearch"
                                size={16}
                                btnInput={true}
                                onClick={() => makeSearch()}
                            />
                        }
                    />
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
                {!socios.loading && !socios.error && (
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {`${socios.data?.from} - ${socios.data?.to} de ${socios.data?.total}`}
                        </span>

                        <Pagination
                            size="sm"
                            variant="flat"
                            classNames={{ wrapper: "gap-2", cursor: "bg-emerald-500 text-white" }}
                            total={socios.data?.last_page ?? 1}
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
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Activo</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Fecha Baja</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Motivo</TableColumn>
                </TableHeader>

                <TableBody>
                    {socios.loading ? (
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>Cargando...</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    ) : (
                        (socios.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => { }}
                            >
                                <TableCell className='rounded-l-xl'>{`${item.socio.apellido_paterno ?? ''} ${item.socio.apellido_materno ?? ''} ${item.socio.nombre ?? ''} ${item.socio.segundo_nombre ?? ''}`}</TableCell>
                                <TableCell>{item.socio.dni}</TableCell>
                                <TableCell>
                                    <Button
                                        size='sm'
                                        variant='flat'
                                        color={item.socio.activo ? "success" : "danger"}
                                        className='w-12 font-semibold'
                                    >
                                        {item.socio.activo ? "Activo" : "Inactivo"}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {item.fecha_baja && (
                                        <Code className="font-sans" color="danger">
                                            {DateToDMY(item.fecha_baja)}
                                        </Code>
                                    )}
                                </TableCell>
                                <TableCell className='rounded-r-xl'>{item.motivo_baja ? MotivoBajaPrograma.at(item.motivo_baja - 1)?.label : '-'}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}

export default SociosOfGrupoTab;