const NotCoin = require('node-notcoinapi');
const notCoin = new NotCoin(`СЮДА ССЫЛКУ`);

(async () => {
    await notCoin.event();
    await notCoin.auth();

    setInterval(async () => {
        try {
            let profile = notCoin.getProfile();

            if(profile.availableCoins < 100) {
                await notCoin.updateProfile();

                return;
            }

            let clickCount = 1;

            if(profile.availableCoins > 1790) {
                clickCount = 1590;
            } else {
                clickCount = notCoin.rand(1, profile.availableCoins - 100);
            }

            await notCoin.click(clickCount);

            profile = notCoin.getProfile();

            console.log(`Click count: ${profile.availableCoins} | Balance: ${profile.balanceCoins}`);
        } catch (e) {
            console.log(e.message);
        }
    }, 15000);
})();