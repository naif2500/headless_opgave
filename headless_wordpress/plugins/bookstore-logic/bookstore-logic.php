<?php
/*
Plugin Name: Bookstore Logic
Description: Registers Books CPT and REST API fields for Headless React
Version: 1.0
Author: Team Bookstore
*/

// 1. Create the "Book" Custom Post Type
add_action('init', function() {
    register_post_type('book', [
        'labels' => [
            'name' => 'Books',
            'singular_name' => 'Book'
        ],
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true, 
        'menu_icon'    => 'dashicons-book-alt',
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields']
    ]);
});

// 2. Register Custom Fields to the REST API
add_action('rest_api_init', function () {
    
    // Helper function to define the fields to keep code clean
    $fields = [
        'price'          => 'book_price',
        'authorName'     => 'book_author',
        'description'    => 'book_description',
        'genre'          => 'book_genre',
        'publishingDate' => 'book_publishing_date'
    ];

    foreach ($fields as $fieldName => $metaKey) {
        register_rest_field('book', $fieldName, [
            'get_callback' => function($post_arr) use ($metaKey) {
                return get_post_meta($post_arr['id'], $metaKey, true);
            },
            'update_callback' => null,
            'schema' => null,
        ]);
    }
});