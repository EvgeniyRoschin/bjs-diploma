class Profile {
    constructor(profileObject) {
        this.username = profileObject.username;
        this.name = { firstName: profileObject.name.firstName, lastName: profileObject.name.lastName };
        this.password = profileObject.password;
    }

    addingNewUser(callback) {
        return ApiConnector.createUser({ username: this.username, name: this.name, password: this.password }, (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);
        })
    }

    authorizingUser(callback) {
        return ApiConnector.performLogin({ username: this.username, password: this.password }, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err, data);
        })
    }

    addingMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertationCurrensy({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Convert ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    transferingMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        });
    }
}

function gettingStock() {
    console.log(`Getting stock info`)
    let stock = ApiConnector.getStocks();
    return stock;
}

function main() {
    let ivan = new Profile({
        username: 'IvanR',
        name: {firstName: 'Ivan', lastName: 'Rest'},
        password: 'qwerty'
    });

    let marya = new Profile({
        username: 'MaryaB',
        name: {firstName: 'Marya', lastName: 'Best'},
        password: 'qazwsx'
    });

    ivan.addingNewUser( (err, data) => {
        if (err) {
            console.error('Error during adding user');
        } else {
            console.log(`ivan is created!`);

            ivan.authorizingUser( (err, data) => {
                if (err) {
                    console.error('Error during authorizing user');
                } else {
                    console.log(`ivan is authorized!`);

                    ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Ivan');
                        } else {
                            console.log(`Added 500000 euros to Ivan`);

                            ivan.convertationCurrensy( {fromCurrency: 'USD', targetCurrency: 'Netcoin', targetAmount: 100}, (err, data) => {
                                if (err) {
                                    console.error('Error during convertation money');
                                } else {
                                    console.log(`Converted to coins ${ivan}`);

                                    marya.addingNewUser( (err, data) => {
                                        if (err) {
                                            console.error('Error during adding user');
                                        } else {
                                            console.log(`marya is created!`);

                                            ivan.transferingMoney({to: marya, amount: 100}, (err, data) => {
                                                if (err) {
                                                    console.error('Error during transfering money');
                                                } else {
                                                    console.log(`marya has got 100 Netcoins`);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

main();