import React from "react";
import TabCard from "../../../../components/TabCard";
import { Input, Textarea } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { setUpdateSocioForm } from "../../../../store/features/forms/UpdateSocioFormSlice";
import { DateToInput } from "../../../../helper/utils/Format";
import { SocioTabProps } from "./PersonalSocioTab";

const SchoolSocioTab: React.FC<SocioTabProps> = ({ editable }) => {
    const dispatch = useDispatch();

    const { data } = useSelector((state: RootState) => state.updateSocioForm);

    return (
        <TabCard>
            <Textarea
                disabled={!editable}
                placeholder="Estudios Realizados"
                label="Estudios Realizados"
                labelPlacement="outside"
                value={data?.estudios}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "estudios", value: e.target.value }));
                }}
            />
            <Textarea
                disabled={!editable}
                placeholder="Último Aprobado"
                label="Último Aprobado"
                labelPlacement="outside"
                value={data?.ultimo_aprobado}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "ultimo_aprobado", value: e.target.value }));
                }}
            />
            <Textarea
                disabled={!editable}
                placeholder="Cursos"
                label="Cursos"
                labelPlacement="outside"
                value={data?.cursos}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "cursos", value: e.target.value }));
                }}
            />
            <Input
                disabled={!editable}
                placeholder="Último Curso"
                label="Último Curso"
                labelPlacement="outside"
                type="date"
                value={DateToInput(data?.ultimo_curso)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "ultimo_curso", value: new Date(e.target.value).toDateString() }));
                }}
            />
        </TabCard>
    );
}

export default SchoolSocioTab;