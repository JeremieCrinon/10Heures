<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
            return response()->json([
                'message' => 'Please verify your email before connecting.'
            ], 403);
        }

        $token = Hash::make($user->id . '|' . now());

        $user->remember_token = $token;
        $user->save();

        $message = 'You are connected';

        $response = [
            'message' => $message,
            'token' => $token
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
        $user->role = 0;
        $user->save();

        $this->sendVerificationEmail($user->email);

        $message = 'The user has been created, please verify the mail!';

        $response = [
            'message' => $message
        ];

        return response()->json($response, 200);
    }

    public function sendVerificationEmail($email)
    {
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'The provided email is incorrect.'
            ], 401);
        }

        $token = Hash::make($user->id . '|' . now());

        $user->remember_token = $token;
        $user->save();

        mail($user->email, 'Verification email', 'Please click on this link to verify your email: ${APP_URL}' . $token);

        $message = 'The verification email has been sent';

        $response = [
            'message' => $message,
            'token' => $token
        ];
        return response()->json($response, 200);
    }


}
