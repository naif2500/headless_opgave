<?php
/*
Plugin Name: Bookstore Logic
Description: Handles Headless CPT, Meta, and Registration.
Version: 1.0
*/

// 1. CORS Support
add_action('rest_api_init', function() {
    add_filter('rest_pre_serve_request', function( $value ) {
        header( 'Access-Control-Allow-Origin: http://localhost:3000' );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce' );
        header( 'Access-Control-Allow-Credentials: true' );
        return $value;
    });
});

// 2. Register "Book" Post Type
add_action('init', function() {
    register_post_type('book', [
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'labels' => [
            'name' => 'Books',
            'singular_name' => 'Book',
            'add_new' => 'Add New Book',
            'add_new_item' => 'Add New Book',
            'edit_item' => 'Edit Book',
            'all_items' => 'All Books',
        ],
        'menu_icon' => 'dashicons-book',
    ]);
});

// 3. Register Meta (Expose to REST)
add_action('init', function() {
    $meta_keys = ['book_price', 'book_author', 'book_genre', 'book_description', 'book_posted_by',];
    foreach ($meta_keys as $key) {
        register_meta('post', $key, [
            'object_subtype' => 'book',
            'show_in_rest' => true, 
            'single' => true, 
            'type' => 'string'
        ]);
    }
});

// 4. Custom Hook to save Meta via REST
add_action('rest_insert_book', function($post, $request, $creating) {
    $meta_data = $request->get_param('meta');
    if (!empty($meta_data) && is_array($meta_data)) {
        foreach ($meta_data as $key => $value) {
            update_post_meta($post->ID, $key, sanitize_text_field($value));
        }
    }
}, 10, 3);

// 5. Force Meta into the REST API Response
add_action('rest_api_init', function () {
    $meta_keys = ['book_price', 'book_author', 'book_genre', 'book_description', 'book_posted_by',];
    
    foreach ($meta_keys as $key) {
        register_rest_field('book', $key, [
            'get_callback' => function ($post_arr, $field_name) {
                return get_post_meta($post_arr['id'], $field_name, true);
            },
            'schema' => [
                'type' => 'string',
            ],
        ]);
    }
});