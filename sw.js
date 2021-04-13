importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

const strategy = new workbox.strategies.NetworkFirst();
workbox.routing.setDefaultHandler(strategy);

const urls = [
    'index.html',
    'style.css',
    'app.js',
    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,800;1,800&amp;display=swap',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
];

workbox.recipes.warmStrategyCache({urls, strategy});

workbox.core.clientsClaim();