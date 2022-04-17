module.exports = {
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
            @import "@/assets/shared/scss/_shared.scss";
        `,
			},
		},
	},
};
