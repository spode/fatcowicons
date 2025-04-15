// place files you want to import through the `$lib` alias in this folder.
// export const myIcons = import.meta.glob('$lib/few/*.png', { eager: true })



export const myIcons = import.meta.glob(
    '$lib/fatcow/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
    {

        eager: false,
        query: {
            enhanced: false
        }
    }
);


function getContent() {
    const iconPromises = Object.entries(myIcons).map(([path, importFn]) =>
        importFn().then((mod) => ({
            path,
            src: mod.default,
        }))
    );

    return iconPromises;
}

export let icons = getContent();
