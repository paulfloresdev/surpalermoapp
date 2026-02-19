import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { GetUsersParams, User } from "../../types/auth";
import { getUsersRequest } from "../../store/features/auth/authSlice";
import { Button, Pagination, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Input } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { perPageOptions } from "../../types/combos";

const UsuariosPage: React.FC = () => {
    const dispatch = useDispatch();

    const columnClassname = "bg-transparent border-b !rounded-none"

    const auth = useSelector((state: RootState) => state.auth);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);

    const [search, setSearch] = useState<undefined | string>(undefined);
    const [role, _setRole] = useState<undefined | string>(undefined);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);

    const [updateUser, setUpdateUser] = useState<undefined | User>(undefined);
    const [destroyUser, setDestroyUser] = useState<undefined | User>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
            setShouldRefresh(true);
        }
    }, [page, perPage, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateUser !== undefined && updateUser !== null) {
            setOpenUpdate(true);
        }
    }, [updateUser]);

    useEffect(() => {
        if (destroyUser !== undefined && destroyUser !== null) {
            setOpenDestroy(true);
        }
    }, [destroyUser]);

    const buildParams = (): GetUsersParams => {
        const params: GetUsersParams = {
            page,
            body: {
                per_page: perPage,
                role: role,
                search: search
            }
        }

        return params;
    }

    const makeSearch = () => {
        var params = buildParams();
        dispatch(getUsersRequest(params));
    }

    if (auth.loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-3/5 mx-auto h-full flex flex-col gap-2">
            <span className="font-semibold text-lg">Usuarios</span>
            <div className="flex flex-row items-center justify-between">
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
                            setPage(1);
                            makeSearch();
                        }
                    }}
                    endContent={
                        <DynamicFaIcon
                            name="FaSearch"
                            size={16}
                            btnInput={true}
                            onClick={() => {
                                setPage(1);
                                makeSearch();
                            }}
                        />
                    }
                />
                <Button
                    disableRipple
                    className="bg-cyan-900 text-white"
                    endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                    variant="solid"
                    size="sm"
                    onPress={() => setOpenStore(true)}
                >
                    Agregar
                </Button>
                <div className="">
                    {
                        auth.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : auth.error ? <span>{auth.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${auth.users?.from} - ${auth.users?.to} de ${auth.users?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={auth.users?.last_page ?? 1}
                                        page={auth.users?.current_page}
                                        onChange={(v) => setPage(v)}
                                    >

                                    </Pagination>
                                    <Select
                                        size="sm"
                                        variant="flat"
                                        className="w-20"
                                        labelPlacement="outside"
                                        selectedKeys={[String(perPage)]}
                                        onChange={(e) => {
                                            setPerPage(parseInt(e.target.value));
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
            <Table className="mt-4">
                <TableHeader>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Nombre</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Email</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Rol</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname} w-10`}>
                        {""}
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {auth.loading ?
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell className='text-center'>
                                <Spinner
                                    size='md'
                                    color='success'
                                />
                            </TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                        :
                        (auth.users?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setUpdateUser(item)}
                            >
                                <TableCell className='rounded-l-xl'>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell className='rounded-r-xl p-2'>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        className="w-10 min-w-10 p-0"
                                        onPress={() => setDestroyUser(item)}
                                    >
                                        <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {/*
                openStore && <StoreProgramaModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateProgramaModal
                    item={updateUser!}
                    setItem={setUpdateUser}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyProgramaModal
                    item={destroyUser!}
                    setItem={setDestroyUser}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            */}
        </div>
    );
}

export default UsuariosPage;
