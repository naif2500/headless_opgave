<?php
/*
Plugin Name: Bookstore Logic
Description: Registers Books CPT and Custom GraphQL Fields for Headless React
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
        'public'      => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'book',
        'graphql_plural_name' => 'books',
        'menu_icon'   => 'dashicons-book-alt',
        'supports'    => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields']
    ]);
});
// 2. Register Custom Fields (Price/Author) to the GraphQL Schema
add_action('graphql_register_types', function() {
    
    // Add "price" field to the "Book" type in GraphQL
    register_graphql_field('Book', 'price', [
        'type' => 'String',
        'description' => 'The price of the book',
        'resolve' => function($post) {
            return get_post_meta($post->ID, 'book_price', true);
        }
    ]);

    // Add "authorName" field to the "Book" type in GraphQL
    register_graphql_field('Book', 'authorName', [
        'type' => 'String',
        'description' => 'The author of the book',
        'resolve' => function($post) {
            return get_post_meta($post->ID, 'book_author', true);
        }
    ]);
});