<div class="hero-slider">
    <?php
    $slides = new WP_Query(array(
        "post_type" => "frontPageSlide",
    ));
    // posts, post_title, post_content
    ?>
    <div data-glide-el="track" class="glide__track">
        <div class="glide__slides">

            <?php echo $content ?>

        </div>
        <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
    </div>
</div>