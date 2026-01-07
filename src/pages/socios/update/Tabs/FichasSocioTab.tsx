import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Link, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { Entity, PaginatedState } from "../../../../types/commons";
import { AForm } from "../../../../types/aform";
import { indexAFormsRequest } from "../../../../store/features/forms/AForm/AFormSlice";
import { socioForms } from "../../../../types/combos";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import { DateToDMY } from "../../../../helper/utils/Format";
import { useSearchParams } from "react-router-dom";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { indexBFormsRequest } from "../../../../store/features/forms/BForm/BFormSlice";
import { BForm } from "../../../../types/bform";
import { CForm } from "../../../../types/cform";
import { indexCFormsRequest } from "../../../../store/features/forms/CForm/CFormSlice";
import { DForm } from "../../../../types/dform";
import { indexDFormsRequest } from "../../../../store/features/forms/DForm/DFormSlice";
import { EForm } from "../../../../types/eform";
import { indexEFormsRequest } from "../../../../store/features/forms/EForm/EFormSlice";

export interface SocioTabProps {
    socioId: number;
}

const FichasSocioTab: React.FC<SocioTabProps> = ({ socioId }) => {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const urlForm = searchParams.get("form") ?? '0';

    const [selectedForm, setSelectedForm] = useState<number>(parseInt(urlForm));
    const [page, setPage] = useState<undefined | number>(undefined);

    const aform = useSelector((state: RootState) => state.aForm as PaginatedState<AForm>);
    const bform = useSelector((state: RootState) => state.bForm as PaginatedState<BForm>);
    const cform = useSelector((state: RootState) => state.cForm as PaginatedState<CForm>);
    const dform = useSelector((state: RootState) => state.dForm as PaginatedState<DForm>);
    const eform = useSelector((state: RootState) => state.eForm as PaginatedState<EForm>);

    const [form, setForm] = useState<PaginatedState<Entity> | null>(null);

    useEffect(() => {
        makeQuery();
    }, [selectedForm])

    useEffect(() => {
        switch (selectedForm) {
            case 0:
                setForm(aform);
                break;
            case 1:
                setForm(bform);
                break;
            case 2:
                setForm(cform);
                break;
            case 3:
                setForm(dform);
                break;
            case 4:
                setForm(eform);
                break;
            default:
                break;
        }
    }, [aform, bform, cform, dform, eform])

    const makeQuery = () => {
        switch (selectedForm) {
            case 0:
                dispatch(indexAFormsRequest(socioId.toString()));
                break;
            case 1:
                dispatch(indexBFormsRequest(socioId.toString()));
                break;
            case 2:
                dispatch(indexCFormsRequest(socioId.toString()));
                break;
            case 3:
                dispatch(indexDFormsRequest(socioId.toString()));
                break;
            case 4:
                dispatch(indexEFormsRequest(socioId.toString()));
                break;
            default:
                break;
        }
    }

    return (
        <Card className="w-full flex flex-col gap-8 p-10">
            <Select
                size="sm"
                variant="flat"
                className="w-full"
                label="Tipo de ficha:"
                labelPlacement="outside-left"
                selectedKeys={selectedForm !== null ? [String(selectedForm)] : []}
                onChange={(e) => {
                    const value = e.target.value;

                    if (!value) {
                        setSelectedForm(-1); // ✅ nunca NaN
                        return;
                    }

                    setSelectedForm(Number(value));
                }}
            >
                {socioForms.map((item) => (
                    <SelectItem key={item.key} className="text-xs">
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <Divider />
            {
                selectedForm === -1 ?
                    <div className="w-full text-center">
                        <span className="text-sm">Selecciona un tipo de ficha</span>
                    </div>
                    :
                    <div className="w-full">
                        {
                            aform.loading ? <div>Cargando...</div> :
                                <div className="w-full flex flex-col gap-8">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div className="w-2/3 flex flex-row justify-start items-center gap-4">
                                            <span className="font-semibold ">{socioForms.at(selectedForm)?.label}</span>
                                            <Button
                                                className="bg-cyan-900 text-white"
                                                endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                                                variant="solid"
                                                size="sm"
                                                as={Link}
                                                href={`/sia/fichas/${socioForms.at(selectedForm)?.code}/${socioId}`}
                                            >
                                                Agregar
                                            </Button>
                                            <Button
                                                className="bg-emerald-500 text-white"
                                                variant="solid"
                                                size="sm"
                                                onPress={makeQuery}
                                                isLoading={aform.loading || bform.loading}
                                            >
                                                Buscar
                                            </Button>
                                        </div>
                                        {form?.data?.total === 0 ? <></> : <div className="w-1/3 flex flex-row justify-end items-center gap-4">
                                            <span className="text-sm text-gray-500">{`${form?.data?.from} - ${form?.data?.to} de ${form?.data?.total}`}</span>
                                            <Pagination
                                                size="sm"
                                                variant="flat"
                                                classNames={{
                                                    wrapper: "gap-2",
                                                    cursor: "bg-emerald-500 text-white"
                                                }}
                                                total={form?.data?.last_page ?? 1}
                                                page={form?.data?.current_page}
                                                onChange={(v) => setPage(v)}
                                            />
                                        </div>}
                                    </div>
                                    <Table removeWrapper>
                                        <TableHeader>
                                            <TableColumn className={`${TABLE_COLUMN_CLASSNAME}`}>
                                                Folio
                                            </TableColumn>
                                            <TableColumn className={`${TABLE_COLUMN_CLASSNAME}`}>
                                                Creada:
                                            </TableColumn>
                                            <TableColumn className={`${TABLE_COLUMN_CLASSNAME}`}>
                                                Última actualización
                                            </TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                (form?.data?.data ?? []).map((item) => (
                                                    <TableRow
                                                        key={item.id}
                                                        className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                                        as={Link}
                                                        href={`/sia/fichas/${socioForms.at(selectedForm)?.code}/${socioId}/${item.id}`}
                                                    >
                                                        <TableCell>{socioForms.at(selectedForm)?.code}-{item.id}</TableCell>
                                                        <TableCell>{DateToDMY(item.created_at)}</TableCell>
                                                        <TableCell>{DateToDMY(item.updated_at)}</TableCell>
                                                    </TableRow>
                                                ))
                                            }

                                        </TableBody>
                                    </Table>
                                </div>
                        }
                    </div>
            }
        </Card>
    );
}

export default FichasSocioTab;