export class UserInfo {
    constructor( { userNameSelector, userDescriptionSelector } ) {
        this._userNameEl = document.querySelector(userNameSelector);
        this._userDescriptionEl = document.querySelector(userDescriptionSelector);

    };
        
    getUserInfo() {
        return {
            userName: this._userNameEl.textContent,
            userDescription: this._userDescriptionEl.textContent
        };
    };
    
    setUserInfo(userData) {
        const { name, description } = userData;
        this._userNameEl.textContent = name;
        this._userDescriptionEl.textContent = description;
    };

};