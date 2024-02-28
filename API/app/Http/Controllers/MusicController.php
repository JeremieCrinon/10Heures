<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Music;
use App\Models\User;
use FFMpeg\FFMpeg;
use FFMpeg\Coordinate\TimeCode;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class MusicController extends Controller
{
    public function splitMp3($filePath)
    {
        set_time_limit(300); // Augmenter le temps d'exécution du script car on fais un traitement assez lourd
        ini_set('memory_limit', '256M'); // Augmenter la limite de mémoire car on fais un traitement assez lourd

        $ffmpeg = FFMpeg::create();
        $audio = $ffmpeg->open($filePath);

        $duration = $audio->getFormat()->get('duration');
        $splitLength = 10; // longueur de chaque segment en secondes

        $path = str_replace('/music.mp3', '', $filePath) . '/';

        $countFiles = 0;

        // dd($path, $filePath);

        for ($start = 0; $start < $duration; $start += $splitLength) {
            $countFiles++;

            $end = $start + $splitLength;

            // Définir le nom du fichier de sortie pour chaque segment
            $outputPath = $path . $countFiles . '.mp3';

            // Découper le segment
            $audio->filters()->clip(TimeCode::fromSeconds($start), TimeCode::fromSeconds($splitLength));
            $audio->save(new \FFMpeg\Format\Audio\Mp3(), $outputPath);
        }

        return $countFiles;
    }

    public function store(Request $request){
        $token = $request->header('Authorization');
        $user = User::where('remember_token', $token)->first();

        $request->validate([
            'title' => 'required',
            'music' => 'required|mimes:mp3',
        ]);

        $music = new Music();
        $music->title = $request->title;
        $music->artist = $user->id;

        // On créé un dossier pour la musique, puis on enregistre le fichier mp3 entier dans se dossier, puis on appelle la fonction qui le découpe
        $folderName = Hash::make($user->id . '|' . now());
        $folderName = str_replace('/', '', $folderName);
        $music->folder_name = $folderName;
        
        Storage::disk('public')->makeDirectory('music/' . $folderName);
        $request->file('music')->storeAs('music/' . $folderName, 'music.mp3', 'public');
        $music->number_of_pieces = $this->splitMp3(storage_path('app/public/music/' . $folderName . '/music.mp3'));

        $music->save();
        
        return response()->json(['message' => 'Music published'], 200);

        
    }
}
