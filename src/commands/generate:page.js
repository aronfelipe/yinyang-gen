module.exports = {
    name: "generate:page",
    description: "Create new page inside src/pages",
    run: async toolbox => {
        const {
            parameters,
            createComponent
        } = toolbox

        const name = parameters.first.charAt(0).toUpperCase() + parameters.first.slice(1);

        await createComponent("src/pages", name)
    },
}