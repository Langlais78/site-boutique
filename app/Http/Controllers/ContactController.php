<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

class ContactController extends Controller
{
    public function store(ContactRequest $request): RedirectResponse
    {
        $payload = $request->validated();
        Mail::to('contact@barbu-studio.fr')->send(new ContactMessage($payload));

        return back()->with('success', 'Message envoye.');
    }
}
