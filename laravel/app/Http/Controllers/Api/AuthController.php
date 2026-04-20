<?php
use\App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller{
public function login(Request $request){
    $retuest->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);
}
$user = App\Models\User::where('email', $request->email)->first();
if(!$user )
{
    throw ValidationException::withMessage([
        'email' => ['The provided credentials are incorrect.']
    ]);
    if(!Hash::check($request->password, $user->password)){
        throw ValidationException::withMessage([
            'email' => ['The provided credentials are incorrect.']
        ]);
    }
}
