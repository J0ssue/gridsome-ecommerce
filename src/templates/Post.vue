<template>
	<Layout>
		<div v-html="$page.post.content" />
	</Layout>
</template>

<page-query>
	query ($path: String!) {
		post: post (path: $path) {
			title 
			content
		}	 
	}
</page-query>


