<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !password_verify($request->password, $user->password)) {
            // Return in json format
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        if($user->role == 0){
            $delete_token = Hash::make($user->id . '|' . now());
            return response()->json([
                'message' => 'Please verify your email before connecting.',
                'delete_token' => $delete_token
            ], 403);
        }

        $token = Hash::make($user->id . '|' . now());

        $user->remember_token = $token;
        $user->save();

        $message = 'You are connected';

        $response = [
            'message' => $message,
            'token' => $token,
            'role' => $user->role,
        ];
        return response()->json($response, 200);
    }

    public function register(Request $request)
    {

        $data = $request->validate([
            'name' => 'required|max:20',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_DEFAULT);
        if(User::all()->count() == 0){
            $user->role = 3;
        } else {
            $user->role = 0;
        }
        
        $user->save();

        $mailResult = $this->sendVerificationEmail($user->email);

        if (!$mailResult) {
            //On s'upprime l'utilisateur de la base de données
            $user->delete();
            return response()->json([
                'message' => 'The user cannot be create, a problem while sending the mail has occured.'
            ], 500);
        }

        return response()->json([
            'message' => 'The user has been created, please verify the mail!'
        ], 201);

        // $message = 'The user has been created, please verify the mail!';

        // $response = [
        //     'message' => $message
        // ];

        // return response()->json($response, 200);
    }

    public function sendVerificationEmail($email)
    {

        $user = User::where('email', $email)->first();
        if (!$user) {
            return false;
        }

        $token = Hash::make($user->id . '|' . now());

        $user->remember_token = $token;
        $user->save();

        // Log::info(config('app.url'));

        $url = 'http://localhost:3000/verify_mail.html?' . $token;

        Mail::raw('Please click on this link to verify your email: ' . $url, function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Verification email');
        });

        // mail($user->email, 'Verification email', 'Please click on this link to verify your email: ' . $url);

        return true;
    }

    public function verifyMail(Request $request)
    {
        $token = $request->token;
        $user = User::where('remember_token', $token)->first();
        if (!$user) {
            return response()->json([
                'message' => 'The token is incorrect.'
            ], 401);
        }

        if($user->role == 1){
            return response()->json([
                'message' => 'The email has already been verified.'
            ], 403);
        }

        if($user->role == 3){
            $user->role = 4;
        }else {
            $user->role = 1;
        }

        $user->save();

        $message = 'The email has been verified';

        $response = [
            'message' => $message
        ];

        return response()->json($response, 200);
    }

    public function isUserConnected(Request $request)
    {
        $token = $request->token;
        $user = User::where('remember_token', $token)->first();
        if (!$user) {
            return response()->json([
                'message' => 'The token is incorrect.',
                'isConnected' => false,
            ], 200);
        }

        $message = 'The user is connected';

        $response = [
            'message' => $message,
            'role' => $user->role,
            'isConnected' => true,
        ];

        return response()->json($response, 200);
    }

}
