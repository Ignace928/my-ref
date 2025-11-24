"use client";

import ModeSwitcher from "../Theme/modeChoose";
import ThemeSwitcher from "../Theme/themeChoose";
import { Card } from "../ui/card";


export const HeaderBar = () => {
    return(
        <Card className="flex flex-row rounded-none justify-between gap-4 p-1">         
            <ThemeSwitcher />
            <ModeSwitcher/>
        </Card>
    )
}