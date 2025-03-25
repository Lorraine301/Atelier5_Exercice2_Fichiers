<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    
     // Méthode pour uploader un fichier
     public function uploadFile(Request $request)
     {
         $request->validate([
             'file' => 'required|file|max:2048' // Max 2MB
         ]);
 
         if ($request->hasFile('file')) {
             $path = $request->file('file')->store('uploads', 'public');
             return response()->json(['message' => 'Fichier uploadé avec succès', 'path' => $path], 201);
         }
 
         return response()->json(['message' => 'Aucun fichier trouvé'], 400);
     }
 
     // Méthode pour récupérer la liste des fichiers
     public function getFiles()
     {
         $files = Storage::disk('public')->files('uploads');
         return response()->json(['files' => $files], 200);
     }
     
}
