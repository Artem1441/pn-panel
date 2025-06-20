const withPWA = require("next-pwa")({ dest: "public" });

module.exports = withPWA({
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    localeDetection: false,
  },
});
