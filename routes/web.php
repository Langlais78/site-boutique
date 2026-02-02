<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminCategoryController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\AdminAccessoryController;
use App\Http\Controllers\AdminCustomArcadeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomArcadeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/boutique', [ProductController::class, 'index'])->name('boutique');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/borne-sur-mesure', CustomArcadeController::class)
    ->name('custom.arcade');
Route::get('/cgv', function () {
    return Inertia::render('LegalCgv');
})->name('legal.cgv');
Route::get('/mentions-legales', function () {
    return Inertia::render('LegalMentions');
})->name('legal.mentions');

Route::get('/produit/{product:slug}', [ProductController::class, 'show'])->name('product.show');

Route::get('/panier', [CartController::class, 'index'])->name('cart.index');
Route::post('/panier/ajouter/{product}', [CartController::class, 'add'])->name('cart.add');
Route::patch('/panier/{product}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/panier/{product}', [CartController::class, 'remove'])->name('cart.remove');
Route::delete('/panier', [CartController::class, 'clear'])->name('cart.clear');

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::prefix('admin')
    ->middleware(['auth', 'verified', 'admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('/', AdminDashboardController::class)->name('dashboard');
        Route::post('categories', [AdminCategoryController::class, 'store'])
            ->name('categories.store');
        Route::resource('accessories', AdminAccessoryController::class)->except(['show']);
        Route::resource('custom-arcades', AdminCustomArcadeController::class)->except(['show']);
        Route::get('products/{product}', [AdminProductController::class, 'show'])
            ->name('products.show');
        Route::resource('products', AdminProductController::class)->except(['show']);
        Route::match(['post'], 'products/{product}', [AdminProductController::class, 'update'])
            ->name('products.update.post');
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        return redirect()->route('dashboard');
    })->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
