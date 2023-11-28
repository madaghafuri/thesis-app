import { Button } from "@/Components/Button";
import { Plus } from "lucide-react";
import { ChangeEvent, Fragment, useRef } from "react";

type Props = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FileInput({ onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (inputRef.current !== null) onChange?.(e);
    }

    return (
        <Fragment>
            <input className="hidden" type="file" ref={inputRef} onChange={handleFileChange}/>
            <Button className="outline-dashed outline-1 outline-white/30" onClick={handleClick}>
                <Plus className="text-textweak hover:text-textcolor" />
            </Button>
        </Fragment>
    )
}