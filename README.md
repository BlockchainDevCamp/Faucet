# Faucet App

The `Faucet App` is web applications that holds some coins currently donated from the genesis transaction, but in future they might be mined by someone and donated to the faucet.

The faucet works like a wallet with hard-coded private key. 

It sends a 1 coin to anyone who requests coins with certain limits, namely one request per address per hour + captcha.

For each request, the faucet creates a transaction, signs it and sends it to a specified Node URL (through HTTP POST).

## Faucet UI

### Landing Page

![Landing Page](ui-screenshots/faucet-ui-landing-page.png?raw=true "Landing Page")

### Recaptcha Resolved

![Recaptcha Resolved](ui-screenshots/faucet-ui-landing-page.png?raw=true "Recaptcha Resolved")

### Successful Transaction

![Successful Transaction](ui-screenshots/faucet-ui-coin-transfer-success.png?raw=true "Successful Transaction")

### One Coin per Minute Error

![One Coin per Minute Error](ui-screenshots/faucet-ui-coin-transfer-one-hour-rule.png?raw=true "One Coin per Minute Error")

### Out of Money Error

![Out of Money Error](ui-screenshots/faucet-ui-out-of-money.png?raw=true "Out of Money Error")

