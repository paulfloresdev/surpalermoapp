import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { SearchSociosBody, SearchSociosParams, Socio } from "../../types/socios";
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { activeFilter, perPageOptions } from "../../types/combos";
import SearchSociosTable from "../../components/layout/SearchSociosTable";
import { PaginatedState } from "../../types/commons";
import { searchSociosRequest } from "../../store/features/socios/sociosSlice";
import StoreSocioModal from "./store/StoreSocioModal";
import { searchSociosAPI } from "../../helper/api/backend";
import { getFilenameFromDisposition } from "./update/tabs/SocioFilesTab";
import LoadingReport from "../../components/layout/LoadingReport";

const SociosPage: React.FC = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: RootState) => state.socios as PaginatedState<Socio>);
    const [page, setPage] = useState<undefined | number>(undefined);
    const [order, setOrder] = useState<undefined | number>(undefined);
    const [search, setSearch] = useState<undefined | string>(undefined);
    const [isActive, setIsActive] = useState<undefined | number>(undefined);
    const [itemsPerPage, setItemsPerPage] = useState<undefined | number>(10);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const buildParams = (excel = false): SearchSociosParams => {
        const body: SearchSociosBody = {
            order,
            search,
            is_active: isActive == 1 ? true : isActive == 2 ? false : undefined,
            per_page: itemsPerPage,
            excel: excel
        }

        const params: SearchSociosParams = {
            page,
            body: body
        }

        return params;
    }

    useEffect(() => {
        var params = buildParams();
        dispatch(searchSociosRequest(params));
    }, [])

    useEffect(() => {
        if (!openStore) {
            if (shouldRefresh) {
                var params = buildParams();
                dispatch(searchSociosRequest(params));
            }
            setShouldRefresh(true);
        }
    }, [page, order, itemsPerPage, openStore])

    const handleOrderChange = (newOrderValue: number) => {
        setOrder(newOrderValue);
        setPage(1); // Opcional: Reinicia a la página 1 al reordenar
    };

    const updateSearch = () => {
        setPage(1);
        var params = buildParams();
        dispatch(searchSociosRequest(params));
    }

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await searchSociosAPI(params);

            const contentType = String(
                res.headers?.["content-type"] ?? res.headers?.["Content-Type"] ?? ""
            );

            // Si NO es xlsx, seguramente es JSON/HTML (error). Léelo y muestra mensaje.
            if (!contentType.includes("application/vnd.openxmlformats-officedocument")) {
                const data = res.data;

                const text =
                    data instanceof Blob
                        ? await data.text()
                        : typeof data === "string"
                            ? data
                            : JSON.stringify(data);

                let message = text;

                try {
                    const json = JSON.parse(text);
                    message = json?.message ?? message;
                } catch { }

                throw new Error(message);
            }

            // Normaliza a Blob real
            const data = res.data;
            const blob =
                data instanceof Blob
                    ? data
                    : new Blob([data], {
                        type:
                            contentType ||
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });

            const cd =
                (res.headers?.["content-disposition"] as string | undefined) ??
                (res.headers?.["Content-Disposition"] as string | undefined);

            const filenameFromHeader = getFilenameFromDisposition(cd);
            const filename = filenameFromHeader ?? "socios.xlsx";

            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(blobUrl);
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error?.message || "No se pudo descargar",
                color: "danger",
            });
        } finally {
            setDownloading(false);
        }
    };


    if (downloading) {
        return <LoadingReport />;
    }


    return (
        <div className="w-full h-full flex flex-col gap-2">
            <span className="font-semibold text-lg">Socios</span>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-x-4 items-center">
                    <Input
                        size='sm'
                        variant='flat'
                        placeholder="Búsqueda"
                        className="w-96"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                updateSearch();
                            }
                        }}
                        endContent={
                            <DynamicFaIcon
                                name="FaSearch"
                                size={16}
                                btnInput={true}
                                onClick={updateSearch}
                            />
                        }
                    />
                    <Select
                        size="sm"
                        variant="underlined"
                        className="w-32"
                        placeholder="Estatus"
                        labelPlacement="outside"
                        value={isActive}
                        onChange={(e) => {
                            setIsActive(parseInt(e.target.value));
                        }}
                    >
                        {activeFilter.map((item) => (
                            <SelectItem
                                key={item.key}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="bg-cyan-900 text-white"
                                endContent={<DynamicFaIcon name="FaAngleDown" size={16} className="text-white" />}
                                variant="solid"
                                size="sm"
                            >
                                Exportar
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                key={1}
                                endContent={<DynamicFaIcon name="FaFileExcel" className="!text-emerald-500" />}
                                onPress={downloadExcel}
                            >
                                Exportar a Excel
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        disableRipple
                        className="bg-emerald-500 text-white"
                        endContent={<DynamicFaIcon name="FaPlus" size={16} className="text-white" />}
                        variant="solid"
                        size="sm"
                        onPress={() => setOpenStore(true)}
                    >
                        Agregar
                    </Button>
                </div>
                <div className="">
                    {
                        loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : error ? <span>{error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${data?.from} - ${data?.to} de ${data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={data?.last_page ?? 1}
                                        page={data?.current_page}
                                        onChange={(v) => setPage(v)}
                                    >

                                    </Pagination>
                                    <Select
                                        size="sm"
                                        variant="flat"
                                        className="w-20"
                                        labelPlacement="outside"
                                        selectedKeys={[String(itemsPerPage)]}
                                        onChange={(e) => {
                                            setItemsPerPage(parseInt(e.target.value));
                                        }}
                                    >
                                        {perPageOptions.map((item) => (
                                            <SelectItem
                                                className="text-xs"
                                                key={item.key}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                    }
                </div>
            </div>
            <div className="mb-4">

            </div>
            <>
                {
                    error ?
                        <></>
                        :
                        <SearchSociosTable
                            items={data?.data ?? []}
                            onOrderChange={handleOrderChange}
                            currentOrder={order}
                            loading={loading}
                        />
                }
            </>
            {
                openStore && <StoreSocioModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div >
    );
}

export default SociosPage;