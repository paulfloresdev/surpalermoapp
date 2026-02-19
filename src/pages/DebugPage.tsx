import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/configStore/store";
import { ItemState } from "../types/commons";
import { Grupo } from "../types/grupos";

const DebugPage: React.FC = () => {

    // OJO: exactamente como lo usas en tu modal
    const grupos = useSelector(
        (state: RootState) => state.grupos as ItemState<Grupo>
    );

    // Log en consola cada cambio
    useEffect(() => {
        console.log("📡 grupos.storeSuccess cambió:", grupos.storeSuccess);
        console.log("📝 mensaje:", grupos.message);
        console.log("⏳ loading:", grupos.loading);
        console.log("❌ error:", grupos.error);
    }, [grupos.storeSuccess, grupos.loading, grupos.error]);

    return (
        <div style={{ padding: 30, fontFamily: "monospace" }}>
            <h2>Monitor Redux - grupos.storeSuccess</h2>

            <div style={{ marginTop: 20 }}>
                <p><strong>loading:</strong> {String(grupos.loading)}</p>
                <p><strong>storeSuccess:</strong> {String(grupos.storeSuccess)}</p>
                <p><strong>message:</strong> {grupos.message ?? "null"}</p>
                <p><strong>error:</strong> {grupos.error ?? "null"}</p>
            </div>

            <p style={{ marginTop: 20, color: "#888" }}>
                Abre la consola para ver logs en tiempo real.
            </p>
        </div>
    );
};

export default DebugPage;
