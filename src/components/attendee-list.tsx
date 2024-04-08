import {
    Search,
    MoreHorizontal,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { Tableheader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    checkedInAt: string | null;
}

export function AttendeeList() {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString());

        if (url.searchParams.has("search")) {
            return String(url.searchParams.get("search"));
        }
        return '';

    });
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());

        if (url.searchParams.has("page")) {
            return Number(url.searchParams.get("page"));
        }

        return 1;
    });
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        const url = new URL(
            "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
        );
        url.searchParams.set("pageIndex", String(page - 1));

        if (search.length > 0) {
            url.searchParams.set("query", search);
        }
        fetch(url).then((response) =>
            response.json().then((data) => {
                setAttendees(data.attendees);
                setTotal(data.total);
            })
        );
    }, [page, search]);

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value);
        setCurrentPage(1);
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());
        url.searchParams.set("page", String(page));
        window.history.pushState({}, "", url);
        setPage(page);
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString());
        url.searchParams.set("search", search);
        window.history.pushState({}, "", url);
        setSearch(search);
    }

    function goToNextPage() {
        setCurrentPage(page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1);
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl- font-bold">Participantes</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg  text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        onChange={onSearchInputChanged} value={search}
                        className="bg-transparent outline-none flex-1 border-0 p-0 text-sm focus:ring-0"
                        placeholder="Buscar Participante..."
                    />
                </div>
            </div>

            <Table>
                <thead className="">
                    <tr className="border-b border-white/10 ">
                        <Tableheader style={{ width: 48 }}>
                            <input
                                type="checkbox"
                                className="size-4 bg-black/20 rounded border border-white/10 hover:cursor-pointer"
                            />
                        </Tableheader>
                        <Tableheader>Código</Tableheader>
                        <Tableheader>Participante</Tableheader>
                        <Tableheader>Data de inscrição</Tableheader>
                        <Tableheader>Data do check-in</Tableheader>
                        <Tableheader style={{ width: 64 }}></Tableheader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow
                                key={attendee.id}
                                className="border-b border-white/10 hover:bg-white/5"
                            >
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        className="size-4 bg-black/20 rounded border border-white/10 hover:cursor-pointer "
                                    />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">
                                            {attendee.name}
                                        </span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {dayjs().to(attendee.createdAt)}
                                </TableCell>
                                <TableCell>
                                    {attendee.checkedInAt === null ? (
                                        <span className="text-zinc-500">
                                            Não fez check-in
                                        </span>
                                    ) : (
                                        dayjs().to(attendee.checkedInAt)
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell
                            className="py-3 px-4 text-sm text-zinc-300"
                            colSpan={3}
                        >
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8 ">
                                <span>
                                    Página {page} de {totalPages}
                                </span>
                                <div className="flex gap-1.5">
                                    <IconButton
                                        onClick={goToFirstPage}
                                        disabled={page === 1}
                                    >
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToPreviousPage}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToNextPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToLastPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}
