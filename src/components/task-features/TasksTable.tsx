import { TaskType } from "@/src/lib/Model/Task";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";

export function TasksTable({initialData}:{initialData:TaskType[]}){
    return(
        <div>
            {initialData.map(t=>(
                <Card key={t.id}>
                    <CardTitle>{t.title}</CardTitle>
                    <CardContent>
                        <p>{t.description}</p>
                    </CardContent>
                    <CardDescription>
                        DeadLine {t.date.toLocaleDateString()}
                        {t.isPublic ? "Il est visible":"PRIVé"}
                    </CardDescription>
                    <CardFooter>
                        {t.status}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}