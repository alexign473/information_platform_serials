<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'unique:users,name', 'max:191'],
            'email' => ['required', 'email', 'unique:users,email', 'max:191'],
            'password' => ['required', 'min:8', 'confirmed'],
            'password_confirmation' => ['required']
        ];
    }
}
