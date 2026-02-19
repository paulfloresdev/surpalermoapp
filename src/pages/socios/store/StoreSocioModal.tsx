import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Socio, SocioBody } from "../../../types/socios";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@heroui/react";
import { storeSocioRequest } from "../../../store/features/socios/sociosSlice";
import { SexCombo, YNCombo } from "../../../types/combos";
import { BoolParse, YNParse } from "../../../helper/utils/Format";

const StoreSocioModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const socios = useSelector((state: RootState) => state.socios as ItemState<Socio>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);
    const [checkApellidoPaterno, setCheckApellidoPaterno] = useState<boolean>(false);
    const [checkSexo, setCheckSexo] = useState<boolean>(false);
    const [checkConBps, setCheckConBps] = useState<boolean>(false);
    const [checkConvenioMixto, setCheckConvenioMixto] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [segundoNombre, setSegundoNombre] = useState<undefined | string>(undefined);
    const [apellidoPaterno, setApellidoPaterno] = useState<undefined | string>(undefined);
    const [apellidoMaterno, setApellidoMaterno] = useState<undefined | string>(undefined);
    const [dni, setDni] = useState<undefined | string>(undefined);
    const [fechaIngreso, setFechaIngreso] = useState<undefined | string>(undefined);
    const [sexo, setSexo] = useState<undefined | number>(undefined);
    const [conBps, setConBps] = useState<undefined | boolean>(undefined);
    const [convenioMixto, setConvenioMixto] = useState<undefined | boolean>(undefined);

    useEffect(() => {
        if (socios.storeSuccess !== null) {
            if (socios.storeSuccess) {
                addToast({
                    title: "OK",
                    description: socios.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: socios.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [socios.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setSegundoNombre(undefined);
        setApellidoPaterno(undefined);
        setApellidoMaterno(undefined);
        setDni(undefined);
        setFechaIngreso(undefined);
        setSexo(undefined);
        setConBps(undefined);
        setConvenioMixto(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const ckNombre = !nombre?.trim();
        const ckApellidoPaterno = !apellidoPaterno?.trim();
        const ckSexo = sexo === undefined;
        const ckConBps = conBps === undefined;
        const ckConvenioMixto = convenioMixto === undefined;

        setCheckNombre(ckNombre);
        setCheckApellidoPaterno(ckApellidoPaterno);
        setCheckSexo(ckSexo);
        setCheckConBps(ckConBps);
        setCheckConvenioMixto(ckConvenioMixto);

        const check = ckNombre || ckApellidoPaterno || ckSexo || ckConBps || ckConvenioMixto;

        if (check) return;

        var body: SocioBody = {
            nombre: nombre ?? "",
            segundo_nombre: segundoNombre,
            apellido_paterno: apellidoPaterno ?? "",
            apellido_materno: apellidoMaterno,
            dni: dni,
            fecha_ingreso: fechaIngreso,
            sexo: sexo,
            con_bps: conBps,
            convenio_mixto: convenioMixto,
            activo: true,
            fallecido: false
        }

        dispatch(storeSocioRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="5xl">
            <ModalContent>
                <ModalHeader>Agregar Socio</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-3 gap-8">
                        <Input
                            required
                            isInvalid={checkNombre}
                            placeholder="Nombre"
                            label="Nombre*"
                            labelPlacement="outside"
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Segundo nombre"
                            label="Segundo nombre"
                            labelPlacement="outside"
                            value={segundoNombre}
                            onChange={(e) => {
                                setSegundoNombre(e.target.value);
                            }}
                        />
                        <Input
                            required
                            isInvalid={checkApellidoPaterno}
                            placeholder="Apellido paterno"
                            label="Apellido paterno*"
                            labelPlacement="outside"
                            value={apellidoPaterno}
                            onChange={(e) => {
                                setApellidoPaterno(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Apellido materno"
                            label="Apellido materno"
                            labelPlacement="outside"
                            value={apellidoMaterno}
                            onChange={(e) => {
                                setApellidoMaterno(e.target.value);
                            }}
                        />
                        <Select
                            required
                            isInvalid={checkSexo}
                            placeholder="Sexo"
                            label="Sexo*"
                            labelPlacement="outside"
                            value={sexo}
                            onChange={(e) => {
                                setSexo(parseInt(e.target.value));
                            }}
                        >
                            {SexCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            placeholder="DNI"
                            label="DNI"
                            labelPlacement="outside"
                            value={dni}
                            onChange={(e) => {
                                setDni(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Fecha ingreso"
                            label="Fecha ingreso"
                            labelPlacement="outside"
                            value={fechaIngreso}
                            type="date"
                            onChange={(e) => {
                                setFechaIngreso(e.target.value);
                            }}
                        />
                        <Select
                            required
                            isInvalid={checkConBps}
                            placeholder="Con BPS"
                            label="Con BPS*"
                            labelPlacement="outside"
                            value={YNParse(conBps)}
                            onChange={(e) => {
                                setConBps(BoolParse(e.target.value));
                            }}
                        >
                            {YNCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                        <Select
                            required
                            isInvalid={checkConvenioMixto}
                            placeholder="Convenio mixto"
                            label="Convenio mixto*"
                            labelPlacement="outside"
                            value={YNParse(convenioMixto)}
                            onChange={(e) => {
                                setConvenioMixto(BoolParse(e.target.value));
                            }}
                        >
                            {YNCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={socios.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreSocioModal;