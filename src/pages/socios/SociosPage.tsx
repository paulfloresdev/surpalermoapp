import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { SearchSociosBody, SearchSociosParams, Socio } from "../../types/socios";
import { searchSociosRequest } from "../../store/features/socios/search/searchSociosSlice";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { activeFilter, perPageOptions } from "../../types/combos";
import SearchSociosTable from "../../components/layout/SearchSociosTable";
import { PaginatedState } from "../../types/commons";

const SociosPage: React.FC = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: RootState) => state.searchSocios as PaginatedState<Socio>);
    const [page, setPage] = useState<undefined | number>(undefined);
    const [order, setOrder] = useState<undefined | number>(undefined);
    const [search, setSearch] = useState<undefined | string>(undefined);
    const [isActive, setIsActive] = useState<undefined | number>(undefined);
    const [itemsPerPage, setItemsPerPage] = useState<undefined | number>(10);

    const buildParams = (): SearchSociosParams => {
        const body: SearchSociosBody = {
            order,
            search,
            is_active: isActive == 1 ? true : isActive == 2 ? false : undefined,
            per_page: itemsPerPage
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
        var params = buildParams();
        dispatch(searchSociosRequest(params));
    }, [page, order, itemsPerPage])

    const handleOrderChange = (newOrderValue: number) => {
        setOrder(newOrderValue);
        setPage(1); // Opcional: Reinicia a la página 1 al reordenar
    };

    const updateSearch = () => {
        setPage(0);
        var params = buildParams();
        dispatch(searchSociosRequest(params));
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
                        endContent={<DynamicFaIcon name="FaSearch" size={16} className="text-gray-300" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                    <Button
                        size="sm"
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={updateSearch}
                    >
                        Buscar
                    </Button>
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="bg-gray-800 text-white"
                                endContent={<DynamicFaIcon name="FaAngleDown" size={16} className="text-gray-50" />}
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
                            >
                                Exportar a Excel
                            </DropdownItem>
                            <DropdownItem
                                key={2}
                                endContent={<DynamicFaIcon name="FaFilePdf" className="!text-danger" />}
                            >
                                Exportar a PDF
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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

        </div >
    );
}

export default SociosPage;