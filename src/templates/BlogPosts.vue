<template>
	<div class="px-10">
		<h1 class="text-4xl font-bold py-20 capitalize">
			{{ $page.blogPosts.title }}
		</h1>
		<div class="text-xl">
			{{ $page.blogPosts.body }}
		</div>
	</div>
</template>

<page-query>
query ($path: String!) {
  blogPosts (path: $path) {
		id
    title
		body
  }
}

</page-query>
