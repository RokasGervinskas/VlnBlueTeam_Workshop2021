const generatedPasswordSelector = ".c-base__title";
exports.ResultsPage = class ResultsPage {
    constructor(page) {
        this.page = page;
    }
    async getGeneratedPassword() {
    return await this.page.textContent(generatedPasswordSelector);
    }
}