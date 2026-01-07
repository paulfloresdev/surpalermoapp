import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import TabCard from "../../../../components/TabCard";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { setUpdateSocioForm } from "../../../../store/features/forms/UpdateSocioFormSlice";
import { BoolParse, DateToInput, SKey, YNParse } from "../../../../helper/utils/Format";
import { SexCombo, YNCombo } from "../../../../types/combos";
import { ListState } from "../../../../types/commons";
import { Departamento } from "../../../../types/departamentos";
import CustomSkeleton from "../../../../components/CustomSkeleton";
import { Localidad } from "../../../../types/localidades";

const PersonalSocioTab: React.FC = () => {
    const dispatch = useDispatch();

    const { data } = useSelector((state: RootState) => state.updateSocioForm);

    const departamentos = useSelector((state: RootState) => state.departamentos as ListState<Departamento>);
    const localidades = useSelector((state: RootState) => state.localidades as ListState<Localidad>);

    return (
        <TabCard>
            <Input
                placeholder="Fecha Ingreso"
                label="Fecha Ingreso"
                labelPlacement="outside"
                type="date"
                value={DateToInput(data?.fecha_ingreso)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "fecha_ingreso", value: new Date(e.target.value) }));
                }}
            />
            <Select
                required
                placeholder="Activo"
                label="Activo*"
                labelPlacement="outside"
                value={YNParse(data?.activo)}
                selectedKeys={YNParse(data?.activo)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "activo", value: BoolParse(e.target.value) }));
                }}
                color={YNParse(data?.activo) == '1' ? 'success' : 'danger'}
            >
                {YNCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
            <Input
                placeholder="DNI"
                label="DNI"
                labelPlacement="outside"
                value={data?.dni}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "dni", value: e.target.value }));
                }}
            />
            <Input
                required
                placeholder="Nombre"
                label="Nombre*"
                labelPlacement="outside"
                value={data?.nombre}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "nombre", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Segundo Nombre"
                label="Segundo Nombre"
                labelPlacement="outside"
                value={data?.segundo_nombre ?? ""}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "segundo_nombre", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Apellido Paterno"
                label="Apellido Paterno"
                labelPlacement="outside"
                value={data?.apellido_paterno}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "apellido_paterno", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Apellido Materno"
                label="Apellido Materno"
                labelPlacement="outside"
                value={data?.apellido_materno}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "apellido_materno", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Expiración DNI"
                label="Expiración DNI"
                labelPlacement="outside"
                type="date"
                value={DateToInput(data?.dni_expiracion)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "dni_expiracion", value: new Date(e.target.value) }));
                }}
            />
            <Select
                required
                placeholder="Con BPS"
                label="Con BPS*"
                labelPlacement="outside"
                value={YNParse(data?.con_bps)}
                selectedKeys={YNParse(data?.con_bps)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "con_bps", value: BoolParse(e.target.value) }));
                }}
            >
                {YNCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
            <Input
                placeholder="Calle"
                label="Calle"
                labelPlacement="outside"
                value={data?.calle}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "calle", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Número"
                label="Número"
                labelPlacement="outside"
                value={data?.numero}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "numero", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Apto"
                label="Apto"
                labelPlacement="outside"
                value={data?.apto ?? ""}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "apto", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Barrio"
                label="Barrio"
                labelPlacement="outside"
                value={data?.barrio}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "barrio", value: e.target.value }));
                }}
            />
            <>
                {
                    departamentos.loading ?
                        <CustomSkeleton /> :
                        <Select
                            required
                            placeholder="Departamento"
                            label="Departamento"
                            labelPlacement="outside"
                            value={data?.departamento_id?.toString() ?? ""}
                            selectedKeys={SKey(data?.departamento_id)}
                            onChange={(e) => {
                                dispatch(setUpdateSocioForm({ key: "departamento_id", value: parseInt(e.target.value) }));
                            }}
                        >
                            {departamentos.data && departamentos.data.map((option) => (
                                <SelectItem key={option.id}>{option.nombre}</SelectItem>
                            ))}
                        </Select>
                }
            </>
            <>
                {
                    localidades.loading ?
                        <CustomSkeleton /> :
                        <Select
                            required
                            placeholder="Localidad"
                            label="Localidad*"
                            labelPlacement="outside"
                            value={data?.localidad_id?.toString() ?? ""}
                            selectedKeys={SKey(data?.localidad_id)}
                            onChange={(e) => {
                                dispatch(setUpdateSocioForm({ key: "localidad_id", value: parseInt(e.target.value) }));
                            }}
                        >
                            {localidades.data && localidades.data.map((option) => (
                                <SelectItem key={option.id}>{option.nombre}</SelectItem>
                            ))}
                        </Select>
                }
            </>
            <Input
                placeholder="Teléfono"
                label="Teléfono"
                labelPlacement="outside"
                value={data?.telefono}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "telefono", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Email"
                label="Email"
                labelPlacement="outside"
                value={data?.email}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "email", value: e.target.value }));
                }}
            />
            <Input
                size="sm"
                placeholder="Celular"
                label="Celular"
                labelPlacement="outside"
                value={data?.celular}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "celular", value: e.target.value }));
                }}
            />
            <Select
                required
                placeholder="Sexo"
                label="Sexo*"
                labelPlacement="outside"
                value={data?.sexo?.toString()}
                selectedKeys={data?.sexo?.toString()}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "sexo", value: parseInt(e.target.value) }));
                }}
            >
                {SexCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
            <Input
                placeholder="Fecha Nacimiento"
                label="Fecha Nacimiento"
                labelPlacement="outside"
                type="date"
                value={DateToInput(data?.fecha_nacimiento)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "fecha_nacimiento", value: new Date(e.target.value) }));
                }}
            />
            <Select
                required
                placeholder="Pensión"
                label="Pensión"
                labelPlacement="outside"
                value={YNParse(data?.pension)}
                selectedKeys={YNParse(data?.pension)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "pension", value: BoolParse(e.target.value) }));
                }}
            >
                {YNCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
            <Textarea
                placeholder="Obs. Pensión"
                label="Obs. Pensión"
                labelPlacement="outside"
                value={data?.obs_pension}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "obs_pension", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Contacto"
                label="Contacto"
                labelPlacement="outside"
                value={data?.contacto}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "contacto", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Anterior"
                label="Anterior"
                labelPlacement="outside"
                value={data?.anterior}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "anterior", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Actual"
                label="Actual"
                labelPlacement="outside"
                value={data?.actual}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "actual", value: e.target.value }));
                }}
            />
            <Input
                placeholder="Fecha Baja"
                label="Fecha Baja"
                labelPlacement="outside"
                type="date"
                value={DateToInput(data?.fecha_baja)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "fecha_baja", value: new Date(e.target.value) }));
                }}
            />
            <Select
                required
                placeholder="Fallecido"
                label="Fallecido"
                labelPlacement="outside"
                value={YNParse(data?.fallecido)}
                selectedKeys={YNParse(data?.fallecido)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "fallecido", value: BoolParse(e.target.value) }));
                }}
            >
                {YNCombo.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
            </Select>
        </TabCard>
    );
}

export default PersonalSocioTab;