<script type="text/x-template" id="tmpl-lp-pagination">
	<div class="pagination" v-if="total > 1">
		<form prevent.submit="">
			<button class="button first" :disabled="page == 1" v-if="total > 2 && page > 1 && page != 2"
					@click.prevent="previousFirstPage">«
			
			<button class="button previous" :disabled="page == 1"
					@click.prevent="previousPage"><br />
<b>Fatal error:  Uncaught Error: Call to undefined function esc_html_x() in /Users/julziten/Local Sites/estupendavibra/app/public/wp-content/plugins/learnpress/inc/admin/views/course/pagination.php:18
Stack trace:
#0 {main}
  thrown in <b>/Users/julziten/Local Sites/estupendavibra/app/public/wp-content/plugins/learnpress/inc/admin/views/course/pagination.php on line <b>18<br />
</script>