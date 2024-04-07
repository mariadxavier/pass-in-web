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
import { attendees } from "../data/attendees";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/pt-br';
import { ChangeEvent, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export function AttendeeList() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(attendees.length/10);

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
    }

    function goToNextPage(){
        setPage(page + 1);
    }

    function goToPreviousPage(){
        setPage(page - 1);
    }

    function goToLastPage(){
        setPage(totalPages);
    }

    function goToFirstPage(){
        setPage(1);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl- font-bold">Participantes</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg  text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        className="bg-transparent outline-none flex-1 border-0 p-0 text-sm"
                        placeholder="Buscar Participante..."
                    />
                </div>
            </div>

            <Table>
                <thead className="">
                    <tr className="border-b border-white/10 ">
                        <Tableheader
                            style={{ width: 48 }}
                        >
                            <input
                                type="checkbox"
                                className="size-4 bg-black/20 rounded border border-white/10 hover:cursor-pointer"
                            />
                        </Tableheader>
                        <Tableheader>
                            Código
                        </Tableheader>
                        <Tableheader>
                            Participante
                        </Tableheader>
                        <Tableheader>
                            Data de inscrição
                        </Tableheader>
                        <Tableheader>
                            Data do check-in
                        </Tableheader>
                        <Tableheader
                            style={{ width: 64 }}
                        ></Tableheader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice( ((page - 1) * 10), (page * 10 )).map((attendee) => {
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
                                <TableCell>
                                {attendee.id}
                                </TableCell>
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
                                {dayjs(attendee.checkedInAt).toNow()}
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
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        <TableCell
                            className="text-right"
                            colSpan={3}
                        >
                            <div className="inline-flex items-center gap-8 ">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page===1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page===1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page===totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page===totalPages}>
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
