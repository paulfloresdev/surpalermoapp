import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { GroupForm, IndexGroupFormsParams } from "../../../../types/groupForms";
import { indexGroupFormsRequest } from "../../../../store/features/groupForms/groupFormsSlice";
import { Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import { DateToDMY } from "../../../../helper/utils/Format";
import { perPageOptions } from "../../../../types/combos";
import { useNavigate } from "react-router";
import { GroupTab } from "./SociosOfGrupoTab";

const GroupFormsTab: React.FC<GroupTab> = ({ grupoId, editable = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const forms = useSelector((state: RootState) => state.groupForms as PaginatedState<GroupForm>);

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [month, setMonth] = useState<number | undefined>(6);
    const [year, setYear] = useState<number | undefined>(2026);

    useEffect(() => {
        makeSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, month, year])

    const buildParams = (): IndexGroupFormsParams => {
        return {
            page,
            per_page: itemsPerPage,
            grupo_id: grupoId,
            month: month,
            year: year
        }
    }

    const makeSearch = () => {
        dispatch(indexGroupFormsRequest(buildParams()));
    }


    return (
        <Card className="w-full flex flex-col gap-8 p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Select
                        size="sm"
                        value={month?.toString()}
                        selectedKeys={[month?.toString() ?? ""]}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setMonth(Number(e.target.value));
                        }}
                    >
                        <SelectItem key={"6"}>Junio</SelectItem>
                        <SelectItem key={"12"}>Diciembre</SelectItem>
                    </Select>

                    <Input
                        value={year?.toString()}
                        type="number"
                        size="sm"
                        onChange={(e) => {
                            setYear(Number(e.target.value));
                        }}

                    />
                    {
                        !editable ? <></> :
                            <Button
                                disableRipple
                                className="min-w-fit bg-emerald-500 text-white"
                                endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                                variant="solid"
                                size="sm"
                                onPress={() => navigate(`/sia/mantenimiento/grupos/${grupoId}/detalle/ficha`)}
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
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Semestre</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Año</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Creado</TableColumn>
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
                                onClick={() => navigate(`/sia/mantenimiento/grupos/${grupoId}/detalle/ficha/${item.id}`)}
                            >
                                <TableCell className='rounded-l-xl'>#{item.id}</TableCell>
                                <TableCell>{item.month}</TableCell>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{DateToDMY(item.created_at)}</TableCell>
                                <TableCell className='rounded-r-xl'>{DateToDMY(item.updated_at)}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}

export default GroupFormsTab;