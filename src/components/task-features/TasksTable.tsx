"use client";
import { 
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { EyeIcon, LoaderPinwheel, Plus, VerifiedIcon } from "lucide-react";
import { useTaskVm } from "./useTasksVm";
import { TaskType } from "@/src/lib/Model/Task";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import dynamic from "next/dynamic";

const TaskForm = dynamic(
  () => import("./TaskForms").then(mod => mod.TaskForm),
  { ssr: false }
);



export const columns: ColumnDef<TaskType>[]= [
    {
        accessorKey:"title",
        header:"Titre"
    },
    {
        accessorKey:"description",
        header:"Description", 
        maxSize:16
    },
    {
        accessorKey:"isPublic",
        header:"Visibilité",
        cell: (info) => (info.getValue() ? ("Public"):("Privé"))
    },
    {
    accessorKey: "date",
    header: "Date fin",
    cell: (info) => {
        const value = info.getValue() as Date | null;
        if (!value) return "—";

        const d = new Date(value);
        return d.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    },

    {
        accessorKey:"status", 
        header:"Status"
    },
    // {
    //     id:"action",
    //     header:"Action",
    //     cell:({row}) => {
    //         const task = row.original; // <-- récupération de la ligne
    //         return(
    //             <Button onClick={()=>console.log(task)}></Button>
    //         )
    //     }
    // },
]

export function TasksTable({initialData, userId}:{initialData:TaskType[], userId:string}){
    const [newTask, setNewTask] = useState<boolean>(false)
    const [taskViwer, setTaskViwer] = useState<TaskType | null>(null)
    const [globalFilter, setGlobalFilter] = useState("");
    
    
    // ✅ on passe le userId injecté par le serveur
  const { data: liveData, isLoading, error } = useTaskVm(userId);

    const table = useReactTable(
        useMemo(() => ({
            data: liveData ?? initialData,
            columns,
            state: { globalFilter },
            onGlobalFilterChange: setGlobalFilter,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
        }), [liveData, initialData, globalFilter])
    );


    if(isLoading) return(
            <Card className="items-center text-center">
                Mise en Cache...
                <LoaderPinwheel className="animate-spin text-primary"/>
            </Card>
        )
    if(error) return <p className="p-4 text-red-500">Erreur de chargement</p>

    return taskViwer ? (
        <div>
            <div className="flex flex-row sticky top-15 p-2 backdrop-blur-2xl">
                <Button variant={'secondary'} onClick={() => setTaskViwer(null)} className="rounded-full w-10 h-10 font-bold cursor-pointer transform rotate-135"><Plus className="w-50 h-50"/></Button>
            </div>
            <TaskForm currentUser={userId} task={taskViwer} onClose={()=>setTaskViwer(null)} />
        </div>
    ): newTask ? (
        <div>
            <div className="flex flex-row sticky top-15 p-2 backdrop-blur-2xl">
                <Button variant={'secondary'} onClick={() => setNewTask(false)} className="rounded-full w-10 h-10 font-bold cursor-pointer transform rotate-135"><Plus className="w-50 h-50"/></Button>
            </div>
            <TaskForm currentUser={userId} onClose={() => setNewTask(false)}/>
        </div>
    ):(
        <div className="">
            <div className="sticky top-16 z-2 bg-background border-b p-2 flex items-center gap-3">
                <Button onClick={() => setNewTask(true)} className="rounded-full w-10 h-10 font-bold">
                    <Plus className="w-5 h-5" />
                </Button>
                <Input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Rechercher une tâche…"
                    className="border p-2 rounded w-64"
                />
            </div>
            <section  className="hidden sm:flex mx-2">
                <Table>
                    {/* ---------------- HEADER ---------------- */}
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="font-semibold">
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    {/* ---------------- BODY ---------------- */}
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow className="cursor-pointer" key={row.id} onClick={
                                ()=>{
                                    setTaskViwer(row.original)
                                }
                            }>
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-4 text-gray-500"
                            >
                                Aucune donnée trouvée
                            </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>
            <section className="sm:hidden grid mx-2 min-[400px]:grid-cols-2 gap-4">
                {
                table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                            <Card className="
                                cursor-pointer h-100
                                shadow-sm
                                transition-all duration-300 ease-out
                                rounded-xl
                                
                                hover:-translate-y-1
                                hover:scale-[1.02]
                                hover:z-0

                                hover:shadow-[0px_0px_8px_var(--primary)]" 
                                    key={row.id} onClick={
                                ()=>{
                                    setTaskViwer(row.original)
                                }
                            }>
                                {row.original.isPublic ? <EyeIcon className="mx-2"/> :""}
                                <CardTitle className="text-center">{row.original.title}</CardTitle>
                                <CardContent className="h-100 ">
                                    📌{row.original.description}
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">Deadline: {row.original.date.toLocaleDateString()}</p>
                                    {row.original.status === "En cours" ? (
                                        <Badge variant='secondary'>Pending</Badge>
                                    ) : row.original.status === "erreur" ? (
                                        <Badge variant="destructive">échec</Badge>
                                    ) : (
                                        <Badge variant='secondary'><VerifiedIcon className="text-green-500"/></Badge>
                                    )}
                                </CardFooter>
                            </Card>
                            ))
                        ) : (
                        <Card className="h-100 items-center text-center">
                            <div className="sticky top-16 z-2 bg-background border-b p-2 flex items-center gap-3">
                                <Button onClick={() => setNewTask(true)} className="rounded-full w-10 h-10 font-bold">
                                    <Plus className="w-5 h-5" />
                                </Button>
                            </div>
                            <CardContent className="w-full">
                                Aucun tâche trouvée
                            </CardContent>
                        </Card>
                    )
                }
            </section>
        </div>
    )
}