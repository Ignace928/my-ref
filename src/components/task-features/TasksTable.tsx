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
import { CheckCircle, Circle, Eye, EyeOff, LoaderPinwheel, LucideCircleX, MoreHorizontal, Plus, VerifiedIcon } from "lucide-react";
import { useTaskVm } from "./useTasksVm";
import { TaskType } from "@/src/lib/Model/Task";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import dynamic from "next/dynamic";
import { DialogConfirm } from "../features/modal";
import { toast } from "sonner";
import TaskManager from "./TaskManager";
import { MiniConfetti } from "../features/ConfetiButton";

const TaskForm = dynamic(
  () => import("./TaskForms").then(mod => mod.TaskForm),
  { ssr: false }
);



export function TasksTable({initialData, userId}:{initialData:TaskType[], userId:string}){
    const [newTask, setNewTask] = useState<boolean>(false)
    const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);
    const [taskViwer, setTaskViwer] = useState<TaskType | null>(null)
    const [globalFilter, setGlobalFilter] = useState("");
    const [confettiTaskId, setConfettiTaskId] = useState<string | null>(null);

    // ✅ on passe le userId injecté par le serveur
    const { data: liveData, isLoading, error, updateTask } = useTaskVm(userId);
    
    const finishTask = async (data: TaskType, taskId: string) => {
        await updateTask.mutateAsync({input: data, id: taskId})
            .then((t) => {
                toast.success("Tâche effectué", {
                    description: `Titre: ${t.title}`
                })

                setConfettiTaskId("activate")
                setTimeout(() => setConfettiTaskId(null), 10000);
            }).catch(err => {
                console.log(err)
            })
    }

    // const confettiboom = () => {
    //     setConfettiTaskId("activate")
    //     setTimeout(() => setConfettiTaskId(null), 2000);
    // }


    
    const columns = useMemo<ColumnDef<TaskType>[]>(() => [
    {
      accessorKey: "isPublic",
      header: "",
      cell: (info) => (info.getValue() ? <Eye height={15} width={15} /> : <EyeOff height={15} width={15} />)
    },
    { accessorKey: "title", header: "Titre" },
    { accessorKey: "description", header: "Description", maxSize: 10 },
    {
      accessorKey: "date",
      header: "Date fin",
      cell: (info) => {
        const value = info.getValue() as Date | null;
        if (!value) return "—";
        return new Date(value).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
      }
    },
    { 
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
                const deadline = new Date(row.original.date);
                const now = new Date();
                const isSuccess = row.original.status !== "En cours"
                const isExpired = deadline.getTime() < now.getTime()

                return (
                    <div className="relative flex items-end">
                        {

                            isSuccess ? (
                                    <CheckCircle className="text-primary"/>
                                ) : isExpired ? (
                                    <LucideCircleX className="text-destructive"/>
                                ) : (
                                    <Circle className=""/>
                                )
                        }
                    </div>
                )
            }            
    },
    {
      id: "action",
      cell: ({ row }) => {
        const task = row.original;
        return (
            <TaskManager task={task} let_edit={setTaskViwer} let_delete={setTaskToDelete} endTask={finishTask}>
                <MoreHorizontal/>
            </TaskManager>
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [setTaskToDelete]);



     
    const table = useReactTable(
        useMemo(() => ({
            data: liveData ?? initialData,
            columns,
            state: { globalFilter },
            onGlobalFilterChange: setGlobalFilter,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
        }), [liveData, initialData, globalFilter, columns])
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
            <MiniConfetti active={confettiTaskId === "activate"} />
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
                            <TableRow className="cursor-pointer" key={row.id} >
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
                                <div className="sticky top-7/12 z-2 p-2 flex flex-col items-center gap-3">
                                    Aucune donnée trouvée
                                    <Button onClick={() => setNewTask(true)} variant="secondary" className="rounded-full w-15 h-15 font-bold border-2 border-dashed border-primary cursor-pointer">
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                    <p>Nouveau täche</p>
                                </div>
                            </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>

            <section className="sm:hidden grid mx-2 min-[400px]:grid-cols-2 gap-4 mt-4">
                {
                table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => {
                                const deadline = new Date(row.original.date);
                                const now = new Date();
                                const isSuccess = row.original.status !== "En cours"
                                const isExpired = deadline.getTime() < now.getTime()
                                return(
                                    <Card className="
                                        cursor-pointer h-80
                                        shadow-sm
                                        transition-all duration-300 ease-out
                                        rounded-xl
                                        
                                        hover:-translate-y-1
                                        hover:scale-[1.02]
                                        hover:z-0

                                        hover:shadow-[0px_0px_8px_var(--primary)]" key={row.id}>
                                        
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">

                                                

                                                <div className="w-8 flex justify-start">
                                                    {row.original.isPublic ? (
                                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                                    ) : (
                                                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                </div>

                                                <CardTitle className="flex-1 text-center text-base font-semibold truncate px-2">
                                                    {row.original.title.length > 10 ? row.original.title.slice(0, 10) + "…" : row.original.title}
                                                </CardTitle>

                                                <div className="w-8 flex justify-end">
                                                    <TaskManager
                                                        task={row.original}
                                                        let_edit={setTaskViwer}
                                                        let_delete={setTaskToDelete}
                                                        endTask={finishTask}
                                                    >
                                                        <MoreHorizontal className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
                                                    </TaskManager>
                                                </div>
                                                
                                            </div>
                                        </CardHeader>

                                        <CardContent className="flex h-100 flex-col gap-2 text-sm text-muted-foreground">
                                            <p className="text-center">📌</p>
                                            <p className="line-clamp-4 text-center">
                                            {row.original.description || "Aucune description"}
                                            </p>
                                        </CardContent>

                                        <CardFooter className="flex justify-between items-center">
                                            <p className="text-xs text-muted-foreground">
                                                Deadline: {row.original.date.toLocaleDateString()}
                                            </p>

                                            {isSuccess ? (
                                                <Badge variant='secondary'><VerifiedIcon className="text-green-500"/></Badge>
                                            ) : isExpired ? (
                                                <Badge variant="destructive">échec</Badge>
                                            ) : (
                                                <Badge variant='secondary'>Pending</Badge>
                                            )}
                                        </CardFooter>
                                    </Card>
                                    
                                )
                            })
                        ) : (
                        <Card className="h-80 pt-1/2 items-center text-center text-gray-500">
                            <CardTitle>
                                Aucun tâche trouvée
                            </CardTitle>

                            <CardContent>
                                <div className=" z-2 p-2 flex flex-col items-center gap-3">
                                    <Button onClick={() => setNewTask(true)} variant="secondary" className="rounded-full w-15 h-15 font-bold border-2 border-dashed border-primary">
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                    <p>Add</p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
            </section>

            
            {
            //
            //🧶Modale confirmation de suppression
            //
            taskToDelete && (
                <DialogConfirm
                    currentUser={userId}
                    isDeleteOpen={!!taskToDelete}
                    setIsDeleteOpen={(open) => !open && setTaskToDelete(null)}
                    onClose={() => setTaskToDelete(null)}
                    task={taskToDelete}
                />
            )}
            
        </div>
    )
}