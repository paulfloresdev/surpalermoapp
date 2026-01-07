import React, { useEffect } from "react";
import TabCard from "../../../../components/TabCard";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { setUpdateSocioForm } from "../../../../store/features/forms/UpdateSocioFormSlice";
import { BoolParse, SKey, YNParse } from "../../../../helper/utils/Format";
import { YNCombo } from "../../../../types/combos";
import { ListState } from "../../../../types/commons";
import { Mutualista } from "../../../../types/mutualistas";
import { Emergencia } from "../../../../types/emergencias";
import CustomSkeleton from "../../../../components/CustomSkeleton";

const MedicalSocioTab: React.FC = () => {
    const dispatch = useDispatch();

    const { data } = useSelector((state: RootState) => state.updateSocioForm);

    const mutualistas = useSelector((state: RootState) => state.mutualistas as ListState<Mutualista>);
    const emergencias = useSelector((state: RootState) => state.emergencias as ListState<Emergencia>);

    useEffect(() => {
        console.log(data?.mutualista_id);
    }, []);

    return (
        <TabCard>
            <Textarea
                placeholder="Dervidado por"
                label="Derividado por"
                labelPlacement="outside"
                value={data?.derivado}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "derivado", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Diagnostico"
                label="Diagnostico"
                labelPlacement="outside"
                value={data?.diagnostico}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "diagnostico", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Medicación"
                label="Medicación"
                labelPlacement="outside"
                value={data?.medicacion}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "medicacion", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Antecedentes Médicos"
                label="Antecedentes Médicos"
                labelPlacement="outside"
                value={data?.antecedentes_medicos}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "antecedentes_medicos", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Antecedentes Familiares"
                label="Antecedentes Familiares"
                labelPlacement="outside"
                value={data?.antecedentes_familiar}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "antecedentes_familiar", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Antecedentes Psiquiátricos"
                label="Antecedentes Psiquiátricos"
                labelPlacement="outside"
                value={data?.antecedentes_psiq}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "antecedentes_psiq", value: e.target.value }));
                }}
            />
            <Select
                required
                placeholder="Carnet de Asistencia"
                label="Carnet de Asistencia"
                labelPlacement="outside"
                value={YNParse(data?.carnet_asistencia)}
                selectedKeys={YNParse(data?.carnet_asistencia)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "carnet_asistencia", value: BoolParse(e.target.value) }));
                }}
            >
                {YNCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
            <>
                {
                    mutualistas.loading ?
                        <CustomSkeleton /> :
                        <Select
                            required
                            placeholder="Mutualista Socio"
                            label="Mutualista Socio"
                            labelPlacement="outside"
                            value={data?.mutualista_id?.toString() ?? ""}
                            selectedKeys={SKey(data?.mutualista_id)}
                            onChange={(e) => {
                                dispatch(setUpdateSocioForm({ key: "mutualista_id", value: parseInt(e.target.value) }));
                            }}
                        >
                            {mutualistas.data && mutualistas.data?.map((option) => (
                                <SelectItem key={option.id}>{option.nombre}</SelectItem>
                            ))}
                        </Select>

                }
            </>
            <>
                {
                    emergencias.loading ?
                        <CustomSkeleton /> :
                        <Select
                            required
                            placeholder="Emergencia"
                            label="Emergencia"
                            labelPlacement="outside"
                            value={data?.emergencia_id?.toString()}
                            selectedKeys={SKey(data?.emergencia_id)}
                            onChange={(e) => {
                                dispatch(setUpdateSocioForm({ key: "emergencia_id", value: parseInt(e.target.value) }));
                            }}
                        >
                            {emergencias.data && emergencias.data.map((option) => (
                                <SelectItem key={option.id}>{option.nombre}</SelectItem>
                            ))}
                        </Select>
                }
            </>
            <Select
                required
                placeholder="Convenio Mixto"
                label="Convenio Mixto"
                labelPlacement="outside"
                value={YNParse(data?.convenio_mixto)}
                selectedKeys={YNParse(data?.convenio_mixto)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "convenio_mixto", value: BoolParse(e.target.value) }));
                }}
            >
                {YNCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
            <>
                {
                    mutualistas.loading ?
                        <CustomSkeleton /> :
                        <Select
                            required
                            placeholder="Mutualista Convenio"
                            label="Mutualista Convenio"
                            labelPlacement="outside"
                            value={data?.mutualista_convenio_id?.toString()}
                            selectedKeys={SKey(data?.mutualista_convenio_id)}
                            onChange={(e) => {
                                dispatch(setUpdateSocioForm({ key: "mutualista_convenio_id", value: parseInt(e.target.value) }));
                            }}
                        >
                            {mutualistas.data && mutualistas.data.map((option) => (
                                <SelectItem key={option.id}>{option.nombre}</SelectItem>
                            ))}
                        </Select>
                }
            </>
            <Input
                placeholder="Internaciones"
                label="Internaciones"
                labelPlacement="outside"
                value={data?.internaciones?.toString()}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "internaciones", value: parseInt(e.target.value) }));
                }}
            />
            <Input
                placeholder="Nro. IAE"
                label="Nro. IAE"
                labelPlacement="outside"
                value={data?.nroiae?.toString()}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "nroiae", value: parseInt(e.target.value) }));
                }}
            />
        </TabCard>
    );
}

export default MedicalSocioTab;