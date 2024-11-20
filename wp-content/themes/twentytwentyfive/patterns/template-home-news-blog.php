<!-- wp:template-part {"slug":"header-large-title"} /-->

<!-- wp:group {"tagName":"main","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"constrained"}} -->
<main class="wp-block-group">
	<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50)">
		<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|50"}}}} -->
		<div class="wp-block-columns alignwide">
			<!-- wp:column {"width":"25%"} -->
			<div class="wp-block-column" style="flex-basis:25%">
				<!-- wp:group {"style":{"layout":{"columnSpan":1,"rowSpan":1}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
				<div class="wp-block-group">
					<!-- wp:query {"query":{"perPage":1,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[]}} -->
					<div class="wp-block-query">
						<!-- wp:post-template -->
							<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"default"}} -->
							<div class="wp-block-group">
								<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"3/2"} /-->
								<!-- wp:post-title {"isLink":true,"fontSize":"large"} /-->
								<!-- wp:post-terms {"term":"category","style":{"typography":{"textTransform":"uppercase","letterSpacing":"1.4px"}}} /-->
							</div>
							<!-- /wp:group -->
						<!-- /wp:post-template -->
						<!-- wp:query-no-results -->
							<!-- wp:paragraph -->
							<p><br>
<b>Fatal error</b>:  Uncaught Error: Call to undefined function esc_html_x() in /Users/julziten/Local Sites/estupendavibra/app/public/wp-content/themes/twentytwentyfive/patterns/template-home-news-blog.php:40
Stack trace:
#0 {main}
  thrown in <b>/Users/julziten/Local Sites/estupendavibra/app/public/wp-content/themes/twentytwentyfive/patterns/template-home-news-blog.php</b> on line <b>40</b><br>
</p>
</div>
</div>
</div>
</div>
</div></main>