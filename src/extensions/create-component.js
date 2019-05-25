module.exports = (toolbox) => {
    const {filesystem, print: {success, error}, template} = toolbox;

    async function isReactNative() {
        const package = await filesystem.read('package.json', 'json');
        return !!package.dependencies['react-native'];
    }

    async function createComponent(folder, name) {
        if(!name) {
            error('Name must be specified')
        }

        await template.generate({
            template: "component.js.ejs",
            target: `${folder}/${name}/index.js`,
            props: { name }
        })

        const styleTemplate = (await isReactNative())

        ? "styles-rn.js.ejs"
        : "styles-react.js.ejs"

        await template.generate({
            template: styleTemplate,
            target: `${folder}/${name}/styles.js`,
            props: { name }
        })

        success(`Generated ${folder}/${name}`)
    }

    toolbox.createComponent = createComponent;

}