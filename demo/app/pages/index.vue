<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
	<NuxtLayout contentonly>
		<template #default>
			<h1 class="text-3xl mt-8 mb-4">Prez UI Demo</h1>
			<p class="my-2">This is a vanilla instance to demonstrate the functionality of Prez UI.</p>
			<Button class="mt-2" asChild>
				<NuxtLink to="/catalogs">Go to catalogs <ArrowRight class="size-4" /></NuxtLink>
			</Button>
		</template>
	</NuxtLayout>
</template>