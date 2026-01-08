export default defineAppConfig({
    ui: {
        colors: {
            primary: 'imperial',
            secondary: 'cardinal',
            tertiary: 'gold',
            highlight: 'rose',
            success: 'green',
            info: 'indigo',
            warning: 'yellow',
            error: 'red',
            neutral: 'zinc'
        },
        icons: {
            loading: 'i-lucide-loader-circle',
            search: 'i-lucide-search',
            menu: 'i-lucide-menu'
        },
        pageBody: {
            base: 'flex flex-row h-auto m-10 mb-20'
        },
        pageFeature: {
            slots: {
                root: 'flex flex-col lg:w-[760px] xl:w-[1020px]',
                title: 'text-3xl text-secondary indent-12 px-10 font-bold mt-8',
                description: 'text-lg text-info px-10 py-8',
                leading: 'inline-flex items-center justify-center'
            }
        },
        pageCTA: {
            slots: {
                root: 'flex flex-col w-auto rounded-none',
                title: 'text-3xl text-primary'
            }
        },
        button: {
            slots: {
                base: [
                    'rounded-md items-center cursor-pointer',
                    'transition-colors'
                ]
            },
            color: {
                error: 'bg-error border-cardinal-700 hover:bg-rose-800 hover:border-cardinal-500'
            },
            size: {
                md: {
                    base: 'px-3 py-2 text-sm gap-2 rounded-lg'
                },
                lg: {
                    base: 'px-3 py-2 text-sm gap-2 rounded-lg'
                },
                xl: {
                    base: 'px-3 py-2 text-base gap-2 rounded-lg'
                }
            }
        },
        footer: {
            slots: {
                root: 'flex flex-row justify-center w-full h-80 bg-linear-to-tr from-black to-indigo-950',
                center: 'flex gap-50 lg:gap-70 xl:gap-100'
            }
        }
    }
});
