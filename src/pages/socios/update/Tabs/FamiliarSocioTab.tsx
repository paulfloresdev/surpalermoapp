import React from "react";
import TabCard from "../../../../components/TabCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { Input, Textarea } from "@heroui/react";
import { setUpdateSocioForm } from "../../../../store/features/forms/UpdateSocioFormSlice";

const FamiliarSocioTab: React.FC = () => {
    const dispatch = useDispatch();

    const { data } = useSelector((state: RootState) => state.updateSocioForm);

    return (
        <TabCard>
            <Input
                placeholder="Teléfono Persona de Contacto"
                label="Teléfono Persona de Contacto"
                labelPlacement="outside"
                value={data?.telefono_nucleo}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "telefono_nucleo", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Contacto Extra Familiar"
                label="Contacto Extra Familiar"
                labelPlacement="outside"
                value={data?.extra_familiar}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "extra_familiar", value: e.target.value }));
                }}
            />
            <Textarea
                placeholder="Nucleo Familiar"
                label="Nucleo Familiar"
                labelPlacement="outside"
                value={data?.nucleo_familiar}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "nucleo_familiar", value: e.target.value }));
                }}
            />
        </TabCard>
    );
}

export default FamiliarSocioTab;