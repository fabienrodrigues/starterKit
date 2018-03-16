<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="fr"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="fr"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="fr"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="fr"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Péoléo Starter</title>
    <meta name="description" content="Description du site Péoléo Starter">
    <meta name="author" content="Péoléo Starter">
    <meta name="theme-color" content="#1f1f28">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="msapplication-TileColor" content="#1f1f28">
    <meta name="msapplication-TileImage" content="medias/components/images/mstile-144x144.png">


    <!-- META FACEBOOK -->
    <meta property="og:url" content="https://Péoléo_Starter.com"/>
    <meta property="og:title" content="Péoléo Starter"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Péoléo Starter"/>
    <meta property="og:description" content="Description du site Péoléo Starter"/>
    <meta property="og:image" content="./medias/components/images/teaser.jpg"/>
    <meta property="og:locale" content="fr_FR"/>


    <!-- META TWITTER -->
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:title" content="Péoléo Starter"/>
    <meta property="twitter:description" content="Description du site Péoléo Starter"/>
    <meta property="twitter:creator" content="@PéoléoStarter"/>
    <meta property="twitter:url" content="https://Péoléo_Starter.com"/>
    <meta property="twitter:image" content="./medias/components/images/teaser.jpg"/>
    

    <!-- Mobile Specific Metas
    ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">


    <!-- CSS
    ================================================== -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700" rel="stylesheet">
    <link rel="stylesheet" href="medias/components/styles/css/components.min.css">


    <!-- Favicons
    ================================================== -->
    <link rel="icon" type="image/png" sizes="32x32"   href="medias/components/images/favicon.png">
    <link rel="icon" type="image/png" sizes="196x196" href="medias/components/images/favicon-196x196.png">
    <link rel="apple-touch-icon" sizes="57x57"        href="medias/components/images/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="114x114"      href="medias/components/images/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="72x72"        href="medias/components/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="144x144"      href="medias/components/images/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="60x60"        href="medias/components/images/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="120x120"      href="medias/components/images/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="76x76"        href="medias/components/images/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="152x152"      href="medias/components/images/apple-touch-icon-152x152.png">
</head>


<!-- <?php if (stripos($_SERVER['HTTP_USER_AGENT'], 'MSIE')): ?>
    <body class="no-touch msie">
<?php else: ?>
    <body class="no-touch">
<?php endif; ?> -->

<body class="no-touch">
    <?php include('partials/popup_ie.php'); ?>
    
	<div id="container">
        <?php include('partials/header.php'); ?>
        <!-- /HEADER -->
        
        
        <section id="content">
            <?php include('partials/sidebar.php'); ?>
        </section>
        <!-- /SECTION -->
        
        
        <?php include('partials/footer.php'); ?>
        <!-- /FOOTER -->
        
    </div><!-- /container -->
    
    
    
    <!-- JS
    ================================================== -->
	<script src="medias/components/scripts/min/components.min.js"></script>
</body>
</html>
