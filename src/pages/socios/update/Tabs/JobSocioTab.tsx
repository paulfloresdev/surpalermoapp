import React from "react";
import TabCard from "../../../../components/TabCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { BoolParse, DateToInput, YNParse } from "../../../../helper/utils/Format";
import { setUpdateSocioForm } from "../../../../store/features/forms/UpdateSocioFormSlice";
import { YNCombo } from "../../../../types/combos";

const JobSocioTab: React.FC = () => {
    const dispatch = useDispatch();

    const { data } = useSelector((state: RootState) => state.updateSocioForm);

    return (
        <TabCard>
            <div>
                <Select
                    required
                    placeholder="Trabajo"
                    label="Trabajo"
                    labelPlacement="outside"
                    value={YNParse(data?.trabajo)}
                    selectedKeys={YNParse(data?.trabajo)}
                    onChange={(e) => {
                        dispatch(setUpdateSocioForm({ key: "trabajo", value: BoolParse(e.target.value) }));
                    }}
                >
                    {YNCombo.map((option) => (
                        <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                </Select>
            </div>
            <Input
                placeholder="Último Trabajo"
                label="Último Trabajo"
                labelPlacement="outside"
                type="date"
                value={DateToInput(data?.fecha_ultimo_trabajo)}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "fecha_ultimo_trabajo", value: new Date(e.target.value) }));
                }}
            />
            <Textarea
                placeholder="Tareas"
                label="Tareas"
                labelPlacement="outside"
                value={data?.tareas}
                onChange={(e) => {
                    dispatch(setUpdateSocioForm({ key: "tareas", value: e.target.value }));
                }}
            />
        </TabCard>
    );
}

export default JobSocioTab;