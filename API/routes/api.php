<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MusicController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/verify-mail', [LoginController::class, 'verifyMail']);
Route::post('/isUserConnected', [LoginController::class, 'isUserConnected']);
// Route::post('/resend-verification-mail', [LoginController::class, 'resendVerificationEmail']);

Route::middleware('auth.musician')->group(function () {
    Route::post('/publish-music', [MusicController::class, 'store']);
});

Route::middleware('auth.registered')->group(function () {
    Route::get('/musics', [MusicController::class, 'index']);
    Route::get('/music/{id}', [MusicController::class, 'show']);
    Route::post('/give_music_piece', [MusicController::class, 'giveMusicPiece']);
});


