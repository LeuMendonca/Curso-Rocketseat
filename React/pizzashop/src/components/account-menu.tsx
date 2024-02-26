import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";

export function AccountMenu() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="flex items-center gap-2 select-none">
                        Pizza Shop
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        <span>Leonardo Mendonça</span>
                        <span className="text-xs font-normal text-muted-foreground">leonardomendonca2001@gmail.com</span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator/>

                    <DropdownMenuItem>
                        <Building className="w-4 h-4 mr-2"/>
                        Perfil da loja
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                        <LogOut className="w-4 h-4 mr-2"/>
                        Sair
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
