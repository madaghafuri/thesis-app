<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TaskFileController extends Controller
{
    //
    public function upload(Request $request, Task $task) {
        $request->validate([
            'files.*' => 'required|mimes:pdf,doc,docx,xls,xlsx,txt,png,jpeg,jpg,webp,ppt,pptx'
        ]);

        foreach($request->file('files') as $file) {
            $filePath = hash('sha256', $file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
            $task->files()->create([
                'filePath' => Storage::putFileAs(
                    'task-files/'.$task->id,
                    $file,
                    $filePath,
                ),
                'fileName' => $file->getClientOriginalName()
            ]);
        }
    }

    public function delete($request) {
        $file = TaskFiles::where('files', $request->fileName)->first();
        TaskFiles::destroy($file->id);
        Storage::delete($file);
    }

    public function download(Request $request) {
        $filePath = storage_path($request->filePath);

        if (file_exists($filePath)) {
            return response()->download($filePath, $request->fileName);
        }

        abort(404, "File not found");
    }
}
