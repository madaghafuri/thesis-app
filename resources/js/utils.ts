import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isObjectEmpty(objName: Object) {
    return Object.keys(objName).length === 0;
}

export function secondsToHours(seconds: number): string {
    const hours = Math.floor(seconds/3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export type AcceptedFileType = "images" | "text" | "xls" | "docs" | "ppt" | "pdf"

export function getFileType(file: string): AcceptedFileType {
    const type = file.split(".");

    switch (type[1]) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'webp':
            return 'images'
    
        case 'xls':
        case 'xlsx':
            return 'xls'

        case 'docs':
        case 'docsx':
            return 'docs'

        case 'ppt':
        case 'pptx':
            return 'ppt'

        case 'pdf':
            return 'pdf'
        default:
            return 'text'
    }
}