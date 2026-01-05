import { defineConfig, defineProject } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

const nuxtProject = await defineVitestProject({
    test: {
        name: 'nuxt',
        include: ['test/nuxt/*.{test,spec}.ts'],
        environment: 'nuxt',
    },
});

export default defineConfig({
    test: {
        projects: [
            {
                resolve: nuxtProject.resolve,
                test: {
                    name: 'unit',
                    include: ['test/unit/*.{test,spec}.ts'],
                    environment: 'node',
                },
            },
            {
                resolve: nuxtProject.resolve,
                test: {
                    name: 'e2e',
                    include: ['test/e2e/*.{test,spec}.ts'],
                    environment: 'node',
                },
            },
            nuxtProject,
        ],
    },
})
