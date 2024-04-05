<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        Task::withoutEvents(function() {
            $project = Project::all()->where('id', 1)->first();
            $section = Section::all()->where('id', 1)->first();
            Task::factory()->count(20)->for($project)->for($section)->create();
        });

        // $this->call(PrioritySeeder::class);
    }
}
