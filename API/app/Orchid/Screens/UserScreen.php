<?php

namespace App\Orchid\Screens;

use Orchid\Screen\Screen;
use Orchid\Screen\Fields\Input;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Actions\ModalToggle;
use Illuminate\Http\Request;
use App\Models\User;
use Orchid\Screen\TD;
use Orchid\Screen\Actions\Button;
// use Orchid\Screen\Fields\Sight;
// use Orchid\Screen\Sight;


class UserScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'users' => User::latest()->get(),
        ];
    }

    /**
     * The name of the screen displayed in the header.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return 'Users';
    }

    /**
     * The description is displayed on the user's screen under the heading
     */
    public function description(): ?string
    {
        return 'Here, you can manage users. You can ban them, change their roles, and more. Roles list: -1 = Banned user ; 0 = unverified standard user ; 1 = verified standard user ; 2 = music creator ; 3 = unverified admin ; 4 = verified admin';
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [];
    }

    /**
     * The screen's layout elements.
     *
     * @return \Orchid\Screen\Layout[]|string[]
     */
    public function layout(): iterable
    {
        return [

            Layout::table('users', [
                // TD::make('fr_name'),
                // TD::make('en_name'),
                // TD::make('fr_description'),
                // TD::make('en_description'),
                // TD::make('distance'),
                // TD::make('time'),
                TD::make('name', 'Name')
                    ->render(function (User $user) {
                        return $user->name;
                    }),

                TD::make('email', 'Email')
                    ->render(function (User $user) {
                        return $user->email;
                    }),

                TD::make('role', 'Role')
                    ->render(function (User $user) {
                        return $user->role;
                    }),

                TD::make('Change user\'s role')
                    ->render(function (User $user) {
                        return ModalToggle::make('Change user\'s role')
                            ->modal('roleEditModal')
                            ->method('updateRole') // Assurez-vous que la méthode est correcte
                            ->icon('pencil')
                            ->modalTitle('Change user\'s role')
                            ->asyncParameters([
                                'userId' => $user->id,
                            ]);
                    }),

                TD::make('Ban user')
                    ->render(function (User $user) {
                        return Button::make('Ban user')
                            ->confirm('Are you sure you want to ban this user?')
                            ->method('ban', ['user' => $user->id]);
                    }),

                
            ]),

            Layout::modal('roleEditModal', Layout::rows([
                Input::make('user.role')
                    ->title('Role')
                    ->required()
                    ->value('user.role'),
                
            ]))
                ->async('asyncGetUser')
                ->title('Edit user\'s role')
                ->applyButton('Change the role'),
        ];
    }

    public function ban(User $user){
        $user->role = -1;
        $user->save();
    }

    public function asyncGetUser(int $userId): array
    {
        $user = User::find($userId);

        return [
            'user' => [
                'role' => $user->role,
            ], // Renvoyer les données de l'utilisateur'
        ];
    }

    public function updateRole(Request $request, $userId)
    {
        // Validation des données
        $validatedData = $request->validate([
            'user.role' => 'required|integer|between:-1,4',
        ]);

        // Trouver la planète par son ID
        $user = User::findOrFail($userId);

        // Mise à jour des données
        $user->role = $validatedData['user']['role'];

        // Sauvegarder les modifications
        $user->save();
    }
}

