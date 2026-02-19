import React, { useEffect, useState } from "react";
import { GroupTab } from "./SociosOfGrupoTab";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { DocenteForm, IndexDocenteFormsParams } from "../../../../types/docenteForms";
import { indexDocenteFormsRequest } from "../../../../store/features/docenteForms/docenteFormsSlice";
import { Card, Select, SelectItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import { DateToDMY } from "../../../../helper/utils/Format";
import { perPageOptions } from "../../../../types/combos";

const DocenteFormsTab: React.FC<GroupTab> = ({ grupoId, editable = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const forms = useSelector((state: RootState) => state.docenteForms as PaginatedState<DocenteForm>);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        makeSearch();
    }, [page, itemsPerPage]);

    const buildParams = (): IndexDocenteFormsParams => {
        return {
            page,
            per_page: itemsPerPage,
            grupo_id: grupoId
        }
    }

    const makeSearch = () => {
        dispatch(indexDocenteFormsRequest(buildParams()));
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
                                onPress={() => navigate(`/sia/mantenimiento/grupos/${grupoId}/detalle/ficha-docente`)}
                            >
                                Nueva ficha
                            </Button>
                    }
                    {/* Dropdown export */}
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="min-w-fit bg-cyan-900 text-white"
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
                {!forms.loading && !forms.error && (
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {`${forms.data?.from} - ${forms.data?.to} de ${forms.data?.total}`}
                        </span>

                        <Pagination
                            size="sm"
                            variant="flat"
                            classNames={{ wrapper: "gap-2", cursor: "bg-emerald-500 text-white" }}
                            total={forms.data?.last_page ?? 1}
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
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Folio</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Fecha</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Docente</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Coordinador</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Actualizado</TableColumn>
                </TableHeader>

                <TableBody>
                    {forms.loading ? (
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>Cargando...</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    ) : (
                        (forms.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate(`/sia/mantenimiento/grupos/${grupoId}/detalle/ficha-docente/${item.id}`)}
                            >
                                <TableCell className='rounded-l-xl'>#{item.id}</TableCell>
                                <TableCell>{DateToDMY(item.date_of)}</TableCell>
                                <TableCell>{`${item.docente.nombre ?? ''} ${item.docente.apellido ?? ''}`}</TableCell>
                                <TableCell>{`${item.coordinador.nombre ?? ''} ${item.coordinador.apellido ?? ''}`}</TableCell>
                                <TableCell className='rounded-r-xl'>{DateToDMY(item.updated_at)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}

export default DocenteFormsTab;
