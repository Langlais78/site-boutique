<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public array $payload;

    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    public function build(): self
    {
        return $this
            ->subject('[Contact] ' . $this->payload['subject'])
            ->replyTo($this->payload['email'], $this->payload['name'])
            ->view('emails.contact-message');
    }
}
