<script type="text/x-template" id="tmpl-lp-quiz-pagination">
	<div id="lp-quiz-pagination" class="pagination" v-if="totalPage > 1">
		<form prevent.submit="">
			<button class="button first" :disabled="page == 1" v-if="total > 3 && page > 1 && page != 2"
					@click.prevent="previousFirstPage">«
			
			<button class="button previous" :disabled="page == 1"
					@click.prevent="previousPage"><br />
<b>Fatal error:  Uncaught Error: Call to undefined function esc_html_x() in /Users/julziten/Local Sites/estupendavibra/app/public/wp-content/plugins/learnpress/inc/admin/views/quiz/pagination.php:16
Stack trace:
#0 {main}
  thrown in <b>/Users/julziten/Local Sites/estupendavibra/app/public/wp-content/plugins/learnpress/inc/admin/views/quiz/pagination.php on line <b>16<br />
</script>